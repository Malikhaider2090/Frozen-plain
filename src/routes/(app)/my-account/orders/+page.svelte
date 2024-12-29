<script lang="ts">
    import { currency, orders } from '$lib/store';
    import Icon from '../../../../components/shared/icon.svelte';

</script>

<div
    class="flex flex-col gap-4 col-span-3 w-full {($orders && Object.keys($orders).length > 0) ||
        'h-full justify-center items-center'}"
>
    {#if $orders && Object.keys($orders).length > 0}
        <h5 class="text-h_5 text-card font-semibold">My Orders</h5>
        <div class="overflow-x-hidden w-full">
            <div
                class="overflow-x-auto snap-x snap-mandatory scroll-smooth overscroll-x-contain flex flex-nowrap"
            >
                <table class="border-separate border-spacing-0 rounded-lg overflow-hidden w-full">
                    <thead>
                        <tr>
                            <th class="border-b-4 border-card-5 rounded-bl-lg min-w-max snap-center"
                                >Date</th
                            >
                            <th class="border-b-4 border-card-5 min-w-max snap-center">Products</th>
                            <th class="border-b-4 border-card-5 rounded-br-lg min-w-max snap-center"
                                >Total</th
                            >
                        </tr>
                    </thead>
                    <tbody>
                        {#each Object.entries($orders) as [key, value]}
                            <tr>
                                <td class="min-w-max whitespace-nowrap"
                                    >{new Date(key.split('|')[1]).toLocaleDateString('en-GB', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit'
                                    })}</td
                                >
                                <td>
                                    <div class="flex flex-col gap-2">
                                        {#each value.products as product, index}
                                            <!-- <p>{product.name}</p> -->
                                            <a
                                                href="/product/{product.sku}"
                                                class="whitespace-nowrap"
                                                >{index + 1}-{product.name}</a
                                            >
                                        {/each}
                                    </div>
                                </td>
                                <td>{$currency.symbol}{value.total.toFixed(2)}</td>
                            </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
        </div>
    {:else if $orders && Object.keys($orders).length === 0}
        <div
            class="rounded-lg border-2 border-card-5 bg-foreground p-4 flex flex-col gap-2 max-sm:mx-2 sm:min-w-[35rem] w-full max-w-2xl"
        >
            <div class="flex items-center gap-2">
                <div class="bg-primary-yellow p-0.5 rounded-sm">
                    <Icon name="Warning" class="fill-card" width="16" height="16" />
                </div>
                <p class="text-card text-lg font-normal">No order has been made yet.</p>
            </div>
            <hr class="border-card-5 border-2" />
            <div class="flex gap-6 justify-center pt-6 pb-4">
                <a
                    href="/shop"
                    class="uppercase text-center w-max sm:w-[12rem] text-card hover:text-primary-blue border-2 border-primary-blue bg-primary-blue hover:bg-foreground rounded-lg py-3 text-md font-bold"
                >
                    Browse Products
                </a>
            </div>
        </div>
    {:else}
        <div
            class="rounded-lg border-2 border-card-5 bg-foreground p-4 flex flex-col gap-2 max-sm:mx-2 sm:min-w-[35rem] w-full max-w-2xl"
        >
        <h5 class="text-center text-card text-h5">Loading...</h5>

        </div>
    {/if}
</div>

<style lang="postcss">
    table {
        @apply bg-foreground border-4 border-card-5;
    }
    th {
        @apply text-start text-h_6 text-card font-semibold bg-section;
    }
    td,
    th {
        @apply py-6 px-8;
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
    td a {
        @apply text-primary-blue;
    }
</style>
