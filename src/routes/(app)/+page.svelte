<script lang="ts">
    import About from '../../components/sections/about.svelte';
    import Banner from '../../components/sections/banner.svelte';
    import HeroHeader from '../../components/sections/hero-header.svelte';
    import MirageLibrary from '../../components/sections/mirage-library.svelte';
    import Products from '../../components/sections/products.svelte';
    import Obelisk from '../../components/sections/obelisk.svelte';
    import Blog from '../../components/sections/blog.svelte'
    import Join from '../../components/sections/joinwithmail.svelte';

    import { allProducts } from "$lib/store";

    export let data;
    
</script>

<div class="bg-background">
    <HeroHeader />

    <Banner />

    <About />

    <Products products={$allProducts && $allProducts.slice(0,3)}/>

    <MirageLibrary />

    <Obelisk />

    <Blog blogs={data.blogs.slice(0, 3)}/>

    <Join />
</div>
