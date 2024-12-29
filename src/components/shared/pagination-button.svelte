<script lang="ts">
    import { ChevronLeft, ChevronRight } from 'lucide-svelte';
    import { createEventDispatcher } from 'svelte';

    export let title: string;
    export let icon: string | undefined = undefined;
    export let classes: string | undefined = '';
    export let disabled: boolean = false;
    export let active: boolean = false;

    let dispatch = createEventDispatcher();

    let dispatchHandler = () => {
        dispatch('message', {
            data: title != '' ? title : icon
        });
    };
</script>

<button
    on:click={dispatchHandler}
    class:!text-card={active}
    class:!bg-primary-blue={active}
    class="rounded-md flex items-center justify-center p-2 px-3 sm:p-4 sm:px-5 text-md font-bold bg-background text-card border border-card w-10 h-10 sm:w-14 sm:h-14 disabled:bg-card-5 disabled:border-card-5 hover:bg-primary-blue transition-all duration-500 {classes}"
    {disabled}
>
    {#if icon === 'left'}
        <ChevronLeft class={disabled ? 'stroke-card-15' : 'stroke-card'} size={28} />
    {:else if icon === 'right'}
        <ChevronRight class={disabled ? 'stroke-card-15' : 'stroke-card'} />
    {/if}
    {title}
</button>
