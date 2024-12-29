<script lang="ts">
    import type { CommentInterface } from '$lib/interfaces';
    import Comment from './comment.svelte';

    export let comments: CommentInterface[];
    export let user_id: string|undefined;
</script>

<section class="pt-12 grid grid-cols-1">
    <h1 class="font-futura font-normal text-h2 text-card">COMMENTS</h1>
    {#each comments as comment}
        <Comment {comment} on:updateLikes on:addReply {user_id} />
    {/each}
</section>
