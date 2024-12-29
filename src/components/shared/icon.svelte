<script lang="ts">
    export let name: string;
    export let width = '24';
    export let height = '24';
</script>

<svg class={$$props.class} {width} {height}>
    <use href={`/icons/icons.svg#${name}`} />
</svg>
