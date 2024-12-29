<script lang="ts">
    import { browser } from '$app/environment';
    import { page } from '$app/stores';
    import { PUBLIC_BASE_URL, PUBLIC_PADDLE_TOKEN } from '$env/static/public';
    import type { Product } from '$lib/interfaces';
    import {
        allProducts,
        cart,
        checkoutModal,
        likeLoading,
        toastMsg,
        user,
        purchasedProducts
    } from '$lib/store';
    import { signInWithEmail } from '$lib/supabase';
    import { getTimezone } from '$lib/utils/timezones';
    import { initializePaddle, type CheckoutOpenOptions, type Paddle } from '@paddle/paddle-js';
    import DOMPurify from 'dompurify';
    import { onMount } from 'svelte';
    import Hilyard from '../../../../components/sections/product/Hilyard.svelte';
    import Mirage from '../../../../components/sections/product/Mirage.svelte';
    import AmbientMusic from '../../../../components/sections/product/ambient-music.svelte';
    import Ambient from '../../../../components/sections/product/ambient.svelte';
    import Cards from '../../../../components/sections/product/cards.svelte';
    import LostReveries from '../../../../components/sections/product/lost-reveries.svelte';
    import MoodBoard from '../../../../components/sections/product/mood-board.svelte';
    import PlayVideo from '../../../../components/sections/product/play-video.svelte';
    import Presets from '../../../../components/sections/product/presets.svelte';
    import Producthead from '../../../../components/sections/product/producthead.svelte';
    import Products from '../../../../components/sections/product/products.svelte';
    import ReviewSection from '../../../../components/sections/product/reviewSection.svelte';
    import Reviews from '../../../../components/sections/product/reviews.svelte';
    import Checkout from '../../../../components/shared/checkout.svelte';

    export let data;

    $: ({ reviews, supabase, session, slug } = data);

    let prod: Product | null = null;
    let alreadyBought = false;
    let alreadyReviewed = false;

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
            console.log(resp.error);
        }

        loading = false;
    };

    let paddle: Paddle | undefined;

    const checkout = () => {
        let checkoutList;

        const localCart = localStorage.getItem('cart');

        localStorage.removeItem('cart');
        if (localCart) {
            checkoutList = JSON.parse(localCart);
        } else {
            checkoutList = [{ priceId: prod?.paddle_price_id, quantity: 1 }];
        }

        if ($user.authenticated) {
            let checkoutOptions: CheckoutOpenOptions = {
                items: checkoutList,
                customData: {
                    uid: session?.user.id || ''
                },
                settings: {
                    successUrl: `${PUBLIC_BASE_URL}/my-account/orders`,
                    theme: 'dark',
                    allowLogout: false,
                    locale: 'GB'
                }
            };

            checkoutOptions.customer = {
                email: email || $user.email,
                address: { countryCode: getTimezone() }
            };
            paddle?.Checkout.open(checkoutOptions);
        } else {
            localStorage.setItem('product', JSON.stringify(checkoutList));
            checkoutModal.set(true);
        }
    };

    $: if (browser && $allProducts && slug) {
        console.log('getting product');

        prod = $allProducts.find((e) => e.sku === slug)!;
        if ($purchasedProducts && $purchasedProducts.find((prod: any) => prod.sku === slug)) {
            alreadyBought = true;
        }

        if (
            $purchasedProducts &&
            $purchasedProducts.find((prod: any) => prod.sku === slug && prod.reviewed)
        ) {
            alreadyReviewed = true;
        }
    }

    onMount(async () => {
        paddle = await initializePaddle({
            token: PUBLIC_PADDLE_TOKEN
        });
        paddle?.Environment.set('sandbox');
    });

    $: {
        if (browser && $user.authenticated && paddle) {
            const localProduct = localStorage.getItem('product');

            if (localProduct) {
                localStorage.removeItem('product');
                if (alreadyBought) {
                    toastMsg.set({
                        icon: 'Warning',
                        msg: `“${prod?.name}” is already bought`,
                        desc: ''
                    });
                } else {
                    checkout();
                }
            }
        }
    }

    const handleAddToCart = async () => {
        let temp = $cart.find((prod) => prod.sku === slug);

        if (!temp) {
            cart.update((prev) => [
                ...prev,
                {
                    sku: slug,
                    title: prod?.name!,
                    price: prod?.price!,
                    price_id: prod?.paddle_price_id!,
                    image: prod?.thumbnail.url!
                }
            ]);
            toastMsg.set({
                icon: 'Success',
                msg: `“${prod?.name}” has been added to your cart.`,
                desc: ''
            });
        } else {
            toastMsg.set({
                icon: 'Warning',
                msg: `You cannot add another “${prod?.name}” to your cart.`,
                desc: ''
            });
        }
    };

    const addReview = async (event: any) => {
        loading = true;
        const { review, rating } = event.detail;

        const clean_review = DOMPurify.sanitize(review, { FORBID_TAGS: ['a'] });

        let { data: product, error } = await supabase
            .from('reviews')
            .insert([
                {
                    comment: clean_review,
                    user_id: session?.user.id,
                    rating: rating,
                    product_id: prod?.id
                }
            ])
            .select(
                'id,comment,likes,created_at,accounts(email),liked_by,rating,products!inner(sku,id)'
            )
            .single();

        if (!error) {
            let res = await supabase
                .from('purchases')
                .update({ reviewed: true })
                .match({ product_id: prod?.id, user_id: session?.user.id });

            if (!res.error) alreadyReviewed = true;
            reviews?.push(product!);
            reviews = reviews;
        }

        loading = false;
    };

    const updateLikes = async (event: any) => {
        const { review_id } = event.detail;

        let reviewIndex = reviews?.findIndex((review) => review.id === review_id);
        let rpc_function = 'increment_review_likes';

        if (
            reviews![reviewIndex!].liked_by &&
            reviews![reviewIndex!].liked_by.includes(session?.user.id)
        ) {
            rpc_function = 'decrement_review_likes';
        }

        if (review_id) {
            let { data: _comment, error } = await supabase.rpc(rpc_function, {
                row_id: review_id,
                uid: session?.user.id
            });

            if (!error) {
                if (rpc_function === 'decrement_review_likes') {
                    let i = reviews![reviewIndex!].liked_by.findIndex(
                        (uid: string | undefined) => uid === session?.user.id
                    );
                    reviews![reviewIndex!].liked_by.splice(i, 1);
                    reviews![reviewIndex!].likes -= 1;
                } else {
                    if (reviews![reviewIndex!].liked_by) {
                        reviews![reviewIndex!].liked_by.push(session?.user.id);
                    } else {
                        reviews![reviewIndex!].liked_by = [session?.user.id];
                    }
                    reviews![reviewIndex!].likes += 1;
                }
            }
        }

        likeLoading.update((prev) => false);
    };
</script>

{#if $checkoutModal}
    <Checkout bind:email bind:codeSent bind:loading on:sendCode={sendCode} />
{/if}

<div class="bg-background relative">
    <Producthead
        on:addToCart={handleAddToCart}
        on:buyNow={checkout}
        bind:product={prod}
        bind:alreadyBought
    />
    <Hilyard />
    <Ambient />
    <Presets />
    <AmbientMusic />
    <LostReveries />
    <PlayVideo />
    <Mirage />
    <MoodBoard />
    <Cards />
    <Products products={$allProducts && $allProducts.slice(0, 8)} />
    <Reviews {reviews} on:updateLikes={updateLikes} user_id={session?.user.id} />

    {#if $user.authenticated && alreadyBought && !alreadyReviewed}
        <ReviewSection on:addReview={addReview} bind:loading />
    {/if}
    <div class="h-12"></div>
</div>
