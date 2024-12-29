<script lang="ts">
    import { ChevronLeftCircle, ChevronRightCircle, Slice } from 'lucide-svelte';
    import ShopCard from '../../ui/shop-card.svelte';
    import viewport from '$lib/inView';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import type { Product } from '$lib/interfaces';

    export let products: Product[] | null;

    let width: number;
    let scroll = false;
    let activeIndex = 0;
    let inc: number;

    onMount(() => {
        setIncrement();
    });

    const setIncrement = () => {
        if (width < 768) {
            inc = 1;
        } else if (width < 1024) {
            inc = 2;
        } else if (width < 1280) {
            inc = 3;
        } else {
            inc = 4;
        }
    };

    $: {
        if (activeIndex >= 0 && scroll === true) {
            scrollActiveElement(activeIndex);
        }
        if (width) setIncrement();
    }

    const scrollActiveElement = (index: number) => {
        if (browser) {
            const element = document.getElementById(`related-${index}`);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                });
            }
        }
    };

    const handleEnterViewport = (index: number) => {
        scroll = false;

        if (products && products[index]) {
            activeIndex = index;
        }
    };

    const next = () => {
        scroll = true;
        let nextIndex = activeIndex + inc;
        if (products && products[nextIndex]) {
            activeIndex = nextIndex;
        }
    };

    const prev = () => {
        scroll = true;

        let nextIndex = activeIndex - inc;
        if (products && products[nextIndex]) {
            activeIndex = nextIndex;
        }
    };

    // const checkRight = () => {

    //     console.log(`inc ${inc}`);
    //     console.log(`width ${width}`);

    //     console.log(`increment check ${products.length - inc}`);
    //     console.log(activeIndex);

    //     return activeIndex === products.length - inc;
    // };
</script>

<svelte:window bind:innerWidth={width} />

