<script lang="ts">
    import { ChevronLeftCircle, ChevronRightCircle } from 'lucide-svelte';
    import Blogsectioncard from './blogsectioncard.svelte';
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';

    let blogs = [
        {
            imagesrc: '/images/bimage1.svg',
            title: 'DEVLOG'
        },
        {
            imagesrc: '/images/bimage2.svg',
            title: 'MUSIC'
        },
        {
            imagesrc: '/images/bimage3.svg',
            title: 'ARTICLE'
        },
        {
            imagesrc: '/images/bimage4.svg',
            title: 'NEWS'
        },
        {
            imagesrc: '/images/bimage5.svg',
            title: 'TUTORIALS'
        },
        {
            imagesrc: '/images/bimage6.svg',
            title: 'REVIEWS'
        }
    ];
    let width: number = 0; // Initialize with a default value
    let inc: number;

    let activeIndex = 0;
    let scroll = false;
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
    const next = () => {
        scroll = true;
        let nextIndex = activeIndex + 1;
        if (blogs[nextIndex]) {
            activeIndex = nextIndex;
        }
    };
    const prev = () => {
        scroll = true;
        let prevIndex = activeIndex - 1;
        if (blogs[prevIndex]) {
            activeIndex = prevIndex;
        }
    };
</script>

<svelte:window bind:innerWidth={width} />

<div class="grid grid-cols-1 gap-8">
    <div class="justify-self-end gap-3">
        <button on:click={prev} disabled={activeIndex === 0}>
            <ChevronLeftCircle
                size={28}
                class="{activeIndex === 0 ? 'stroke-card-5' : 'stroke-card'} cursor-pointer"
            />
        </button>
        <button on:click={next} disabled={activeIndex === blogs.length - inc}>
            <ChevronRightCircle
                size={28}
                class="{activeIndex === blogs.length - inc
                    ? 'stroke-card-5'
                    : 'stroke-card'} cursor-pointer"
            />
        </button>
    </div>

    <div class="flex flex-nowrap w-full gap-9 overflow-x-auto slider">
        {#each blogs as { imagesrc, title }, i}
            <Blogsectioncard
                {imagesrc}
                {title}
                classes="flex-[100%] sm:flex-[46.5%] lg:flex-[31%] xl:flex-[22.5%] 2xl:flex-[23%]"
                id={i.toString()}
            />
        {/each}
    </div>
</div>

<style lang="postcss">
    .slider {
        scroll-snap-type: x mandatory;
        scrollbar-width: none;
        -ms-overflow-style: none;
    }

    .slider::-webkit-scrollbar {
        display: none;
    }
</style>
