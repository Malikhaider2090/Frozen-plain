<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import type { ReviewInterface } from '$lib/interfaces';
    import { likeLoading, user } from '$lib/store';
    import { createEventDispatcher } from 'svelte';
    import Icon from '../../shared/icon.svelte';

    export let review: ReviewInterface;
    export let user_id: string | undefined;

    const dispatch = createEventDispatcher();

    const handleUpdateLikes = (review_id: number) => {
        if ($user.authenticated) {
            likeLoading.update((prev) => true);
            dispatch('updateLikes', {
                review_id
            });
        } else {
            let urlParams = new URLSearchParams({
                redirect: $page.url.pathname
            });
            goto(`/sign-in?${urlParams.toString()}`);
        }
    };

    $: thumbColor = review.likes > 0 ? 'fill-blue-light' : 'fill-card';
</script>

<div class="p-8 mt-12 bg-foreground border-2 text-card border-card/5 rounded-lg">
    <div class="flex flex-row items-start gap-4 sm:gap-8">
        <!-- <img class="h-20 aspect-square rounded-full" src="/images/commentimage.svg" alt="" /> -->
        <div
            class="h-12 sm:h-20 p-1 aspect-square flex justify-center items-center rounded-full bg-foreground border-2 border-card-5"
        >
            <p class="uppercase text-card text-h5 sm:text-h3 font-bold">
                {review.accounts.email.at(0)}
            </p>
        </div>
        <div class="grid grid-cols-1 place-items-stretch gap-4 w-full">
            <p class="font-inter font-semibold text-h_6 text-card">
                {review.accounts.email.split('@')[0]}
            </p>
            <p class="font-light font-inter text-md text-card/50">
                {new Date(review.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                    day: 'numeric'
                })}
            </p>
            <div class="flex items-center gap-2">
                {#each [...Array(review.rating).keys()] as _}
                    <img src="/icons/star.svg" alt="" />
                {/each}
                {#each [...Array(5 - review.rating).keys()] as _}
                    <img class="w-4" src="/icons/star-empty.svg" alt="" />
                {/each}
            </div>
            <p class="font-light font-inter text-md text-card place-self-start">
                {review.comment}
            </p>
            <div class="flex gap-2 flex-row justify-between">
                <div class="flex flex-row gap-2 items-start justify-center">
                    <button on:click={() => handleUpdateLikes(review.id)} disabled={$likeLoading}>
                        <Icon name="Thumb" width="21" height="22" class={thumbColor} />
                    </button>
                    {review.likes}
                </div>
            </div>
        </div>
    </div>
</div>
