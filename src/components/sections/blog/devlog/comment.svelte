<script lang="ts">
    import type { CommentInterface } from '$lib/interfaces';
    import { createEventDispatcher } from 'svelte';
    import CommentReply from './commentReply.svelte';
    import { clickOutside } from '../../../../action/clickoutside';
    import Icon from '../../../shared/icon.svelte';
    import { likeLoading, user } from '$lib/store';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    export let comment: CommentInterface;
    export let user_id: string|undefined;

    let _reply: string = '';
    let replyBoxToggler: boolean = false;

    const dispatch = createEventDispatcher();

    const handleAddReply = () => {
        dispatch('addReply', {
            comment_id: comment.id,
            reply: _reply
        });

        _reply = '';
        replyBoxToggler = false;
    };

    const handleUpdateLikes = (comment_id: number, reply_id?: number) => {
        if ($user.authenticated) {
            likeLoading.update(prev => true)
            dispatch('updateLikes', {
                comment_id,
                reply_id
            });
        } else {
            let urlParams = new URLSearchParams({
                redirect: $page.url.pathname
            });
            goto(`/sign-in?${urlParams.toString()}`);
        }
    };

    $: thumbColor = comment.likes > 0 ? 'fill-blue-light' : 'fill-card'


</script>

<div class="p-8 mt-12 bg-foreground border-2 text-card border-card/5 rounded-lg">
    <div class="flex flex-row items-start gap-4 sm:gap-8">
        <!-- <img class="h-12 sm:h-20 aspect-square rounded-full" src="/images/commentimage.svg" alt="" /> -->
        <div
            class="h-12 sm:h-20 p-1 aspect-square flex justify-center items-center rounded-full bg-foreground border-2 border-card-5"
        >
            <p class="uppercase text-card text-h5 sm:text-h3 font-bold">{comment.accounts.email.at(0)}</p>
        </div>
        <div class="grid grid-cols-1 place-items-stretch gap-4 w-full">
            <p class="font-inter font-semibold text-h_6 text-card">
                {comment.accounts.email.split('@')[0]}
            </p>
            <p class="font-light font-inter text-md text-card/50">
                {new Date(comment.created_at).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric',
                    day: 'numeric'
                })}
            </p>
            <p
                class="font-light font-inter text-md text-card place-self-start"
            >
                {comment.comment}
            </p>
            <div class="flex gap-2 flex-row justify-between">
                <div class="flex flex-row gap-2 items-start justify-center">
                    <button on:click={() => handleUpdateLikes(comment.id)} disabled={$likeLoading}>
                        <!-- <img src="/icons/thumb.svg" alt="" /> -->
                        <Icon name="Thumb" width=21 height=22 class="{thumbColor}"/>
                    </button>
                    {comment.likes}
                </div>
                <button
                    on:click={() => {
                        if ($user.authenticated) {
                            replyBoxToggler = true;
                        } else {
                            let urlParams = new URLSearchParams({
                                redirect: $page.url.pathname
                            });
                            goto(`/sign-in?${urlParams.toString()}`);
                        }
                    }}
                    class="font-futura sm:mt-2 font-normal text-card text-btn hover:bg-primary-blue border-2 px-4 sm:px-8 border-primary-blue py-2 sm:py-4 rounded-lg"
                    >Reply</button
                >
            </div>

            <div
                class="mt-6 hidden flex-col gap-2"
                class:!flex={replyBoxToggler}
                use:clickOutside
                on:clickoutside={() => (replyBoxToggler = false)}
            >
                <div class="flex items-center justify-between gap-4">
                    <label class="text-card font-semibold text-h_6 font-inter" for="reply"
                        >Reply to {comment.accounts.email.split('@')[0]}:</label
                    >
                    <button on:click={() => (replyBoxToggler = false)}>
                        <Icon name="XCircle" height="18" width="18" />
                    </button>
                </div>
                <textarea
                    class="bg-foreground border-2 border-section rounded-md w-full p-2"
                    name="reply"
                    bind:value={_reply}
                    id="reply"
                    cols="30"
                    rows="8"
                ></textarea>
                <button
                    on:click={() => handleAddReply()}
                    class="font-futura justify-self-start font-normal text-card text-btn hover:bg-primary-blue border-2 px-4 sm:px-8 border-primary-blue py-2 sm:py-4 rounded-lg w-max"
                    >Submit</button
                >
            </div>
        </div>
    </div>
    {#each comment.comments as reply}
        <CommentReply {reply} comment_id={comment.id} on:updateLikes {user_id} />
    {/each}
</div>
