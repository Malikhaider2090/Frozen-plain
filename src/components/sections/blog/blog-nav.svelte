<script script lang="ts">
    import { Minus, Plus } from 'lucide-svelte';
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    let filters = {
        category: false
    };

    const toggle = (name: 'category') => () => {
        filters[name] = !filters[name];
    };

    export let categories: {};

    const toggleFilter = (filter: string) => {
        if(filter === activeFilter){
            activeFilter = ''
            dispatch('filterChange', {
                filter: ''
            })
            return
        }

        activeFilter = filter;
        dispatch('filterChange', {
            filter
        });
    };

    $: activeFilter = '';
</script>

<div class="flex flex-col gap-6 w-full">
    <div class="flex flex-col gap-2 bg-foreground border-2 border-section rounded-lg">
        <button
            class="grid grid-cols-5 place-items-center font-light font-inter text-sm text-card bg-primary-blue py-4 px-6 rounded-lg"
            on:click={toggle('category')}
        >
            <span class="col-span-4 uppercase">FILTER BY Category</span>
            {#if filters.category}
                <Minus />
            {:else}
                <Plus />
            {/if}
        </button>

        {#if filters.category}
            <div class="p-3 flex flex-col gap-3 w-full text-md font-light">
                {#each Object.entries(categories) as [key, value]}
                    <button
                        on:click={() => toggleFilter(key)}
                        class="flex flex-row justify-between items-center {key === activeFilter ? 'bg-primary-navhover/20' : 'bg-foreground'} hover:bg-primary-navhover/20 hover:border-card/5 border-2 p-2 border-section rounded-lg"
                    >
                        <span
                            class="p-1 text-card uppercase"
                            class:text-primary-blue={key === activeFilter}>{key}</span
                        >
                        <span
                            class="p-1 px-2.5 rounded-lg text-card bg-primary-blue text-tag font-light"
                            >{value}</span
                        >
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</div>
