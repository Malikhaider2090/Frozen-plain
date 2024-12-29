<script lang="ts">
    import { createEventDispatcher } from 'svelte';

    export let loading: boolean;

    const dispatch = createEventDispatcher();

    const handleReview = (event: { currentTarget: EventTarget & HTMLFormElement }) => {
        const data = new FormData(event.currentTarget);

        dispatch('addReview', {
            review: data.get('review'),
            rating: data.get('rating')
        });

        event.currentTarget.reset();
    };
</script>

<section class="grid grid-cols-1 pt-12 container">
    <h1 class="font-futura font-normal text-h2 text-card">Write a review</h1>

    <form class="my-6" action="" on:submit|preventDefault={handleReview}>
        <div class="mt-6 flex flex-col gap-2">
            <label class="text-card font-semibold text-h_6 font-inter" for="review"
                >Your Review:</label
            >
            <textarea
                class="bg-foreground border-2 border-section rounded-md w-full p-2 resize-none text-card/80"
                name="review"
                id="review"
                cols="30"
                rows="10"
            ></textarea>
        </div>

        <div class="flex items-center gap-4 py-8">
            <p class="text-card font-semibold text-h_6 font-inter">Rating:</p>
            <div class="star-rating">
                <p class="text-h_6 font-inter font-semibold text-card/50">Good</p>
                <input type="radio" id="star5" name="rating" value="5" required />
                <label for="star5"></label>
                <input type="radio" id="star4" name="rating" value="4" />
                <label for="star4"></label>
                <input type="radio" id="star3" name="rating" value="3" />
                <label for="star3"></label>
                <input type="radio" id="star2" name="rating" value="2" />
                <label for="star2"></label>
                <input type="radio" id="star1" name="rating" value="1" />
                <label for="star1"></label>
                <p class="text-h_6 font-inter font-semibold text-card/50">Bad</p>
            </div>
        </div>
        <div class="flex items-center gap-5">
            <button
                type="submit"
                disabled={loading}
                class="font-futura md:justify-self-start justify-self-center font-normal text-card text-btn hover:bg-primary-blue border-2 px-8 border-primary-blue py-4 rounded-lg"
                >Send</button
            >
            <button
                type="reset"
                class="font-futura md:justify-self-start justify-self-center font-normal text-card text-btn hover:bg-primary-blue border-2 px-8 border-primary-blue py-4 rounded-lg"
                >Cancel</button
            >
        </div>
    </form>
</section>

<style>
    .star-rating {
        display: flex;
        flex-direction: row-reverse; /* Highlight from left to right */
        gap: 8px;
        align-items: center;
        font-size: 0; /* Remove white space between inline-block elements */
        width: max-content;
    }

    .star-rating input {
        display: none;
    }

    .star-rating label {
        /* font-size: 30px; */
        cursor: pointer;
        /* width: 30px; */
        /* height: 30px; */
        text-align: center;
        overflow: hidden;
    }

    .star-rating label:before {
        content: url('/icons/star-empty.svg'); /* Unicode character for a star */
        display: block;
    }

    .star-rating input:checked ~ label:before {
        content: url('/icons/star.svg');
        /* color: gold; Highlight the star when checked */
    }
</style>
