<script lang="ts">
    import { goto } from '$app/navigation';
    import {
        cart,
        toastMsg,
        currency,
        user,
        type CartProduct,
        checkoutModal,
        purchasedProducts
    } from '$lib/store';
    import { initializePaddle, type CheckoutOpenOptions, type Paddle } from '@paddle/paddle-js';
    import { onMount } from 'svelte';
    import Button from '../../../components/shared/button.svelte';
    import Icon from '../../../components/shared/icon.svelte';
    import { PUBLIC_BASE_URL, PUBLIC_PADDLE_TOKEN } from '$env/static/public';
    import { page } from '$app/stores';
    import { signInWithEmail } from '$lib/supabase';
    import Checkout from '../../../components/shared/checkout.svelte';
    import { getTimezone } from '$lib/utils/timezones';
    import { browser } from '$app/environment';
    import Toast from '../../../components/shared/toast.svelte';

    export let data;
    $: ({ session, supabase } = data);

    let paddle: Paddle | undefined;

    let total = 0;

    $: getTotal($cart);

    const getTotal = (cart: CartProduct[]) => {
        total = 0;
        cart.forEach((cartProd) => {
            total += cartProd.price;
        });
    };

    const removeFromCart = (sku: string) => {
        cart.update((prev) => {
            return prev.filter((cartProd) => cartProd.sku !== sku);
        });
    };

    let email: string;
    let codeSent: boolean = false;
    let loading: boolean = false;

    const sendCode = async () => {
        loading = true;
        let resp = await signInWithEmail({
            email,
            supabase,
            redirect: $page.url.pathname
        });
        if (!resp.error) {
            codeSent = true;
        } else {
            console.error(resp.error);
        }

        loading = false;
    };

    const checkout = () => {
        const temp = checkBoughtProducts();

        if (temp) {
            toastMsg.set({
                icon: 'Warning',
                msg: `“${temp}” is already bought`,
                desc: ''
            });

            return;
        }

        let checkoutList;
        checkoutList = $cart.map((prod) => ({ priceId: prod.price_id, quantity: 1 }));

        if ($user.authenticated) {
            let checkoutOptions: CheckoutOpenOptions = {
                items: checkoutList,
                customData: {
                    uid: session?.user.id || ''
                },
                settings: {
                    successUrl: `${PUBLIC_BASE_URL}/my-account/orders`,
                    theme: 'dark',
                    allowLogout: false
                }
            };

            checkoutOptions.customer = {
                email: email || $user.email,
                address: { countryCode: getTimezone() }
            };
            paddle?.Checkout.open(checkoutOptions);
        } else {
            localStorage.setItem('cart', JSON.stringify($cart));
            checkoutModal.set(true);
        }
    };

    onMount(async () => {
        paddle = await initializePaddle({
            token: PUBLIC_PADDLE_TOKEN
        });
        paddle?.Environment.set('sandbox');
    });

    const checkBoughtProducts = () => {
        let boughtProd = '';
        for (let index = 0; index < $cart.length; index++) {
            const p = $cart[index];

            if ($purchasedProducts) {
                const temp = $purchasedProducts.find((prod) => prod.sku === p.sku);

                if (temp) {
                    boughtProd = temp.name;
                    break;
                }
            }
        }

        return boughtProd;
    };

    $: {
        if (browser && $user.authenticated && paddle) {
            const localCart = localStorage.getItem('cart');

            if (localCart) {
                cart.set(JSON.parse(localCart));
                getTotal($cart);
                localStorage.removeItem('cart');

                checkout();
            }
        }
    }
</script>

