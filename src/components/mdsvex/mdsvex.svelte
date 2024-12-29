<!-- MDsveX Layout Component -->

<script context="module">
    import '../../mdsvex.css';
    import {
        a,
        blockquote,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        hr,
        img,
        li,
        ol,
        p,
        pre,
        table,
        td,
        th,
        tr,
        ul
    } from '../mdsvex';
    

    export {
        a,
        blockquote,
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        hr,
        img,
        li,
        ol,
        p,
        pre,
        table,
        td,
        th,
        tr,
        ul
    };
</script>

<script lang="ts">
    // export let title: string = '';
    // export let date: string = '';
    // export let author: string = '';
    // export let category: string = '';
    // export let featured_image: string = '';

    
</script>

<!-- <slot {title} {date} {author} {category} {featured_image} /> -->
<slot />