<script lang="ts">
    import type { ReviewInterface } from '$lib/interfaces';
    import Review from './review.svelte';
    // import Comment from './comment.svelte';

    export let reviews: ReviewInterface[] | null;
    export let user_id: string | undefined;
</script>

<section class="pt-12 grid grid-cols-1 container">
    <h1 class="font-futura font-normal text-h2 text-card text-center">
        REVIEWS({reviews ? reviews.length : 0})
    </h1>
    <p class="text-card font-inter text-md mt-12 font-light">
        Only logged in customers who have purchased this product may leave a review.
    </p>
    {#if reviews}
        {#each reviews as review}
            <Review {review} on:updateLikes {user_id} />
        {/each}
    {/if}
</section>
