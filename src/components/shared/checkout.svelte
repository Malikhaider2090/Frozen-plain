<script lang="ts">
    import { browser } from '$app/environment';
    import { createEventDispatcher, onDestroy, onMount } from 'svelte';
    import { clickOutside } from '../../action/clickoutside';
    import { Mail } from 'lucide-svelte';
    import { checkoutModal } from '$lib/store';

    export let email = '';
    export let codeSent = false;
    export let loading = false;

    const dispatch = createEventDispatcher();

    onMount(() => {
        if (browser) {
            document.body.classList.add('overflow-hidden');
        }
    });

    onDestroy(() => {
        if (browser) {
            document.body.classList.remove('overflow-hidden');
        }
    });

    const closeModal = () => {
        email = '';
        codeSent = false;
        checkoutModal.set(false);
    };

    const sendCode = () => {
        dispatch('sendCode');
    };
</script>

<div
    class="fixed inset-0 h-full w-full flex justify-center items-center bg-black/50 backdrop-blur-sm z-50"
>
    <div
        class="rounded-lg border-2 border-card-5 p-5 bg-foreground flex flex-col gap-2 max-sm:mx-2 max-sm:w-full max-md:w-4/5 max-lg:w-3/5 w-2/5 max-w-2xl"
        use:clickOutside
        on:clickoutside={closeModal}
    >
        <p class="text-card text-lg font-normal">Verify your email</p>
        <hr class="border-card-5 border-2" />
        <div class="pt-6 flex flex-col gap-6">
            <form class="flex flex-col gap-4" on:submit|preventDefault={sendCode}>
                <p class="text-card/80 text-xxs">To place your order please verify your email.</p>
                <div class="relative">
                    <input
                        bind:value={email}
                        type="email"
                        name="email"
                        class="pl-12 pr-4 w-full py-3.5 placeholder-card/50 text-card text-text-card rounded-lg bg-section placeholder-text-card/80"
                        placeholder="example@gmail.com"
                        required
                    />
                    <Mail
                        class="absolute  {email
                            ? 'stroke-card'
                            : 'stroke-card/50'} left-4 top-1/2 -translate-y-1/2"
                    />
                </div>
                {#if codeSent}
                    <p class="text-xxs text-card/80">
                        Please check your email for the link! Make sure to check your spam emails if
                        you do not receive it. Contact support if you’re still having issues.
                    </p>
                {/if}
                <div class="flex justify-end gap-4">
                    <button
                        class="bg-foreground rounded-lg p-4 text-sm disabled:bg-card-15 border-2 border-card-5 text-card font-inter font-semibold"
                        on:click={closeModal}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        class="bg-primary-blue rounded-lg p-4 text-sm focus:bg-card-15 disabled:bg-card-15 disabled:text-primary-blue focus:text-primary-blue focus:border-card-5 text-card font-inter font-semibold"
                        type="submit"
                        disabled={loading || codeSent}
                    >
                        Send Code
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
