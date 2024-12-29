<script lang="ts">
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { quintOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';

    import { ArrowUpDown, ChevronDown, Grip, List, X } from 'lucide-svelte';
    import Cards from '../../../components/sections/shop/cards.svelte';
    import ShopNav from '../../../components/sections/shop/shop-nav.svelte';
    import Icon from '../../../components/shared/icon.svelte';

    import type { Product } from '$lib/interfaces';
    import { allProducts, content, format, style } from '$lib/store';
    import { clickOutside } from '../../../action/clickoutside';
    import ShopList from '../../../components/ui/shop-list.svelte';

    let selectedContent: string = '';
    let selectedFormat: string = '';
    let selectedStyle: string = '';

    let filteredProducts: Product[];

    const sortProducts = (activeOption: any) => {
        if (filteredProducts) {
            filteredProducts = filteredProducts.sort((a: Product, b: Product) => {
                if (activeOption.title === 'Sort by popularity') {
                    return b.rating - a.rating;
                } else if (activeOption.title === 'Sort by price: low to high') {
                    return a.price - b.price;
                } else if (activeOption.title === 'Sort by price: high to low') {
                    return b.price - a.price;
                } else {
                    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                }
            });
        }
    };

    $: sortProducts(activeOption);

    const filterProducts = (
        selectedContent: string,
        selectedFormat: string,
        selectedStyle: string,
        allProducts: Product[] | null
    ) => {
        if ($allProducts) {
            filteredProducts = $allProducts.filter((product) => {
                const matchesContent =
                    selectedContent != ''
                        ? product.content
                              .split('|')
                              .some((s) => selectedContent.split('|').includes(s))
                        : true;
                const matchesFormat =
                    selectedFormat != ''
                        ? product.format
                              .split('|')
                              .some((s) => selectedFormat.split('|').includes(s))
                        : true;
                const matchesStyle =
                    selectedStyle != ''
                        ? product.style.split('|').some((s) => selectedStyle.split('|').includes(s))
                        : true;
                return matchesContent && matchesFormat && matchesStyle;
            });
        }
    };

    $: filterProducts(selectedContent, selectedFormat, selectedStyle, $allProducts);

    const handleFilter = (event: any) => {
        selectedContent = event.detail.content;
        selectedFormat = event.detail.format;
        selectedStyle = event.detail.style;
    };

    let list = false;
    let open = false;

    function toggleDisplay() {
        pageNumber = 1;
        list = !list;
    }
    function toggleNav() {
        open = !open;
    }

    let sort = false;
    let hover = false;

    const sortOptions = [
        {
            active: false,
            title: 'Sort by popularity'
        },
        {
            active: true,
            title: 'Sort by latest'
        },
        {
            active: false,
            title: 'Sort by price: low to high'
        },
        {
            active: false,
            title: 'Sort by price: high to low'
        }
    ];

    $: activeOption = sortOptions.filter((opt) => opt.active)[0];

    let pageSize = 12;
    $: pageNumber = 1;

    let width: number;

    $: if ($allProducts) {
        filterProducts(selectedContent, selectedFormat, selectedStyle, $allProducts);
        activeOption = sortOptions.filter((opt) => opt.active)[0];
    }

    onMount(() => {
        const contentParam = $page.url.searchParams.get('content');
        const styleParam = $page.url.searchParams.get('style');
        const formatParam = $page.url.searchParams.get('format');

        if (contentParam) selectedContent = contentParam;
        if (styleParam) selectedStyle = styleParam;
        if (formatParam) selectedFormat = formatParam;

        activeOption = sortOptions[1];
    });
</script>

<svelte:window bind:innerWidth={width} />

<section class="w-full bg-foreground">
    <h1 class="container font-semibold text-h_2 max-sm:text-h_3 font-inter text-card py-5 md:py-10">
        Shop
    </h1>
    <div class="w-full bg-background">
        <div class="container pb-20">
            <div class="grid grid-cols-8 py-5 gap-6">
                {#if open}
                    <div
                        class="fixed z-50 top-0 bottom-0 left-0 right-0 bg-foreground/50 overflow-y-auto"
                    >
                        <div
                            transition:slide={{
                                delay: 250,
                                duration: 300,
                                axis: 'x'
                            }}
                            use:clickOutside
                            on:clickoutside={toggleNav}
                            class="bg-foreground px-3 h-full overflow-y-auto max-sm:w-[85%] max-lg:w-2/4 w-1/4 transition duration-300 ease-in-out"
                        >
                            <button
                                on:click={toggleNav}
                                class=" flex flex-row justify-center items-center gap-4 text-card text-lg font-semibold pt-6 py-3"
                                ><X />CLOSE SIDEBAR</button
                            >
                            <hr class="1.5p-1.5-px h-px items-center mx-4 border-0 bg-section" />
                            <ShopNav
                                content={$content}
                                format={$format}
                                style={$style}
                                {selectedContent}
                                {selectedFormat}
                                {selectedStyle}
                                on:filterChange={handleFilter}
                            />
                        </div>
                    </div>
                {/if}

                <div class="max-xl:hidden block col-span-2">
                    <ShopNav
                        content={$content}
                        format={$format}
                        style={$style}
                        {selectedContent}
                        {selectedFormat}
                        {selectedStyle}
                        on:filterChange={handleFilter}
                    />
                </div>

                <div class="col-span-6 max-xl:col-span-8 flex flex-col gap-4 w-full md:w-full">
                    <div
                        class="flex flex-row justify-between items-center px-3 py-1.5 bg-foreground border-2 border-section rounded-lg"
                    >
                        <div class="flex flex-row items-center gap-4">
                            <button
                                on:click={toggleNav}
                                class="hidden gap-2 max-xl:flex items-center text-lg text-card font-normal"
                            >
                                <Icon name="List" class="mr-2" />
                                Show Sidebar
                            </button>
                            <button on:click={toggleDisplay}>
                                <Grip class="stroke-{list ? 'card' : 'primary-blue'}" />
                                <!-- <img class="max-md:hidden" src="/icons/sort1.svg" alt="" /> -->
                            </button>
                            <button on:click={toggleDisplay}>
                                <List class="stroke-{!list ? 'card' : 'primary-blue'}" />
                                <!-- <img class="max-md:hidden" src="/icons/sort2.svg" alt="" /> -->
                            </button>
                        </div>
                        <div class="flex flex-row items-center gap-2">
                            <span class="text-md text-card font-inter max-md:hidden">Sort By:</span>
                            <div
                                use:clickOutside
                                on:clickoutside={() => {
                                    sort = false;
                                    hover = false;
                                }}
                                class="relative flex items-center"
                            >
                                <button
                                    on:click={() => (sort = !sort)}
                                    class=" flex justify-between gap-2 w-64 min-w-full items-center p-1.5 px-3 border-2 border-section rounded-lg max-md:hidden"
                                >
                                    <p class="text-card/50 text-md font-light">
                                        {activeOption.title}
                                    </p>
                                    <div>
                                        <ChevronDown
                                            color="white"
                                            size="15px"
                                            class="{sort &&
                                                'rotate-180'} transition-transform duration-300"
                                        />
                                    </div>
                                </button>

                                <button on:click={() => (sort = !sort)} class="px-2">
                                    <ArrowUpDown class="hidden max-md:block stroke-card" />
                                </button>
                                {#if sort}
                                    <div
                                        class="absolute max-md:top-[40px] top-[52px] right-0 z-[51] text-card w-max"
                                    >
                                        <div
                                            transition:slide={{
                                                delay: 250,
                                                duration: 300,
                                                easing: quintOut,
                                                axis: 'y'
                                            }}
                                            class="p-6 grid grid-cols-1 z-50 gap-20 w-full h-fit border-2 border-card/5 rounded-lg bg-black"
                                        >
                                            <div class="grid grid-cols-1">
                                                {#each sortOptions as option}
                                                    <button
                                                        on:click={() => {
                                                            sortOptions.forEach((e, i) => {
                                                                if (e.title == option.title) {
                                                                    sortOptions[i].active = true;
                                                                } else
                                                                    sortOptions[i].active = false;
                                                            });
                                                            hover = false;
                                                            sort = false;
                                                        }}
                                                        on:mouseenter={() => (hover = true)}
                                                        class:bg-primary-blue={option.active &&
                                                            !hover}
                                                        class="flex items-center gap-2 text-card/80 hover:text-card hover:bg-primary-blue rounded-lg py-1 pl-2"
                                                    >
                                                        {option.title}
                                                    </button>
                                                {/each}
                                            </div>
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                    {#if !$allProducts}
                        <div
                            class="rounded-lg border-2 border-card-5 bg-foreground p-4 flex flex-col gap-2 max-sm:mx-2 sm:min-w-[35rem] w-full max-w-2xl mx-auto my-10"
                        >
                            <h5 class="text-center text-card text-h5">Loading...</h5>
                        </div>
                    {:else}
                        {#if filteredProducts.length > 0}
                            {#if list}
                                <ShopList
                                    products={filteredProducts.slice(
                                        0,
                                        pageNumber * (pageSize / 3)
                                    )}
                                    {selectedContent}
                                    {selectedFormat}
                                    {selectedStyle}
                                    on:filterChange={handleFilter}
                                />
                            {:else}
                                <Cards
                                    products={filteredProducts.slice(0, pageNumber * pageSize)}
                                />
                            {/if}
                        {:else}
                            <div
                                class="rounded-lg border-2 border-card-5 bg-foreground p-4 flex flex-col gap-2 max-sm:mx-2 sm:min-w-[35rem] w-full max-w-2xl mx-auto my-10"
                            >
                                <h5 class="text-card text-center text-h5">No Avaialble Products</h5>
                            </div>
                        {/if}

                        {#if filteredProducts.length > pageNumber * (list ? pageSize / 3 : pageSize)}
                            <div class="mt-4 md:mt-12 text-center">
                                <button
                                    on:click={() => pageNumber++}
                                    class="font-bold text-sm hover:bg-primary-blue text-card border-4 px-8 border-primary-blue p-3 rounded-lg"
                                >
                                    LOAD MORE PRODUCTS
                                </button>
                            </div>
                        {/if}
                    {/if}
                </div>
            </div>
        </div>
    </div>
</section>
