<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { slide } from 'svelte/transition';
    import { clickOutside } from '../../../action/clickoutside';
    import Icon from '../../../components/shared/icon.svelte';
    import { backInOut } from 'svelte/easing';
    import { X } from 'lucide-svelte';
    import { user } from '$lib/store';
    import { signOut } from '$lib/supabase';
    import { onMount } from 'svelte';

    export let data;
    let { supabase } = data;

    const items = [
        {
            title: 'Downloads',
            url: '/my-account/downloads/',
            slug: 'downloads',
            icon: 'Download',
            icon_height: 18,
            icon_width: 16
        },
        {
            title: 'Account Settings',
            url: '/my-account/settings/',
            slug: 'settings',
            icon: 'Settings',
            icon_height: 16,
            icon_width: 16
        },
        {
            title: 'My Orders',
            url: '/my-account/orders/',
            slug: 'orders',
            icon: 'Orders',
            icon_height: 15,
            icon_width: 16
        },
        {
            title: 'Logout',
            url: '/logout',
            slug: 'logout',
            icon: 'Logout',
            icon_height: 16,
            icon_width: 16
        }
    ];

    let open = false;

    const handleClick = (url: string) => {
        if (url === $page.url.pathname) {
            open = false;
        } else {
            goto(url);
        }
    };

    $: $page.url && (open = false);

    onMount(() => {
        if (!$user.authenticated) {
            goto('/sign-in');
        }
    });

    const handleSignOut = async () => {
        signOut(supabase);
        goto('/');
    };
</script>

<div class="bg-foreground">
    <h1 class="container font-semibold text-h_2 max-sm:text-h_3 font-inter text-card py-5 md:py-10">
        My Account
    </h1>

    <div class="bg-background w-full">
        <div class="flex flex-col xl:grid grid-cols-4 container pt-6 pb-16 gap-x-10 gap-y-8 w-full">
            {#if open}
                <div
                    class="fixed z-50 top-0 bottom-0 left-0 right-0 bg-foreground/50 overflow-y-auto"
                >
                    <div
                        transition:slide={{
                            delay: 250,
                            duration: 300,
                            easing: backInOut,
                            axis: 'x'
                        }}
                        use:clickOutside
                        on:clickoutside={() => (open = false)}
                        class="bg-foreground px-3 h-full overflow-y-auto max-sm:w-[85%] max-lg:w-2/4 w-1/4 transition duration-300 ease-in-out"
                    >
                        <button
                            on:click={() => (open = false)}
                            class=" flex flex-row justify-center items-center gap-4 text-card text-lg font-semibold pt-6 py-3"
                            ><X />CLOSE SIDEBAR</button
                        >
                        <hr class="1.5p-1.5-px h-px items-center mx-4 border-0 bg-section" />
                        <div class="flex flex-col gap-4 py-4">
                            {#each items as item}
                                <button
                                    on:click={() => {
                                        if (item.slug === 'logout') {
                                            handleSignOut();
                                        } else {
                                            handleClick(item.url);
                                        }
                                    }}
                                    class:bg-primary-blue={$page.url.pathname.includes(item.slug)}
                                    class="flex items-center gap-2 text-card {$page.url.pathname.includes(
                                        item.slug
                                    )
                                        ? 'bg-primary-blue'
                                        : 'hover:bg-primary-navhover/20'} text-h_6 font-semibold border-2 border-card-5 rounded-lg py-3 px-4"
                                >
                                    <Icon
                                        name={item.icon}
                                        class="fill-card"
                                        width={item.icon_width.toString()}
                                        height={item.icon_height.toString()}
                                    />
                                    {item.title}
                                </button>
                            {/each}
                        </div>
                    </div>
                </div>
            {/if}
            <div
                class="hidden max-xl:flex flex-row items-center gap-4 w-full bg-foreground rounded-lg border-2 border-section px-3 py-1.5"
            >
                <button
                    on:click={() => (open = true)}
                    class="hidden gap-2 max-xl:flex items-center text-lg text-card font-normal w-full whitespace-nowrap"
                >
                    <Icon name="List" class="mr-2" />
                    Show Sidebar
                </button>
            </div>
            <div
                class="hidden xl:flex flex-col gap-4 bg-foreground border-2 border-card-5 p-4 rounded-lg h-[34rem]"
            >
                {#each items as item}
                    {#if item.slug === 'logout'}
                        <button
                            on:click={handleSignOut}
                            class:bg-primary-blue={$page.url.pathname.includes(item.slug)}
                            class="flex items-center gap-2 text-card {$page.url.pathname.includes(
                                item.slug
                            )
                                ? ''
                                : 'hover:bg-primary-navhover/20'} text-h_6 font-semibold border-2 border-card-5 rounded-lg py-3 px-4"
                        >
                            <Icon
                                name={item.icon}
                                class="fill-card"
                                width={item.icon_width.toString()}
                                height={item.icon_height.toString()}
                            />
                            {item.title}
                        </button>
                    {:else}
                        <a
                            href={item.url}
                            class:bg-primary-blue={$page.url.pathname.includes(item.slug)}
                            class="flex items-center gap-2 text-card {$page.url.pathname.includes(
                                item.slug
                            )
                                ? ''
                                : 'hover:bg-primary-navhover/20'} text-h_6 font-semibold border-2 border-card-5 rounded-lg py-3 px-4"
                        >
                            <Icon
                                name={item.icon}
                                class="fill-card"
                                width={item.icon_width.toString()}
                                height={item.icon_height.toString()}
                            />
                            {item.title}
                        </a>
                    {/if}
                {/each}
            </div>
            <slot />
        </div>
    </div>
</div>
