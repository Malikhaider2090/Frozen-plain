<script lang="ts">
    import Icon from '../../../components/shared/icon.svelte';
    import { ArrowUpDown, Grip, List, X } from 'lucide-svelte';
    import { draw, fade, scale, slide } from 'svelte/transition';
    import { backInOut, quintOut } from 'svelte/easing';

    import ShopList from '../../../components/ui/shop-list.svelte';
    import { clickOutside } from '../../../action/clickoutside';
    import Homenavbar from '../../../components/sections/homenavbar.svelte';
    let list = false;
    let open = false;

    function toggleDisplay() {
        list = !list;
    }
    function toggleNav() {
        open = !open;
    }

    let width: number;
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
                                easing: backInOut,
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
                            <Homenavbar />
                        </div>
                    </div>
                {/if}

                <div class="max-xl:hidden block col-span-2">
                    <Homenavbar />
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
                        <div class="flex flex-row items-center gap-2 max-md:hidden">
                            <span class="text-md text-card font-inter">Sort By:</span>
                            <button
                                class="flex flex-row gap-2 md:gap-52 justify-between items-center p-1.5 px-3 border-2 border-section rounded-lg"
                            >
                                <p class="text-card/50 text-md font-light">Default</p>
                                <div>
                                    <img src="/icons/dropdown.svg" alt="" />
                                </div>
                            </button>
                        </div>
                        <ArrowUpDown class="hidden max-md:block stroke-card" />
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
</section>