{#if $checkoutModal}
    <Checkout bind:email bind:codeSent bind:loading on:sendCode={sendCode} />
{/if}

<Toast left="right-8" top="top-20" />

<section class="w-full bg-foreground">
    <h1 class="container font-semibold text-h_2 max-sm:text-h_3 font-inter text-card py-5 md:py-10">
        Your Cart
    </h1>
    <div class="w-full bg-background">
        {#if $cart.length === 0}
            <div class="container flex flex-col justify-center items-center py-14 gap-12">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="236"
                    height="190"
                    viewBox="0 0 236 190"
                    fill="none"
                >
                    <path
                        d="M191.925 93.6431L185.136 100.433L158.219 73.5153L131.301 100.433L124.512 93.6431L151.429 66.7258L124.512 39.8085L131.301 33.0189L158.219 59.9363L185.136 33.0189L191.925 39.8085L165.008 66.7258L191.925 93.6431Z"
                        fill="white"
                        fill-opacity="0.5"
                    />
                    <path
                        d="M78.2178 133.512H235.796V34.9518C235.796 32.2629 233.618 30.0844 230.929 30.0844C228.24 30.0844 226.061 32.2629 226.061 34.9518V123.777H87.9527V32.6362L47.8554 0H4.86743C2.17854 0 0 2.17854 0 4.86743C0 7.55632 2.17854 9.73486 4.86743 9.73486H44.3972L78.2216 37.2674V133.512H78.2178Z"
                        fill="white"
                        fill-opacity="0.5"
                    />
                    <path
                        d="M83.0825 189.548C94.0141 189.548 102.876 180.686 102.876 169.755C102.876 158.823 94.0141 149.961 83.0825 149.961C72.1509 149.961 63.2891 158.823 63.2891 169.755C63.2891 180.686 72.1509 189.548 83.0825 189.548Z"
                        fill="white"
                        fill-opacity="0.5"
                    />
                    <path
                        d="M214.598 189.548C225.514 189.548 234.392 180.67 234.392 169.755C234.392 158.839 225.514 149.961 214.598 149.961C203.683 149.961 194.805 158.839 194.805 169.755C194.805 180.67 203.686 189.548 214.598 189.548Z"
                        fill="white"
                        fill-opacity="0.5"
                    />
                </svg>
                <div class="flex flex-col gap-4 items-center justify-center">
                    <h3 class="text-h_3 text-card font-semibold">Your cart is currently empty.</h3>
                    <p class="text-lg text-card">
                        Before proceed to buy you must add som to your shopping cart.
                    </p>
                    <Button title="RETURN TO SHOP" on:click={() => goto('/shop')} />
                </div>
            </div>
        {:else}
            <div class="pt-8 container">
                <div class="grid lg:grid-cols-3 gap-x-8 gap-y-8">
                    <div
                        class="md:hidden flex flex-col gap-8 bg-foreground rounded-lg border-2 border-card-5 p-6"
                    >
                        {#each $cart as { price, sku, title, image }}
                            <div
                                class="flex flex-col-reverse gap-6 sm:flex-row sm:gap-4 pb-8 last:pb-0 last:border-b-0 border-b-4 border-card-5 w-full"
                            >
                                <img
                                    src="{image}"
                                    class="w-4/5 max-h-64 mx-auto sm:w-24 sm:h-16 object-contain object-center sm:object-left sm:self-center"
                                    alt="{title} thumbnail"
                                />
                                <div class="flex flex-col gap-4 w-full">
                                    <div class="flex justify-between w-full gap-4">
                                        <a
                                            href="/product/{sku}"
                                            class="text-card font-inter font-semibold text-md"
                                            >{title}</a
                                        >
                                        <button on:click={() => removeFromCart(sku)}>
                                            <Icon name="XCircle" height="18" width="18" />
                                        </button>
                                    </div>
                                    <div
                                        class="flex justify-between w-full text-card font-inter text-md gap-4"
                                    >
                                        <p>Price</p>
                                        <p class="font-semibold">
                                            {$currency.symbol}{price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        {/each}
                    </div>

                    <div class="hidden md:block overflow-x-hidden w-full lg:col-span-2">
                        <div
                            class="overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain flex flex-nowrap"
                        >
                            <table
                                class="border-separate border-spacing-0 rounded-lg overflow-hidden w-full"
                            >
                                <thead>
                                    <tr>
                                        <th class="border-b-4 border-card-5 min-w-max snap-center"
                                            >Product</th
                                        >
                                        <th
                                            class="border-b-4 border-card-5 rounded-br-lg min-w-max snap-center"
                                            >Price</th
                                        >
                                    </tr>
                                </thead>
                                <tbody>
                                    {#each $cart as { price, sku, title, image }}
                                        <tr>
                                            <td>
                                                <div class="flex items-center justify-start gap-8">
                                                    <button on:click={() => removeFromCart(sku)}>
                                                        <Icon
                                                            name="XCircle"
                                                            height="18"
                                                            width="18"
                                                        />
                                                    </button>
                                                    <a href="/product/{sku}">
                                                        <img
                                                            src="{image}"
                                                            alt="{title} thumbnail"
                                                            class="h-24 w-40 object-contain object-left"
                                                        />
                                                    </a>
                                                    <a
                                                        href="/product/{sku}"
                                                        class="text-card font-normal hover:underline font-inter text-md ml-2"
                                                    >
                                                        {title}
                                                    </a>
                                                </div>
                                            </td>
                                            <td class="text-card font-normal font-inter text-md"
                                                >{$currency.symbol}{price.toFixed(2)}</td
                                            >
                                        </tr>
                                    {/each}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div
                        class="w-full rounded-lg border-2 border-card-5 h-max p-6 bg-foreground flex flex-col gap-4 xl:mr-10"
                    >
                        <h4 class="text-h_4 font-inter font-semibold text-primary-blue">
                            Cart totals
                        </h4>
                        <div class="flex justify-between">
                            <p class="text-card text-h_6 font-semibold font-inter">Subtotal</p>
                            <p class="text-card text-h_6 font-semibold font-inter">
                                {$currency.symbol}{total.toFixed(2)}
                            </p>
                        </div>
                        <hr class="bg-section h-0.5 border-section" />
                        <Button
                            icon="Basket"
                            title="BUY NOW"
                            width={22}
                            height={18}
                            on:click={checkout}
                        />
                    </div>
                </div>
                <div class="py-24 flex items-center justify-center">
                    <a
                        href="/shop"
                        class="font-inter text-h_6 font-semibol text-primary-blue underline underline-offset-8"
                    >
                        Click here to continue shopping
                    </a>
                </div>
            </div>
        {/if}
    </div>
</section>

<style lang="postcss">
    table {
        @apply border-4 border-card-5;
    }
    th {
        @apply text-start text-h_6 text-card font-semibold bg-section;
    }
    td,
    th {
        @apply py-6 px-8;
    }

    td {
        @apply border-b-2 border-card-5 text-start align-text-top text-card;
    }

    tbody tr:first-child td {
        @apply !border-t-0;
    }

    tr td:first-child {
        @apply border-l-0;
    }
    tr td:last-child {
        @apply border-r-0;
    }

    tr:last-child td:last-child {
        @apply rounded-br-lg;
    }
    tr:last-child td:first-child {
        @apply rounded-bl-lg;
    }

    tr:last-child td {
        @apply border-b-0;
    }
</style>
