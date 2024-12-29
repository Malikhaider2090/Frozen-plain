<script lang="ts">
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import type { ImageInterface, Product } from '$lib/interfaces';
    import { createEventDispatcher } from 'svelte';
    import Button from '../../shared/button.svelte';
    import Icon from '../../shared/icon.svelte';
    import Toast from '../../shared/toast.svelte';
    import viewport from '$lib/inView';

    export let product: Product | null;

    export let alreadyBought: boolean;

    const dispatch = createEventDispatcher();

    let images: ImageInterface[] | undefined;

    $: images = product?.images;
    let activeImage = 0;
    let scroll = false;

    const handleEnterViewport = (index: number) => {
        scroll = false;

        if (images && images[index]) {
            activeImage = index;
        }
    };

    const next = () => {
        scroll = true;
        let nextIndex = activeImage + 1;
        if (images && images[nextIndex]) {
            activeImage = nextIndex;
        }
    };

    const prev = () => {
        scroll = true;

        let prevIndex = activeImage - 1;
        if (images && images[prevIndex]) {
            activeImage = prevIndex;
        }
    };

    const scrollActiveElement = (index: number) => {
        if (browser) {
            const element = document.getElementById(`${index}`);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                });
            }
        }
    };

    $: if (activeImage >= 0 && scroll === true) {
        scrollActiveElement(activeImage);
    }

    // const handleLeft = () => {
    //     if (browser) {
    //         activeImage = activeImage - 1;
    //         const elem = document.getElementById(activeImage.toString());
    //         elem?.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'nearest',
    //             inline: 'start'
    //         });
    //     }
    // };

    // const handleRight = () => {
    //     if (browser) {
    //         activeImage = activeImage + 1;
    //         const elem = document.getElementById(activeImage.toString());
    //         elem?.scrollIntoView({
    //             behavior: 'smooth',
    //             block: 'nearest',
    //             inline: 'start'
    //         });
    //     }
    // };

    const handleAddToCart = () => {
        dispatch('addToCart');
    };

    const handleBuyNow = () => {
        dispatch('buyNow');
    };

    const setActiveFilter = (_content?: string, _style?: string, _format?: string) => {
        const urlParams = new URLSearchParams({
            content: _content || '',
            style: _style || '',
            format: _format || ''
        });

        goto(`/shop?${urlParams.toString()}`);
    };
</script>

