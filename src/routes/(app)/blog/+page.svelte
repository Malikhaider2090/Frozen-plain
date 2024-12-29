<script lang="ts">
    import { slide } from 'svelte/transition';
    import BlogNav from '../../../components/sections/blog/blog-nav.svelte';
    import BlogpagecardGroup from '../../../components/sections/blog/blogpagecard-group.svelte';
    import Pagination from '../../../components/shared/pagination.svelte';
    import { backInOut } from 'svelte/easing';
    import { clickOutside } from '../../../action/clickoutside';
    import { X } from 'lucide-svelte';
    import Icon from '../../../components/shared/icon.svelte';
    import type { PageData } from './$types';

    let open = false;
    function toggleNav() {
        open = !open;
    }

    let filter: string = '';
    let filteredBlogs: any[];

    export let data: PageData;

    $: filterBlogs(filter);

    const filterBlogs = (filter: string) => {
        filteredBlogs = data.blogs.filter((blog: { metadata: { category: string } }) => {
            if (filter !== '') {
                return blog.metadata.category === filter;
            } else {
                return blog;
            }
        });
    };

    const handleFilter = (event: any) => {
        filter = event.detail.filter;
    };
</script>

<section class="w-full bg-foreground">
    <h1 class="container font-semibold text-h_2 max-sm:text-h_3 font-inter text-card py-5 md:py-10">
        Blog
    </h1>
    <div class="w-full bg-background">
        <div class="container py-12">
            <div class="grid grid-cols-9 gap-6">
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
                            <BlogNav categories={data.categories} on:filterChange={handleFilter} />
                        </div>
                    </div>
                {/if}

                <div class="max-xl:hidden block col-span-2">
                    <BlogNav categories={data.categories} on:filterChange={handleFilter} />
                </div>
                <div class="col-span-9 xl:col-span-7 flex flex-col gap-4">
                    <div
                        class="hidden max-xl:flex flex-row items-center gap-4 w-full bg-foreground rounded-lg border-2 border-section px-3 py-1.5"
                    >
                        <button
                            on:click={toggleNav}
                            class="hidden gap-2 max-xl:flex items-center text-lg text-card font-normal"
                        >
                            <Icon name="List" class="mr-2" />
                            Show Sidebar
                        </button>
                    </div>

                    <BlogpagecardGroup blogs={filteredBlogs} />
                    <br />
                    <Pagination />
                </div>
            </div>
        </div>
    </div>
</section>
