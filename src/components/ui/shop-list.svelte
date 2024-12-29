<script lang="ts">
    import type { Product } from '$lib/interfaces';
    import { createEventDispatcher } from 'svelte';

    export let products: Product[];

    export let selectedContent: string;
    export let selectedFormat: string;
    export let selectedStyle: string;

    const dispatch = createEventDispatcher();

    const setActiveFilter = (_content?: string, _style?: string, _format?: string) => {
        if (_content) {
            if (activeContent === '') {
                activeContent = _content;
            } else {
                let temp = activeContent.split('|');
                let index = temp.findIndex((t) => t === _content);
                if (index === -1) {
                    temp.push(_content);
                    activeContent = temp.join('|');
                }
            }
        }

        if (_style) {
            if (activeStyle === '') {
                activeStyle = _style;
            } else {
                let temp = activeStyle.split('|');
                let index = temp.findIndex((t) => t === _style);
                if (index === -1) {
                    temp.push(_style);
                    activeStyle = temp.join('|');
                }
            }
        }

        if (_format) {
            if (activeFormat === '') {
                activeFormat = _format;
            } else {
                let temp = activeFormat.split('|');
                let index = temp.findIndex((t) => t === _format);
                if (index === -1) {
                    temp.push(_format);
                    activeFormat = temp.join('|');
                }
            }
        }

        dispatch('filterChange', {
            content: activeContent,
            format: activeFormat,
            style: activeStyle
        });
    };

    $: activeContent = selectedContent;
    $: activeFormat = selectedFormat;
    $: activeStyle = selectedStyle;
</script>

<div class="grid grid-cols-1 gap-6">
    {#each products as product}
        <div
            class="grid grid-cols-1 lg:grid-cols-[auto_45%] place-items-center items-center gap-7 bg-foreground border-2 rounded-lg border-section px-4 py-6"
        >
            <div class="grid grid-cols-1 gap-2">
                <a
                    class="font-inter font-semibold text-h_3 text-primary-blue"
                    href="/product/{product.sku}">{product.name}</a
                >
                <div class="grid grid-cols-1 gap-2 font-inter">
                    <span class=" font-semibold text-card text-h_6 text-left"
                        >{product.tagline}</span
                    >
                    <span class="font-normal text-card text-xs text-justify"
                        >Designed unapologetically for one purpose, Lost Reveries provides you with
                        customisable, playable, ambient-drone synthesis created by an expert of the
                        genre, <a class="text-primary-blue" href="">Hilyard</a>.</span
                    >
                    <span class="font-normal text-card text-xs text-justify"
                        >It’s a sample-based VST/AU synthesiser plugin containing 32 ambient
                        ‘oscillators’ that can be combined in up to 3 layers: with controls such as
                        ADSR envelopes, filters, LFOs and more. Furthermore, it features a rack of
                        effects including a rich reverb algorithm, delay and a phaser. Lost Reveries
                        also comes with 80 production-ready presets that can be selected from an
                        in-built preset browser.</span
                    >
                    <span class="font-normal text-card text-xs text-justify"
                        >Lost Reveries lives inside FrozenPlain’s sampler engine, called Mirage –
                        which is included for free in the no-hassle installer.</span
                    >
                </div>
                <div class="grid grid-cols-1 gap-1">
                    <div class="flex flex-row gap-3">
                        {#if product.rating > 0}
                            <div class="flex flex-row gap-1 my-2">
                                {#each [...Array(product.rating).keys()] as _}
                                    <img class="w-4" src="/icons/star.svg" alt="" />
                                {/each}
                                {#each [...Array(5 - product.rating).keys()] as _}
                                    <img class="w-4" src="/icons/star-empty.svg" alt="" />
                                {/each}
                            </div>
                            <span class="font-semibold text-card text-h_6"
                                >({product.reviews.length} reviews)</span
                            >
                        {/if}
                    </div>
                    <div
                        class="flex flex-row gap-4 items-center justify-start font-futura text-card"
                    >
                        <span class="font-normal text-h6"
                            >{product.formatted_price}</span
                        >
                        {#if product.discount}
                            <span class="font-normal text-shopcard">
                                <del>{product.formatted_price}</del></span
                            >
                            <button class="px-2 py-1 bg-primary-red rounded-lg"
                                >-{product.discount || 0}%</button
                            >
                        {/if}
                    </div>
                </div>
                <div class="flex flex-col pt-2 gap-2">
                    <div class="flex flex-row gap-3 font-inter">
                        <span class="font-semibold text-card text-h_6">Style:</span>
                        <div class="flex flex-wrap">
                            {#each product.style.split('|') as style, i}
                                <button
                                    class="text-primary-blue text-lg font-light flex"
                                    on:click={() => setActiveFilter(undefined, style, undefined)}
                                >
                                    {style}
                                    <span class:hidden={i + 1 === product.style.split('|').length}
                                        >,&nbsp</span
                                    >
                                </button>
                            {/each}
                        </div>
                    </div>
                    <div class="flex flex-row gap-3 font-inter">
                        <span class="font-semibold text-card text-h_6">Content:</span>
                        <div class="flex flex-wrap">
                            {#each product.content.split('|') as content, i}
                                <button
                                    class="text-primary-blue text-lg font-light flex"
                                    on:click={() => setActiveFilter(content, undefined, undefined)}
                                >
                                    {content}
                                    <span class:hidden={i + 1 === product.content.split('|').length}
                                        >,&nbsp</span
                                    >
                                </button>
                            {/each}
                        </div>
                    </div>
                    <div class="flex flex-row gap-3 font-inter">
                        <span class="font-semibold text-card text-h_6">Format:</span>
                        <div class="flex flex-wrap">
                            {#each product.format.split('|') as format, i}
                                <button
                                    class="text-primary-blue text-lg font-light flex"
                                    on:click={() => setActiveFilter(undefined, undefined, format)}
                                >
                                    {format}
                                    <span class:hidden={i + 1 === product.format.split('|').length}
                                        >,&nbsp</span
                                    >
                                </button>
                            {/each}
                        </div>
                    </div>
                    <!-- <div>
                        <Button icon="Cart" title="ADD TO CART" />
                    </div> -->
                </div>
            </div>
            <img class="w-full" src="{product.thumbnail.url}" alt="{product.name} thumbnail" />
        </div>
    {/each}
</div>
