<script lang="ts">
    import type { ProductFilter } from '$lib/interfaces';
    import { Minus, Plus } from 'lucide-svelte';
    import { split } from 'postcss/lib/list';
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    export let content: ProductFilter[];
    export let format: ProductFilter[];
    export let style: ProductFilter[];
    export let selectedContent: string;
    export let selectedFormat: string;
    export let selectedStyle: string;

    const dispatch = createEventDispatcher();

    let filters = {
        content: false,
        style: false,
        format: false
    };

    const toggle = (name: 'content' | 'style' | 'format') => () => {
        filters[name] = !filters[name];
    };

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
                } else {
                    temp.splice(index, 1);
                    activeContent = temp.join('|');
                }
            }
        }

        if(_style) {
            if (activeStyle === '') {
                activeStyle = _style;
            } else {
                let temp = activeStyle.split('|');
                let index = temp.findIndex((t) => t === _style);
                if (index === -1) {
                    temp.push(_style);
                    activeStyle = temp.join('|');
                } else {
                    temp.splice(index, 1);
                    activeStyle = temp.join('|');
                }
            }
        }

        if(_format){
            if (activeFormat === '') {
                activeFormat = _format;
            } else {
                let temp = activeFormat.split('|');
                let index = temp.findIndex((t) => t === _format);
                if (index === -1) {
                    temp.push(_format);
                    activeFormat = temp.join('|');
                } else {
                    temp.splice(index, 1);
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

<div class="flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-2 bg-foreground border-2 border-section rounded-lg">
        <button
            class="grid grid-cols-5 place-items-center font-light font-inter text-sm text-card bg-primary-blue py-4 px-6 rounded-lg"
            on:click={toggle('content')}
        >
            <span class="col-span-4 whitespace-nowrap">FILTER BY CONTENT</span>
            {#if filters.content}
                <Minus />
            {:else}
                <Plus />
            {/if}
        </button>

        {#if filters.content}
            <div
                class="p-3 flex flex-col gap-3 w-full text-md font-light max-h-[28rem] overflow-y-auto scrollbar"
            >
                {#each content as { name, count }}
                    <button
                        on:click={() => setActiveFilter(name, undefined, undefined)}
                        class="flex flex-row justify-between items-center {activeContent
                            .split('|')
                            .includes(name)
                            ? 'bg-primary-navhover/20'
                            : 'bg-foreground'} hover:bg-primary-navhover/20 hover:border-card/5 border-2 p-2 border-section rounded-lg"
                    >
                        <span
                            class="p-1 text-card"
                            class:text-primary-blue={activeContent.split('|').includes(name)}
                            >{name}</span
                        >
                        <span
                            class="p-1 px-2.5 rounded-lg text-card bg-primary-blue text-tag font-light"
                            >{count}</span
                        >
                    </button>
                {/each}
            </div>
        {/if}
    </div>
    <div class="flex flex-col gap-2 bg-foreground border-2 border-section rounded-lg">
        <button
            class="grid grid-cols-5 place-items-center font-light font-inter text-sm text-card bg-primary-blue py-4 px-6 rounded-lg"
            on:click={toggle('style')}
        >
            <span class="col-span-4 whitespace-nowrap"> FILTER BY STYLE </span>
            {#if filters.style}
                <Minus />
            {:else}
                <Plus />
            {/if}
        </button>

        {#if filters.style}
            <div
                class="p-3 flex flex-col gap-3 w-full text-md font-light max-h-[28rem] overflow-y-auto scrollbar"
            >
                {#each style as { name, count }}
                    <button
                        on:click={() => setActiveFilter(undefined, name, undefined)}
                        class="flex flex-row justify-between items-center {activeStyle
                            .split('|')
                            .includes(name)
                            ? 'bg-primary-navhover/20'
                            : 'bg-foreground'} hover:bg-primary-navhover/20 hover:border-card/5 border-2 p-2 border-section rounded-lg"
                    >
                        <span
                            class="p-1 text-card"
                            class:text-primary-blue={activeStyle.split('|').includes(name)}
                            >{name}</span
                        >
                        <span
                            class="p-1 px-2.5 rounded-lg text-card bg-primary-blue text-tag font-light"
                            >{count}</span
                        >
                    </button>
                {/each}
            </div>
        {/if}
    </div>
    <div class="flex flex-col gap-2 bg-foreground border-2 border-section rounded-lg">
        <button
            class="grid grid-cols-5 place-items-center font-light font-inter text-sm text-card bg-primary-blue py-4 px-6 rounded-lg"
            on:click={toggle('format')}
        >
            <span class="col-span-4 whitespace-nowrap"> FILTER BY FORMAT </span>

            {#if filters.format}
                <Minus />
            {:else}
                <Plus />
            {/if}
        </button>

        {#if filters.format}
            <div
                class="p-3 flex flex-col gap-3 w-full text-md font-light max-h-[28rem] overflow-y-auto scrollbar"
            >
                {#each format as { name, count }}
                    <button
                        on:click={() => setActiveFilter(undefined, undefined, name)}
                        class="flex flex-row justify-between items-center {activeFormat
                            .split('|')
                            .includes(name)
                            ? 'bg-primary-navhover/20'
                            : 'bg-foreground'} hover:bg-primary-navhover/20 hover:border-card/5 border-2 p-2 border-section rounded-lg"
                    >
                        <span
                            class="p-1 text-card"
                            class:text-primary-blue={activeFormat.split('|').includes(name)}
                            >{name}</span
                        >
                        <span
                            class="p-1 px-2.5 rounded-lg text-card bg-primary-blue text-tag font-light"
                            >{count}</span
                        >
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style>
    .scrollbar {
        scrollbar-width: thin;
    }

    .scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
</style>
