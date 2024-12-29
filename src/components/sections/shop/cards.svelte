<script lang="ts">
    import type { Product } from '$lib/interfaces';
    import ShopCard from '../../ui/shop-card.svelte';
    export let products: Product[];
</script>

<div class="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
    {#each products as product}
        <ShopCard
            sku={product.sku}
            discount={product.discount || 0}
            thumbnail={product.thumbnail}
            icon={product.icon}
            title={product.name}
            description={product.tagline}
            price={product.formatted_price}
            rating={product.rating}
        />
    {/each}
</div>
