<script lang="ts">
    import MediaQuery from '$lib/MediaQuery.svelte';
    import logo from '$lib/assets/logo.svg?raw';
    import '@fontsource/poppins';
    import { Menu } from 'lucide-svelte';
    import { X } from 'lucide-svelte';
    import ShopDropdown from '../components/nav/shop-dropdown.svelte';

    type ChildNavItem = {
        name: string;
        link: string;
    };

    type NavItem = {
        name: string;
        link: string;
        children: ChildNavItem[];
    };

    const navItems: NavItem[] = [
        {
            name: 'Shop',
            link: '/shop',
            children: [
                { name: 'Mirage Libraries', link: 'libs' },
                { name: 'Kontakt Libraries', link: 'libs' }
            ]
        },
        { name: 'Blog', link: '/blog', children: [] },
        { name: 'Help', link: '/help', children: [] },
        { name: 'Mirage', link: '/mirage', children: [] },
        { name: 'Company', link: '/company', children: [] }
    ];

    let showMobileMenu = false;

    function toggleMobileMenu() {
        showMobileMenu = !showMobileMenu;
    }

    function handleScreenSize(screen_is_large: boolean) {
        if (screen_is_large) showMobileMenu = false;
        return screen_is_large;
    }

</script>

<header>
    <div class="header-column left-column">
        <a href="/">
            {@html logo}
        </a>
    </div>
    <MediaQuery query="(min-width: 772px)" let:matches={screen_is_large}>
        {#if handleScreenSize(screen_is_large)}
            <nav class="header-column desktop-nav middle-column">
                <ul>
                    {#each navItems as item}
                        <li>
                            <div class="dropdown">
                                <a href={item.link}>
                                    {item.name}

                                    {#if item.children.length != 0}
                                        >
                                    {/if}
                                </a>

                                {#if item.children.length != 0}
                                    <div class="dropdown-content">
                                        {#each item.children as childItem}
                                            <a href={childItem.link}>{childItem.name}</a>
                                        {/each}
                                    </div>
                                {/if}
                            </div>
                        </li>
                    {/each}
                </ul>
            </nav>
            <div class="header-column right-column desktop-nav">
                <a href="/my-account">Login</a>
            </div>
        {:else}
            <div class="header-column right-column">
                <button class="icon-button" on:click={toggleMobileMenu}>
                    {#if showMobileMenu}
                        <X />
                    {:else}
                        <Menu />
                    {/if}
                </button>
                <p />
            </div>
        {/if}
    </MediaQuery>
</header>

{#if showMobileMenu}
    <nav class="mobile-nav">
        <ul>
            {#each navItems as item}
                <li><a href={item.link}>{item.name}</a></li>
            {/each}
        </ul>
    </nav>
{/if}

<style>
    header {
        display: flex;
        justify-content: space-between;
        background-color: var(--bg-1);
        padding: 0 22px;
        position: sticky;
        top: 0;
        z-index: 999;
    }

    .header-column {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .left-column {
        justify-content: left;
    }
    .left-column a {
        padding-top: 4px;
    }

    .middle-column {
        flex-grow: 3;
    }

    .right-column {
        justify-content: right;
    }

    .desktop-nav ul,
    .mobile-nav ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
    }

    .desktop-nav a,
    .mobile-nav a {
        color: var(--fg-1);
        text-decoration: none;
    }

    .desktop-nav a:hover,
    .mobile-nav a:hover {
        color: var(--link);
    }

    .desktop-nav li {
        display: inline;
        margin: 0;
    }

    .desktop-nav a {
        padding: 12px 16px;
    }

    .mobile-nav li a {
        display: block;
        padding: 7px 14px;
    }

    .mobile-nav ul {
        margin: 0;
        background-color: var(--bg-3);
    }

    .icon-button {
        font-family: 'Material Icons Round';
        font-size: 24px;
        color: var(--fg-1);
        background: none;
        border: none;
    }

    .dropdown {
        position: relative;
        display: inline-block;
    }

    .dropdown-content {
        margin-top: 10px;
        display: none;
        position: absolute;
        background-color: var(--bg-3);
        min-width: 200px;
        box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
        z-index: 1;
    }

    .dropdown-content a {
        padding: 12px 16px;
        display: block;
    }

    .dropdown:hover .dropdown-content {
        display: block;
    }

    .dropdown:hover .desktop-nav a {
        background-color: #3e8e41;
    }
</style>
