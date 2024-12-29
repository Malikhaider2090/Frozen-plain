<script lang="ts">
    import { user } from '$lib/store';
    import { Minus, Plus, UserCircle2 } from 'lucide-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let filters = {
        mirage: false,
        company: false,
        account: false
    };

    let focus = {
        mirage: false,
        company: false,
        account: false
    };

    const toggle = (name: 'mirage' | 'company' | 'account') => () => {
        filters[name] = !filters[name];
        focus[name] = !focus[name];
    };
</script>

<div class="flex flex-col gap-4 font-normal font-inter text-xxs text-card w-full">
    {#if $user.authenticated}
        <div class="flex flex-col gap-2">
            <p class="flex items-center py-3 px-4 rounded-lg">
                <UserCircle2 class="text-primary-blue mr-3" />
                <span>{$user.email.split('@')[0]}</span>
            </p>
        </div>
    {/if}
    <div
        class="flex flex-col gap-2 bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 rounded-lg"
    >
        <a href="/shop" class="grid place-items-start py-3 px-4 rounded-lg">
            <span>SHOP</span>
        </a>
    </div>

    <div
        class="flex flex-col gap-2 bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 rounded-lg"
    >
        <a href="/blog" class="grid place-items-start py-3 px-4 rounded-lg">
            <span>BLOG</span>
        </a>
    </div>

    <div
        class="flex flex-col gap-2 bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 rounded-lg"
    >
        <button class="grid place-items-start py-3 px-4 rounded-lg">
            <span>HELP/CONTACT</span>
        </button>
    </div>

    <div class="flex flex-col gap-4 rounded-lg">
        <button
            class="flex flex-row justify-between items-center border-card/5 hover:border-card-15 border-2 py-3 px-4 rounded-lg"
            on:click={toggle('mirage')}
            class:bg-primary-blue={focus.mirage}
            class:bg-primary-navhover-2={!focus.mirage}
            class:hover:bg-card-15={!focus.mirage}
        >
            <span>MIRAGE</span>

            {#if filters.mirage}
                <Minus />
            {:else}
                <Plus />
            {/if}
        </button>

        {#if filters.mirage}
            <div class="flex flex-col gap-4 w-full text-card/80 font-light">
                <div
                    class="flex flex-row justify-start items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 p-2 rounded-lg"
                >
                    <span class="p-1">Installer</span>
                </div>
                <div
                    class="flex flex-row justify-start items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 p-2 rounded-lg"
                >
                    <span class="p-1">Update</span>
                </div>
                <div
                    class="flex flex-row justify-start items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 p-2 rounded-lg"
                >
                    <span class="p-1">Beta</span>
                </div>
            </div>
        {/if}
    </div>

    <div class="flex flex-col gap-4 rounded-lg">
        <button
            class="flex flex-row justify-between items-center border-card/5 hover:border-card-15 border-2 py-3 px-4 rounded-lg"
            on:click={toggle('company')}
            class:bg-primary-blue={focus.company}
            class:bg-primary-navhover-2={!focus.company}
            class:hover:bg-card-15={!focus.company}
        >
            <span>COMPANY</span>

            {#if filters.company}
                <Minus />
            {:else}
                <Plus />
            {/if}
        </button>

        {#if filters.company}
            <div class="flex flex-col gap-4 w-full text-card/80 font-light">
                <div
                    class="flex flex-row justify-start items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 p-2 rounded-lg"
                >
                    <span class="p-1">About</span>
                </div>
                <div
                    class="flex flex-row justify-start items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 p-2 rounded-lg"
                >
                    <span class="p-1">Newsletter</span>
                </div>
                <div
                    class="flex flex-row justify-start items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 p-2 rounded-lg"
                >
                    <span class="p-1">Refund Policy</span>
                </div>
                <div
                    class="flex flex-row justify-start items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 p-2 rounded-lg"
                >
                    <span class="p-1">Terms & Conditions</span>
                </div>
            </div>
        {/if}
    </div>

    {#if $user.authenticated}
        <div class="flex flex-col gap-4 rounded-lg">
            <button
                class="flex flex-row justify-between items-center border-card/5 hover:border-card-15 border-2 py-3 px-4 rounded-lg"
                on:click={toggle('account')}
                class:bg-primary-blue={focus.account}
                class:bg-primary-navhover-2={!focus.account}
                class:hover:bg-card-15={!focus.account}
            >
                <span>MY ACCOUNT</span>

                {#if filters.account}
                    <Minus />
                {:else}
                    <Plus />
                {/if}
            </button>

            {#if filters.account}
                <div class=" flex flex-col gap-4 w-full text-card/80 font-light">
                    <!-- <div
                        class="flex flex-row justify-between items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 rounded-lg"
                    >
                        <a href="/my-account/settings" class="p-3 w-full">Dashboard</a>
                    </div> -->
                    <div
                        class="flex flex-row justify-between items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 rounded-lg"
                    >
                        <a href="/my-account/downloads" class="p-3 w-full">Downloads</a>
                    </div>
                    <div
                        class="flex flex-row justify-between items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 rounded-lg"
                    >
                        <a href="/my-account/settings" class="w-full p-3">Account Settings</a>
                    </div>
                    <div
                        class="flex flex-row justify-between items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 rounded-lg"
                    >
                        <a href="/my-account/orders" class="p-3 w-full">My Orders</a>
                    </div>
                    <button
                        on:click={() => dispatch('logout')}
                        class="flex flex-row justify-between cursor-pointer items-center bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 p-2 rounded-lg"
                    >
                        <span class="p-1">Logout</span>
                    </button>
                </div>
            {/if}
        </div>
    {:else}
        <a
            href="/sign-in"
            class="flex items-center gap-3 p-3 bg-primary-navhover-2 hover:bg-card-15 border-card/5 hover:border-card-15 border-2 rounded-lg"
        >
            <UserCircle2 class="text-card" />

            <p class="grid place-items-start">LOGIN/REGISTER</p>
        </a>
    {/if}
</div>
