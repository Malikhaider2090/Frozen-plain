<script lang="ts">
    import type { CommentInterface } from '$lib/interfaces';
    import { likeLoading, user } from '$lib/store';
    import { createEventDispatcher } from 'svelte';
    import Icon from '../../../shared/icon.svelte';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    export let reply: CommentInterface;
    export let comment_id: number;
    export let user_id: string|undefined;

    const dispatch = createEventDispatcher();

    const handleUpdateLikes = (reply_id?: number) => {
        if($user.authenticated){
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

    $: thumbColor = reply.likes > 0 ? 'fill-blue-light' : 'fill-card'
    

</script>

<div class="flex flex-row items-start gap-4 sm:gap-8 ml-6 sm:ml-12 mt-6">
    <!-- <img class="h-12 sm:h-20 aspect-square rounded-full" src="/images/commentimage.svg" alt="" /> -->
    <div
        class="h-12 sm:h-20 p-1 aspect-square flex justify-center items-center rounded-full bg-foreground border-2 border-card-5"
    >
        <p class="uppercase text-card text-h5 sm:text-h3 font-bold">
            {reply.accounts.email.at(0)}
        </p>
    </div>
    <div class="grid grid-cols-1 place-items-stretch gap-4 w-full">
        <p class="font-inter font-semibold text-h_6 text-card">
            {reply.accounts.email.split('@')[0]}
        </p>
        <p class="font-light font-inter text-md text-card/50">
            {new Date(reply.created_at).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
                day: 'numeric'
            })}
        </p>
        <p class="font-light font-inter text-md text-card place-self-start">
            {reply.comment}
        </p>
        <div class="flex gap-2 flex-row justify-between">
            <div class="flex flex-row gap-2 items-start justify-center">
                <button on:click={() => handleUpdateLikes(reply.id)} disabled={$likeLoading}>
                    <!-- <img src="/icons/thumb.svg" alt="" /> -->
                    <Icon name="Thumb" width=21 height=22 class="{thumbColor}"/>
                    
                </button>
                {reply.likes}
            </div>
        </div>
    </div>
</div>
