<script lang="ts">
    import BlogCard from '../ui/blogpagecard.svelte';

    export let blogs: any[];
</script>

<section class="w-full">
    <div class="container py-24">
        <h1 class="font-semibold text-h_2 max-sm:text-h_3 font-inter text-card mb-12">
            From our blog
        </h1>
        <div class="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {#each blogs as blog}
                <BlogCard
                    type={blog.metadata.category}
                    date={blog.metadata.date}
                    showYear={false}
                    imagesrc={blog.metadata.featured_image}
                    postedname={blog.metadata.author}
                    title={blog.metadata.title}
                    description={blog.metadata.description ||
                        "Hi, welcome to another devlog for Mirage v3, the next iteration of FrozenPlain's sampler plugin. The goal of version 3 is threefold: (1..."}
                    url={blog.url}
                    comments={blog.comments}
                />
            {/each}
        </div>
        <center class="mt-12">
            <a
                href="/blog"
                class="font-bold hover:bg-primary-blue text-sm text-card border-4 px-8 border-primary-blue p-3 rounded-lg"
            >
                SHOW ALL
            </a>
        </center>
    </div>
</section>
