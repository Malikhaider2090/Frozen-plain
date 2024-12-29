<script lang="ts">
    import BlogCard from '../../ui/blogpagecard.svelte';

    export let blogs: any[];
    
</script>

<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    {#each blogs as blog}
        
        <BlogCard
            type={blog.metadata.category}
            date={blog.metadata.date}
            imagesrc={blog.metadata.featured_image}
            postedname={blog.metadata.author}
            title={blog.metadata.title}
            description={blog.metadata.description || "Hi, welcome to another devlog for Mirage v3, the next iteration of FrozenPlain's sampler plugin. The goal of version 3 is threefold: (1..."}
            url={blog.url}
            comments={blog.comments}
        />
    {/each}
</div>
