<script lang="ts">
    import type { ImageInterface } from '$lib/interfaces';

    export let discount = 0;
    export let thumbnail: ImageInterface;
    export let icon: ImageInterface;
    export let title = '';
    export let description = '';
    export let price = '£0.00';
    export let classes = '';
    export let sku = '';
    export let rating = 0;
    export let spotLight = false;
</script>

<a href="/product/{sku}" class="group">
    <div
        class={`flex flex-col h-full bg-foreground border-2 border-section rounded-lg overflow-hidden ${classes}`}
    >
        <div class="w-full bg-center relative bg-no-repeat bg-cover">
            {#if spotLight}
                <img
                    class="w-full h-52 object-cover group-hover:scale-110 transition-all duration-500"
                    src={thumbnail?.url}
                    alt="{title} thumbnail"
                />
            {:else}
                <img
                    class="w-full h-40 object-cover group-hover:scale-110 transition-all duration-500"
                    src={thumbnail?.url}
                    alt="{title} thumbnail"
                />
            {/if}
            {#if discount > 0}
                <div
                    class="text-card flex flex-col items-center justify-center font-inter bg-primary-red rounded-br-lg absolute top-0 left-0 py-2 px-4 z-10"
                >
                    <span class="text-h5 font-light py-4">
                        -{discount}%
                    </span>
                </div>
            {/if}
        </div>

        <div class="m-3 flex flex-col justify-between gap-2 h-full">
            <div class="flex flex-col justify-start gap-2">
                <div class="flex flex-col gap-2">
                    <div class="pt-1 flex gap-2 items-center">
                        <img class="w-5" src={icon.url} alt="{title} icon" />
                        <p class="font-normal font-futura text-shopcard text-card">{title}</p>
                    </div>
                    <div class="flex flex-col gap-2">
                        <p class="font-normal font-futura text-shopcard text-card">{description}</p>
                        {#if rating > 0}
                            <div class="flex flex-row gap-1 my-2">
                                {#each [...Array(rating).keys()] as _}
                                    <img class="w-4" src="/icons/star.svg" alt="" />
                                {/each}
                                {#each [...Array(5 - rating).keys()] as _}
                                    <img class="w-4" src="/icons/star-empty.svg" alt="" />
                                {/each}
                            </div>
                        {/if}
                        <p class=" font-normal font-futura text-h5 text-card">
                            {price}
                        </p>
                    </div>
                </div>
            </div>

            <!-- <Button icon="cart" title="ADD TO CART" /> -->
        </div>
    </div>
</a>
