<script lang="ts">
    import { Mail } from 'lucide-svelte';
    import Button from '../../../components/shared/button.svelte';
    import { signInWithEmail } from '$lib/supabase';
    import { page } from '$app/stores';
    import Toast from '../../../components/shared/toast.svelte';
    import { toastMsg, user } from '$lib/store';
    import { onMount } from 'svelte';
    import { browser } from "$app/environment";

    let email = '';

    export let data;

    let { supabase } = data;
    $: ({ supabase } = data);

    $: {
        if(browser && $user.authenticated){
            window.history.back()
        }
    }

    let redirect: string | null = null;

    let loading = false;

    const handleSubmit = async () => {
        const isValidEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(email);
        if (isValidEmail) {
            try {
                loading = true;
                // Implement check for ban users
                const response = await signInWithEmail({
                    supabase: supabase,
                    email: email,
                    redirect
                });
                if (response.error) {
                    if (response.error.status === 429) {
                        toastMsg.set({
                            msg: 'Email rate limit exceeded.',
                            icon: 'Warning',
                            desc: 'Try again in some time.'
                        });
                    } else {
                        toastMsg.set({
                            msg: response.error.message,
                            icon: 'Warning',
                            desc: "There is some error on server, please try again later. Contact support of you're still having issues"
                        });
                    }
                } else {
                    toastMsg.set({
                        msg: 'Check your email for sign-in link',
                        icon: 'Success',
                        desc: 'Please check your email for the link! Make sure to check your spam emails if you do not receive it. Contact support if you’re still having issues'
                    });
                }
                loading = false;
            } catch (error) {
                loading = false;
            }
        } else {
            toastMsg.set({
                msg: 'Invalid email address',
                icon: 'Warning',
                desc: 'Please provide a valid email address.'
            });
        }
    };

    onMount(() => {
        redirect = $page.url.searchParams.get('redirect');
    });
</script>

<div
    class="w-full bg-gradient-to-r from-foreground from-50% max-md:from-100% max-md:to-0% to-background to-50% relative"
>
    <Toast left="right-8" top="top-20" classes="z-50" />
    <div
        class="container grid grid-cols-1 h-screen md:grid-cols-2 justify-items-stretch content-between md:content-center"
    >
        <div class="w-full p-6 grid h-screen grid-cols-1 max-md:place-items-center bg-foreground">
            <a href="/">
                <img src="/icons/logo.svg" class="place-content-start w-32 my-2 p-2" alt="logo" />
            </a>

            <form on:submit|preventDefault={handleSubmit} class="flex flex-col gap-5">
                <h4 class="text-card text-h3 font-futura font-bold">LOG IN WITH EMAIL</h4>
                <div class="flex flex-col gap-4 font-inter text-md font-light">
                    <label for="" class="text-card"
                        >Enter your email address and click send magic link to receive a one-time <br
                        />login link. No password needed.</label
                    >
                    <div class="flex flex-col gap-1.5">
                        <label for="" class="text-card/80">Email</label>
                        <div class="relative">
                            <input
                                type="text"
                                name="email"
                                bind:value={email}
                                class="pl-12 pr-4 w-full py-3.5 placeholder-card/50 text-card text-text-card border-2 border-card/5 rounded-lg bg-card/5 placeholder-text-card/80"
                                placeholder="example@gmail.com"
                            />
                            <Mail
                                class="absolute  {email
                                    ? 'stroke-card'
                                    : 'stroke-card/50'} left-4 top-1/2 -translate-y-1/2"
                            />
                        </div>
                    </div>
                </div>
                <Button {loading} title="SEND MAGIC LINK" />
            </form>
        </div>
        <div
            class="hidden w-full relative md:p-6 md:h-screen md:grid content-center justify-items-center"
        >
            <img class="w-[50%] md:w-[72%] h-auto" src="/icons/authicon.svg" alt="" />

            <h3
                class="font-futura font-bold text-card absolute text-center top-1/2 left-1/2 w-[100%] transform -translate-x-1/2 -translate-y-1/2 text-h2"
            >
                WELCOME TO <br />FROZENPLAIN
            </h3>
        </div>
    </div>
</div>
