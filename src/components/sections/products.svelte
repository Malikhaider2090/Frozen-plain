<script lang="ts">
    import type { Product } from '$lib/interfaces';
    import ShopCard from '../ui/shop-card.svelte';

    export let products: Product[] | null = [];
</script>

<section class="w-full">
    <div class="container pt-24">
        <h1 class="font-semibold text-h_2 max-sm:text-h_3 font-inter text-card mb-14">
            Product Spotlight
        </h1>
        <div class="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {#if products}
                {#each products as { sku, discount, tagline, name, formatted_price, rating, thumbnail, icon }}
                    <ShopCard
                        {sku}
                        discount={discount || 0}
                        {thumbnail}
                        {icon}
                        title={name}
                        description={tagline}
                        price={formatted_price}
                        {rating}
                        spotLight={true}
                    />
                {/each}
            {:else}
                <h5 class="text-center text-card text-h5 w-max mx-auto">Loading...</h5>
            {/if}
        </div>
        <center class="mt-16 mb-20">
            <a
                href="/shop"
                class="font-bold hover:bg-primary-blue text-sm text-card border-4 px-8 border-primary-blue p-3 rounded-lg"
            >
                SHOW ALL
            </a>
        </center>
    </div>
</section>
