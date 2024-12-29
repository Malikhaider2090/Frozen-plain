<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { LogOut } from 'lucide-svelte';

    const signout = async () => {
        await goto(`/admin?signout=true`)
    }
</script>

<div class="bg-background min-h-screen">
    <header class="bg-foreground py-3 shadow-md flex items-center justify-between px-6">
        <img
            alt="logo"
            src="/icons/logo-adj.svg"
            class="place-content-start w-52 p-2 max-sm:w-52"
        />
        <button
            class="flex text-card/90 items-center justify-center gap-1 hover:text-card"
            on:click={signout}
        >
            <LogOut />
            Logout
        </button>
    </header>
    <main class="grid grid-cols-12 px-6 py-4 gap-x-4">
        <aside class="col-span-2 text-card/90 flex flex-col gap-3">
            <nav
                class="hover:text-blue-light cursor-pointer"
                class:text-blue-light={$page.url.pathname === '/admin/products'}
            >
                <a href="/admin/products">Products Listing</a>
            </nav>
            <nav
                class="hover:text-blue-light cursor-pointer"
                class:text-blue-light={$page.url.pathname.includes('/admin/products/add')}
            >
                <a href="/admin/products/add">Add/Edit Product</a>
            </nav>
            <nav
                class="hover:text-blue-light cursor-pointer"
                class:text-blue-light={$page.url.pathname === '/admin/products/file'}
            >
                <a href="/admin/products/file">Files</a>
            </nav>
        </aside>
        <div class="col-span-10">
            <slot />
        </div>
    </main>
</div>