{#if products && products.length > 0}
    <section class="w-full">
        <div class="container py-12 pb-24 grid grid-cols-1 place-items-center gap-8">
            <div class="flex justify-between items-center w-full">
                <h1 class="font-inter font-semibold text-primary-blue place-self-start text-h_5">
                    Related products
                </h1>
                <div class="flex items-center gap-3 lg:hidden">
                    <button on:click={prev} disabled={activeIndex === 0}>
                        <ChevronLeftCircle
                            size={28}
                            class="{activeIndex === 0
                                ? 'stroke-card-5'
                                : 'stroke-card'}  cursor-pointer"
                        />
                    </button>

                    <button on:click={next} disabled={activeIndex >= products.length - inc}>
                        <ChevronRightCircle
                            size={28}
                            class="{activeIndex >= products.length - inc
                                ? 'stroke-card-5'
                                : 'stroke-card'} cursor-pointer"
                        />
                    </button>
                </div>
            </div>
            <div
                class="flex flex-nowrap gap-4 justify-start overflow-x-auto w-full scrollbar snap-x snap-mandatory"
            >
                {#each products as { sku, discount, tagline, name, formatted_price, rating, thumbnail, icon }, i}
                    {#if width < 768}
                        <div
                            class="!shrink-0 flex-[100%] md:flex-[48%] lg:flex-[31.8%] xl:flex-[24%] snap-start"
                            id={`related-${i.toString()}`}
                            use:viewport
                            on:enter={() => handleEnterViewport(i)}
                        >
                            <ShopCard
                                {sku}
                                discount={discount || 0}
                                {thumbnail}
                                {icon}
                                title={name}
                                description={tagline}
                                price={formatted_price}
                                {rating}
                            />
                        </div>
                    {:else if width < 1024}
                        {#if i % 2 == 0}
                            <div
                                class="!shrink-0 flex-[100%] md:flex-[48%] lg:flex-[31.8%] xl:flex-[24%] snap-start"
                                id={`related-${i.toString()}`}
                                use:viewport
                                on:enter={() => handleEnterViewport(i)}
                            >
                                <ShopCard
                                    {sku}
                                    discount={discount || 0}
                                    {thumbnail}
                                    {icon}
                                    title={name}
                                    description={tagline}
                                    price={formatted_price}
                                    {rating}
                                />
                            </div>
                        {:else}
                            <div
                                class="!shrink-0 flex-[100%] md:flex-[48%] lg:flex-[31.8%] xl:flex-[24%] snap-start"
                                id={`related-${i.toString()}`}
                            >
                                <ShopCard
                                    {sku}
                                    discount={discount || 0}
                                    {thumbnail}
                                    {icon}
                                    title={name}
                                    description={tagline}
                                    price={formatted_price}
                                    {rating}
                                />
                            </div>
                        {/if}
                    {:else if width < 1280}
                        {#if i % 3 == 0}
                            <div
                                class="!shrink-0 flex-[100%] md:flex-[48%] lg:flex-[31.8%] xl:flex-[24%] snap-start"
                                id={`related-${i.toString()}`}
                                use:viewport
                                on:enter={() => handleEnterViewport(i)}
                            >
                                <ShopCard
                                    {sku}
                                    discount={discount || 0}
                                    {thumbnail}
                                    {icon}
                                    title={name}
                                    description={tagline}
                                    price={formatted_price}
                                    {rating}
                                />
                            </div>
                        {:else}
                            <div
                                class="!shrink-0 flex-[100%] md:flex-[48%] lg:flex-[31.8%] xl:flex-[24%] snap-start"
                                id={`related-${i.toString()}`}
                            >
                                <ShopCard
                                    {sku}
                                    discount={discount || 0}
                                    {thumbnail}
                                    {icon}
                                    title={name}
                                    price={formatted_price}
                                    description={tagline}
                                    {rating}
                                />
                            </div>
                        {/if}
                    {:else if i % 4 == 0}
                        <div
                            class="!shrink-0 flex-[100%] md:flex-[48%] lg:flex-[31.8%] xl:flex-[24%] snap-start"
                            id={`related-${i.toString()}`}
                            use:viewport
                            on:enter={() => handleEnterViewport(i)}
                        >
                            <ShopCard
                                {sku}
                                discount={discount || 0}
                                {thumbnail}
                                {icon}
                                title={name}
                                description={tagline}
                                price={formatted_price}
                                {rating}
                            />
                        </div>
                    {:else}
                        <div
                            class="!shrink-0 flex-[100%] md:flex-[48%] lg:flex-[31.8%] xl:flex-[24%] snap-start"
                            id={`related-${i.toString()}`}
                        >
                            <ShopCard
                                {sku}
                                discount={discount || 0}
                                {thumbnail}
                                {icon}
                                title={name}
                                description={tagline}
                                price={formatted_price}
                                {rating}
                            />
                        </div>
                    {/if}
                {/each}
            </div>
            <div class="hidden items-center gap-3 lg:flex">
                <button on:click={prev} disabled={activeIndex === 0}>
                    <ChevronLeftCircle
                        size={28}
                        class="{activeIndex === 0
                            ? 'stroke-card-5'
                            : 'stroke-card'}  cursor-pointer"
                    />
                </button>

                <button on:click={next} disabled={activeIndex >= products.length - inc}>
                    <ChevronRightCircle
                        size={28}
                        class="{activeIndex >= products.length - inc
                            ? 'stroke-card-5'
                            : 'stroke-card'} cursor-pointer"
                    />
                </button>
            </div>
            <!-- <div class="flex items-center gap-1">
            {#each Array.from({ length: Math.ceil(products.length / offset) }, (_, index) => index + 1) as item, i}
                <span
                    class:bg-card={tab / offset == i + 1}
                    class:bg-card-5={tab / offset !== i + 1}
                    on:click={() => handleNavigate(i + 1)}
                    class="p-1 rounded-full cursor-pointer"
                ></span>
            {/each}
        </div> -->
        </div>
    </section>
{/if}

<style lang="postcss">
    .scrollbar {
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    .scrollbar::-webkit-scrollbar {
        display: none;
    }
</style>
