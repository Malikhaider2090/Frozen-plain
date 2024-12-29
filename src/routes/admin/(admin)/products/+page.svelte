<script lang="ts">
    import * as R from 'ramda';
    import { PenLine, Trash2 } from 'lucide-svelte';
    import { goto } from '$app/navigation';

    export let data;

    $: ({ products } = data);

    $: filtered_products = [...products!];

    let product_title: string = '';

    const debounceR = R.curry(
        (
            config: { delay: any; initialInstant?: false | undefined },
            fn: { apply: (arg0: Window & typeof globalThis, arg1: any) => unknown }
        ) => {
            const { delay, initialInstant = false } = R.is(Number, config)
                ? { delay: config }
                : config;
            let timer: string | number | NodeJS.Timeout | null | undefined = null;
            let firstCall = false;
            return (...args: any) =>
                new Promise((resolve, reject) => {
                    const safeCall = () => {
                        try {
                            resolve(fn.apply(window, args));
                        } catch (e) {
                            reject(e);
                        }
                    };
                    if (!firstCall) {
                        firstCall = true;
                        if (initialInstant) {
                            safeCall();
                            return;
                        }
                    }
                    if (!R.isNil(timer)) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(safeCall, delay);
                });
        }
    );

    const handleSearchInput = debounceR({ delay: 800 }, (e: { target: { value: any } }) => {
        const value = e.target.value;

        if (value === '') {
            filtered_products = [...products!];
        } else {
            filtered_products = products!.filter((e) =>
                e.name.toLowerCase().includes(value.toLowerCase())
            );
        }
    });
</script>

<div class="flex items-end justify-between">
    <h2 class="text-h2 text-card font-bold">Products</h2>
    <input
        type="text"
        placeholder="Search title"
        bind:value={product_title}
        class="rounded-md p-1 px-2 bg-foreground text-card min-w-[250px]"
        on:input={handleSearchInput}
    />
</div>
<table class="w-full text-card mt-8">
    <thead class="text-blue-dark">
        <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Format</th>
            <th>Style</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {#if filtered_products}
            {#each filtered_products as { name, content, format, style, price, live, sku }}
                <tr>
                    <td>{name}</td>
                    <td>
                        {#if content}
                            {#each content.split('|') as _content}
                                <p class="border-b border-b-section py-1 last:border-0">
                                    {_content}
                                </p>
                            {/each}
                        {/if}
                    </td>
                    <td>
                        {#if format}
                            {#each format.split('|') as _format}
                                <p class="border-b border-b-section py-1 last:border-0">
                                    {_format}
                                </p>
                            {/each}
                        {/if}
                    </td>
                    <td>
                        {#if style}
                            {#each style.split('|') as _style}
                                <p class="border-b border-b-section py-1 last:border-0">
                                    {_style}
                                </p>
                            {/each}
                        {/if}
                    </td>
                    <td>{price}</td>
                    <td>{live ? 'Live' : 'Archived'}</td>
                    <td>
                        <div class="flex items-center justify-center gap-4">
                            <button
                                class="text-primary-green"
                                on:click={() => goto(`/admin/products/add/${sku}`)}
                            >
                                <PenLine />
                            </button>
                            <button class="text-primary-red">
                                <Trash2 />
                            </button>
                        </div>
                    </td>
                </tr>
            {/each}
        {/if}
    </tbody>
</table>

<style lang="postcss">
    table {
        @apply bg-foreground border-4 border-card-5;
    }
    th {
        @apply text-start text-card font-semibold bg-section;
    }
    td,
    th {
        @apply py-3 px-3;
    }

    td {
        @apply border-2 border-card-5 text-start align-text-top text-card;
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
