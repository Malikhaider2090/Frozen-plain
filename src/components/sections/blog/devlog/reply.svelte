<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import CommentSection from './commentSection.svelte';
    import { user } from '$lib/store';
    import type { CommentInterface } from '$lib/interfaces';

    export let comments: CommentInterface[] | null;
    export let user_id: string|undefined

    const dispatch = createEventDispatcher();
    const submit = () => {
        dispatch('formsubmit', {
            comment
        });
        comment = '';
    };

    let comment = '';
</script>

{#if comments && comments.length > 0}
    <CommentSection {comments} on:updateLikes on:addReply {user_id} />
{/if}
<section class="grid grid-cols-1 my-12">
    <h1 class="font-futura font-normal text-h2 text-card">LEAVE A REPLY</h1>
    {#if $user.authenticated}
        <p class="mt-4 font-light text-md font-inter text-card">
            Your email address will not be published.
        </p>
        <form class="my-6" action="">
            <div class="mt-6 flex flex-col gap-2">
                <label class="text-card font-semibold text-h_6 font-inter" for="comment"
                    >Comment:</label
                >
                <textarea
                    class="bg-foreground border-2 border-section rounded-md w-full p-2 resize-none text-card/80"
                    name="comment"
                    bind:value={comment}
                    id="comment"
                    cols="30"
                    rows="10"
                ></textarea>
            </div>
        </form>
        <button
            on:click={submit}
            class="font-futura md:justify-self-start justify-self-center font-normal text-card text-btn hover:bg-primary-blue border-2 px-8 border-primary-blue py-4 rounded-lg"
            >Submit</button
        >
    {:else}
        <p class="mt-4 font-light text-md font-inter text-card">
            You must be <a href="/sign-in" class="text-primary-blue">logged in</a> to post a comment.
        </p>
    {/if}
</section>
