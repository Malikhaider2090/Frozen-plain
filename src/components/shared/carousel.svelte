<script lang="ts">
    import { browser } from '$app/environment';
    import viewport from '$lib/inView';
    import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-svelte';

    let activeIndex = 0;
    let scroll = false;

    type Item = {
        path: string;
        title: string;
        description?: string;
    };

    export let uniqueId: string;

    export let items: Item[] = [];

    export let size: string = 'h-64';
    export let gap: string = 'gap-1';

    export let rightAligned: boolean = true;

    const scrollActiveElement = (index: number) => {
        if (browser) {
            const element = document.getElementById(`${uniqueId}-${index}`);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'start'
                });
            }
        }
    };

    $: {
        if (activeIndex >= 0 && scroll === true) {
            scrollActiveElement(activeIndex);
        }
    }

    const handleEnterViewport = (index: number) => {
        scroll = false
        
        if(items[index]) {
            activeIndex = index
        }
    }

    const next = () => {
        scroll = true
        let nextIndex = activeIndex + 1;
        if (items[nextIndex]) { 
            activeIndex = nextIndex;
        }
    };
    const prev = () => {
        scroll = true
        let prevIndex = activeIndex - 1;
        if (items[prevIndex]) {
            activeIndex = prevIndex;
        }
    };
</script>

<div class="flex flex-col gap-4 w-full overflow-hidden">
    <div class="flex self-end items-center gap-3 mr-8">
        <button on:click={prev}>
            <ChevronLeftCircle
                size={28}
                class="{activeIndex === 0 ? 'stroke-card-5' : 'stroke-card'}  cursor-pointer"
            />
        </button>

        <button on:click={next}>
            <ChevronRightCircle
                size={28}
                class="{activeIndex === items.length - 1
                    ? 'stroke-card-5'
                    : 'stroke-card'} cursor-pointer"
            />
        </button>
    </div>
    <div class="flex overflow-x-auto">
        {#if rightAligned}
            <div class="w-72 2xl:min-w-[300px] max-lg:hidden"></div>
        {/if}
        <div id="carousel" class="flex {gap} overflow-x-scroll box-content">
            {#each items as e, i}
                <div id="{uniqueId}-{i}" class="min-w-[320px] flex flex-col snap-start items-start gap-2" use:viewport on:enter={() => handleEnterViewport(i)}>
                    <img
                        class:opacity-50={i !== activeIndex}
                        class="{size} shadow-lg transition duration-500 ease-in-out"
                        src="/images/{e.path}"
                        alt="img-{i}"
                    />
                    <p class="text-card font-inter text-xxs">{e.title}</p>
                    {#if e.description}
                        <p class="text-primary-blue">
                            {e.description}
                        </p>
                    {/if}
                </div>
            {/each}
        </div>
    </div>

    <div class="flex items-center self-center gap-1">
        {#each items as e, i}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                on:click={() => {
                    activeIndex = i
                    scroll = true
                }}
                class:bg-card={activeIndex === i}
                class:bg-card-5={activeIndex !== i}
                class="p-1 rounded-full cursor-pointer"
            ></div>
        {/each}
    </div>
</div>

<style>
    #carousel {
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }
    
    #carousel::-webkit-scrollbar {
        display: none;
        height: 0;
        width: 0;
    }
</style>
