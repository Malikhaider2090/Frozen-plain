<!-- svelte-ignore a11y-no-static-element-interactions -->
<script lang="ts">
    import { AlignJustify, Search, ShoppingCart, UserCircle2, X } from 'lucide-svelte';
    import Link from '../shared/link.svelte';
    import ShopDropdown from './shop-dropdown.svelte';
    import Mirage from './mirage-dropdown.svelte';
    import CompanyDropdown from './company-dropdown.svelte';
    import { clickOutside } from '../../action/clickoutside';
    import { cart, user, currency, type CartProduct } from '$lib/store';
    import { quintOut, backInOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';
    import Homenavbar from '../sections/homenavbar.svelte';
    import { page } from '$app/stores';
    import { createEventDispatcher } from 'svelte';

    let dropdowns = {
        search: false,
        company: false,
        shop: false,
        mirage: false,
        profile: false
    };
    const dispatch = createEventDispatcher();

    const toggle =
        (name: 'search' | 'company' | 'shop' | 'mirage' | 'profile', leave?: boolean) => () => {
            switch (name) {
                case 'company':
                    dropdowns = {
                        search: false,
                        company: !dropdowns.company,
                        shop: false,
                        mirage: false,
                        profile: false
                    };
                    break;
                case 'mirage':
                    dropdowns = {
                        search: false,
                        company: false,
                        shop: false,
                        mirage: !dropdowns.mirage,
                        profile: false
                    };
                    break;
                case 'profile':
                    if (leave) {
                        dropdowns = {
                            search: false,
                            company: false,
                            shop: false,
                            mirage: false,
                            profile: false
                        };
                    } else {
                        dropdowns = {
                            search: false,
                            company: false,
                            shop: false,
                            mirage: false,
                            profile: true
                        };
                    }
                    break;
                case 'search':
                    dropdowns = {
                        search: !dropdowns.search,
                        company: false,
                        shop: false,
                        mirage: false,
                        profile: false
                    };
                    break;
                case 'shop':
                    dropdowns = {
                        search: false,
                        company: false,
                        shop: !dropdowns.shop,
                        mirage: false,
                        profile: false
                    };
                    break;
            }
        };

    function closeAll(): void {
        dropdowns = {
            search: false,
            company: false,
            shop: false,
            mirage: false,
            profile: false
        };
    }

    let profileLinks = [
        // {
        //     name: 'Dashboard',
        //     path: '/'
        // },
        {
            name: 'Orders',
            path: '/my-account/orders'
        },
        {
            name: 'Downloads',
            path: '/my-account/downloads'
        },
        {
            name: 'Account Details',
            path: '/my-account/settings'
        },
        // {
        //     name: 'FP Credits',
        //     path: '/'
        // },
        {
            name: 'Logout',
            type: 'button',
            handler: () => {
                dispatch('signOut');
            }
        }
    ];

    let mobile = false;
    let open = false;

    function toggleNav() {
        open = !open;
    }

    let cartTotal = 0;
    $: getTotal($cart);

    const getTotal = (cart: CartProduct[]) => {
        cartTotal = 0;
        cart.forEach((cartProd) => {
            cartTotal += cartProd.price;
        });
    };

    $: $page.url && (open = false);
</script>

<header
    use:clickOutside
    on:clickoutside={closeAll}
    class="sticky top-0 left-0 right-0 z-50 bg-foreground"
>
    <div class="container flex items-center justify-between xl:grid xl:grid-cols-3 py-1">
        {#if !mobile}
            <button on:click={toggleNav} class="hidden text-right text-card max-xl:block">
                <AlignJustify />
            </button>
        {:else}
            <X class="hidden text-card max-xl:block" />
        {/if}

        <a href="/">
            <img
                alt="logo"
                src="/icons/logo-adj.svg"
                class="place-content-start w-52 my-2 p-2 max-sm:w-52"
            />
        </a>

        <div class="relative place-content-end items-center gap-4 hidden max-xl:flex">
            <Link to="/cart">
                <ShoppingCart class="text-primary-blue mr-3" />
                <span
                    class="absolute -top-2 right-1 bg-card rounded-full w-5 h-5 text-primary-blue text-center"
                    >{$cart.length}</span
                >
            </Link>
        </div>
        <!-- mobile-nav -->
        {#if open}
            <div class="fixed z-50 top-0 bottom-0 left-0 right-0 bg-foreground/50 overflow-y-auto">
                <div
                    transition:slide={{
                        delay: 250,
                        duration: 300,
                        axis: 'x'
                    }}
                    use:clickOutside
                    on:clickoutside={toggleNav}
                    class="bg-foreground p-4 h-full overflow-y-auto max-sm:w-[85%] max-lg:w-2/4 w-1/4 transition duration-300 ease-in-out"
                >
                    <Homenavbar on:logout={() => dispatch('signOut')} />
                </div>
            </div>
        {/if}
        <!-- nav -->
        <div class="relative place-content-center h-full flex items-stretch gap-4 max-xl:hidden">
            <Link on:mouseenter={toggle('shop')} on:mouseleave={toggle('shop')} dropdown to="/shop"
                >SHOP
                <div class="absolute top-[50px] left-0 z-[51] text-card">
                    {#if dropdowns.shop}
                        <ShopDropdown />
                    {/if}
                </div>
            </Link>

            <Link to="/blog">BLOG</Link>
            <Link>Help/Contact</Link>
            <Link on:mouseenter={toggle('mirage')} on:mouseleave={toggle('mirage')} dropdown
                >Mirage
                <div slot="dropdown" class="absolute top-[50px] left-0 z-[51] text-card">
                    {#if dropdowns.mirage}
                        <Mirage />
                    {/if}
                </div>
            </Link>

            <Link on:mouseenter={toggle('company')} on:mouseleave={toggle('company')} dropdown
                >Company
                <div slot="dropdown" class="absolute top-[50px] left-0 z-[51] text-card">
                    {#if dropdowns.company}
                        <CompanyDropdown />
                    {/if}
                </div>
            </Link>
        </div>

        <div class="place-content-end flex items-stretch h-full gap-4 max-xl:hidden">
            {#if $user.authenticated}
                <div
                    on:mouseleave={toggle('profile', true)}
                    class="relative flex items-center gap-2 w-60 justify-end"
                >
                    <div
                        class="flex items-center cursor-pointer gap-2"
                        on:mouseenter={toggle('profile')}
                    >
                        <UserCircle2 class="text-primary-blue" />
                        <p class="text-card font-inter font-bold text-xxs">
                            {$user.email?.split('@')[0] || 'Email'}
                        </p>
                    </div>
                    {#if dropdowns.profile}
                        <div
                            transition:slide={{
                                delay: 250,
                                duration: 300,
                                axis: 'y'
                            }}
                            class="absolute top-[50px] right-0 z-[51] cursor-pointer text-card"
                        >
                            <div
                                class="p-6 grid grid-cols-1 z-50 gap-20 w-60 h-fit border-2 border-card/5 rounded-lg bg-black"
                            >
                                <div class="grid grid-cols-1 font-inter">
                                    {#each profileLinks as { type, name, path, handler }}
                                        {#if type && type == 'button'}
                                            <button
                                                on:click={handler}
                                                class="flex flex-row gap-2 text-card/80 hover:text-card hover:bg-primary-blue rounded-lg py-1 pl-2"
                                                >{name}</button
                                            >
                                        {:else}
                                            <a
                                                class="flex flex-row gap-2 text-card/80 hover:text-card hover:bg-primary-blue rounded-lg py-1 pl-2"
                                                href={path}
                                                >{name}
                                            </a>
                                        {/if}
                                    {/each}
                                </div>
                            </div>
                        </div>
                    {/if}
                </div>
            {:else}
                <Link to="/sign-in">
                    <UserCircle2 class="text-primary-blue mr-3" />
                    Login / Register
                </Link>
            {/if}

            <Link to="/cart">
                <div class="relative">
                    <ShoppingCart class="text-primary-blue mr-3" />
                    <span
                        class="absolute -top-2 right-1 bg-card flex items-center justify-center rounded-full w-5 h-5 text-primary-blue text-center"
                        >{$cart.length}</span
                    >
                </div>
                {$currency.symbol}{cartTotal.toFixed(2)}
            </Link>

            <div
                class="flex flex-col justify-center relative"
                on:mouseenter={toggle('search')}
                on:mouseleave={toggle('search')}
            >
                <Search class="stroke-primary-blue cursor-pointer" />
                {#if dropdowns.search}
                    <div
                        transition:slide={{
                            delay: 250,
                            duration: 300,
                            axis: 'x'
                        }}
                        class="absolute top-[50px] right-0 z-[51] cursor-pointer text-card"
                    >
                        <div
                            class="px-6 py-2 flex items-center z-50 gap-2 w-fit h-fit border-2 border-card/5 rounded-lg bg-black"
                        >
                            <input
                                placeholder="Search for products"
                                class="font-inter font-light text-xxs outline-none text-card/80 hover:text-card bg-black p-2"
                            />
                            <button>
                                <Search class="stroke-card" />
                            </button>
                        </div>
                    </div>
                {/if}
            </div>
        </div>
    </div>
</header>
