<script lang="ts">
    import { ChevronDown } from 'lucide-svelte';
    export let dropdown: boolean = false;
    export let capitalize: boolean = true;
    export let to: string = '/';
    export let expand: boolean = false;
    function drop() {
        expand = !expand;
    }
</script>

<!-- role="button" -->
<a
    href={to}
    class="relative group text-xxs font-inter font-bold flex items-center justify-center gap-1 text-card hover:text-primary-blue whitespace-nowrap"
    class:uppercase={capitalize}
    on:mouseenter
    on:mouseleave
>
    <slot />
    {#if dropdown}
        <ChevronDown size="15px" class="group-hover:rotate-180 transition-transform duration-300"/>
    {/if}
    <slot name="dropdown" />
</a>