<section class="w-full bg-cover bg-no-repeat max-sm:bg-left bg-top bg-product-header">
    <div class="container py-20 flex items-center justify-between relative">
        <Toast left="right-8" top="top-20" />

        <div
            class="grid grid-cols-1 xl:grid-cols-2 place-items-center items-center gap-2 md:gap-[131px] md:px-4"
        >
            <div class="grid grid-cols-1 gap-2">
                <div class="flex items-start gap-2">
                    <img
                        class="w-10 aspect-square rounded-full object-cover object-center mt-0.5"
                        src={product?.icon.url}
                        alt="{product?.name} icon"
                    />

                    <h1 class="font-inter font-semibold text-h_3 text-primary-blue">
                        {product?.name}
                    </h1>
                </div>
                <div class="grid grid-cols-1 gap-2 font-inter">
                    <span class=" font-semibold text-card text-h_6">{product?.tagline}</span>
                    <span class="font-normal text-card text-xs"
                        >Designed unapologetically for one purpose, Lost Reveries provides you with
                        customisable, playable, ambient-drone synthesis created by an expert of the
                        genre, <a class="text-primary-blue" href="">Hilyard</a>.</span
                    >
                    <span class="font-normal text-card text-xs"
                        >It’s a sample-based VST/AU synthesiser plugin containing 32 ambient
                        ‘oscillators’ that can be combined in up to 3 layers: with controls such as
                        ADSR envelopes, filters, LFOs and more. Furthermore, it features a rack of
                        effects including a rich reverb algorithm, delay and a phaser. Lost Reveries
                        also comes with 80 production-ready presets that can be selected from an
                        in-built preset browser.</span
                    >
                    <span class="font-normal text-card text-xs"
                        >Lost Reveries lives inside FrozenPlain’s sampler engine, called Mirage –
                        which is included for free in the no-hassle installer.</span
                    >
                </div>
                <div class="grid grid-cols-1 gap-1">
                    {#if product?.reviews && product.reviews.length > 0}
                        <div class="flex flex-row gap-3">
                            <div class="flex flex-row gap-1 my-2">
                                {#each [...Array(product?.rating).keys()] as _}
                                    <img class="w-4" src="/icons/star.svg" alt="" />
                                {/each}
                                {#each [...Array(5 - product?.rating).keys()] as _}
                                    <img class="w-4" src="/icons/star-empty.svg" alt="" />
                                {/each}
                            </div>
                            <span class="font-semibold text-card text-h_6"
                                >({product?.reviews.length} reviews)</span
                            >
                        </div>
                    {/if}
                    <div
                        class="flex flex-row gap-4 items-center justify-start font-futura text-card"
                    >
                        <span class="font-normal text-h6">{product?.formatted_price}</span>
                        {#if product?.discount}
                            <span class="font-normal text-shopcard">
                                <del>{product.formatted_price}</del></span
                            >
                            <button class="px-2 py-1 bg-primary-red rounded-lg"
                                >-{product?.discount || 0}%</button
                            >
                        {/if}
                    </div>
                </div>
                <div class="flex flex-col pt-2 gap-2">
                    <div class="flex flex-row gap-3 font-inter">
                        <span class="font-semibold text-card text-h_6">Style:</span>
                        <div class="flex flex-wrap">
                            {#if product?.style}
                                {#each product.style.split('|') as style, i}
                                    <button
                                        class="text-primary-blue text-lg font-light flex"
                                        on:click={() =>
                                            setActiveFilter(undefined, style, undefined)}
                                    >
                                        {style}
                                        <span
                                            class:hidden={i + 1 ===
                                                product?.style.split('|').length}>,&nbsp</span
                                        >
                                    </button>
                                {/each}
                            {/if}
                        </div>
                    </div>
                    <div class="flex flex-row gap-3 font-inter">
                        <span class="font-semibold text-card text-h_6">Content:</span>
                        <div class="flex flex-wrap">
                            {#if product?.content}
                                {#each product?.content.split('|') as content, i}
                                    <button
                                        class="text-primary-blue text-lg font-light flex"
                                        on:click={() =>
                                            setActiveFilter(content, undefined, undefined)}
                                    >
                                        {content}
                                        <span
                                            class:hidden={i + 1 ===
                                                product?.content.split('|').length}>,&nbsp</span
                                        >
                                    </button>
                                {/each}
                            {/if}
                        </div>
                    </div>
                    <div class="flex flex-row gap-3 font-inter">
                        <span class="font-semibold text-card text-h_6">Format:</span>
                        <div class="flex flex-wrap">
                            {#if product?.format}
                                {#each product?.format.split('|') as format, i}
                                    <button
                                        class="text-primary-blue text-lg font-light flex"
                                        on:click={() =>
                                            setActiveFilter(undefined, undefined, format)}
                                    >
                                        {format}
                                        <span
                                            class:hidden={i + 1 ===
                                                product?.format.split('|').length}>,&nbsp</span
                                        >
                                    </button>
                                {/each}
                            {/if}
                        </div>
                    </div>
                    <div class="flex gap-4">
                        {#if alreadyBought}
                            <Button
                                icon="Basket"
                                title="GO TO DOWNLOADS"
                                width={22}
                                height={18}
                                on:click={() => goto(`/my-account/downloads`)}
                            />
                        {:else}
                            <Button
                                icon="Basket"
                                title="BUY NOW"
                                width={22}
                                height={18}
                                on:click={handleBuyNow}
                            />
                            <Button
                                on:click={handleAddToCart}
                                icon="Cart"
                                title="ADD TO CART"
                                classes="!bg-primary-orange !border-primary-orange hover:!text-primary-orange hover:!bg-foreground"
                                color="primary-orange"
                            />
                        {/if}
                    </div>
                </div>
            </div>
            <div class="group w-full relative">
                <div
                    class="overflow-x-auto flex w-full scroll-smooth snap-x snap-mandatory scrollbar"
                >
                    {#if product?.images}
                        {#each product.images as image, index}
                            <img
                                class="w-full shrink-0 snap-center"
                                src={image.url}
                                alt={image.file}
                                id={index.toString()}
                                use:viewport
                                on:enter={() => handleEnterViewport(index)}
                            />
                        {/each}
                    {/if}
                </div>
                {#if images}
                    <button
                        on:click={prev}
                        disabled={activeImage === 0}
                        class="absolute left-1 top-1/2 -translate-y-1/2 p-2 bg-card-15 border border-card text-card rounded-full"
                    >
                        <Icon
                            name="CaretLeft"
                            class={activeImage === 0 ? 'fill-card/50' : 'fill-card'}
                            width="16"
                            height="16"
                        />
                    </button>
                    <button
                        on:click={next}
                        disabled={activeImage === images.length - 1}
                        class="absolute right-1 top-1/2 -translate-y-1/2 p-2 bg-card-15 border border-card text-card rounded-full"
                    >
                        <Icon
                            name="CaretRight"
                            class={activeImage === images.length - 1 ? 'fill-card/50' : 'fill-card'}
                            width="16"
                            height="16"
                        />
                    </button>
                {/if}
            </div>
        </div>
    </div>
</section>

<style lang="postcss">
    .scrollbar {
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .scrollbar::-webkit-scrollbar {
        display: none;
    }
</style>
