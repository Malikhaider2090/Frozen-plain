<script lang="ts">
    import { goto } from '$app/navigation';
    import { toastMsg, user } from '$lib/store';
    import { resendOtp, signOut, updateEmail, verifyOtp } from '$lib/supabase';
    import { clickOutside } from '../../../../action/clickoutside';
    import Icon from '../../../../components/shared/icon.svelte';
    import Toast from '../../../../components/shared/toast.svelte';

    export let data;
    $: ({ session, supabase } = data);

    let loading = false;
    let otpLoading: boolean = false;
    let otp: string = '';
    let otpError: string = '';

    let emailInput: string = ''
    let emailError: string = ''

    let emailForm: HTMLFormElement;

    $: email = '';
    $: timer = 60;
    let timerInterval: NodeJS.Timeout;

    let modalToggler: boolean = false;
    let emailModalToggler: boolean = false;

    const openModal = () => {
        document.body.classList.add('overflow-hidden');
        modalToggler = true;
    };

    const closeModal = () => {
        document.body.classList.remove('overflow-hidden');
        modalToggler = false;
    };

    const deleteUser = async () => {
        if(emailInput === $user.email){
            
            loading = true;
            const resp = await fetch('/api/delete-user', {
                method: 'POST',
                body: JSON.stringify({
                    user_id: session?.user.id
                })
            });
    
            if (resp.status === 200) {
                document.body.classList.remove('overflow-hidden');
                modalToggler = false;
                loading = false;
                await signOut(supabase);
                goto('/');
            } else {
                document.body.classList.remove('overflow-hidden');
                modalToggler = false;
                loading = false;
            }
        }else{
            emailInput = ''
            emailError = "Invalid email"
        }
    };

    const closeEmailModal = () => {
        document.body.classList.remove('overflow-hidden');
        emailModalToggler = false;
        email = '';
        clearInterval(timerInterval);
    };

    const handleEmailUpdate = async (event: { currentTarget: EventTarget & HTMLFormElement }) => {
        loading = true;
        const data = new FormData(event.currentTarget);
        email = data.get('email')!.toString();
        if (email === $user.email) {
            toastMsg.update((prev) => ({
                icon: 'Warning',
                msg: 'Invalid email',
                desc: 'Enter a different email to update'
            }));
            loading = false;
        } else {
            const { data, error } = await updateEmail(supabase, email);
            if (error) {

                let description = '';
                let msg = '';
                if (error === 'Email rate limit exceeded') {
                    msg = error;
                    description = 'Try again in some time';
                } else if (error === 'A user with this email address has already been registered') {
                    msg = 'Email already registered';
                    description = `Email ${email} is already registered, Try using a different email.`;
                } else {
                    msg = error;
                }
                toastMsg.update((prev) => ({ icon: 'Warning', msg, desc: description }));
                loading = false;
            } else {
                // event.currentTarget.reset();
                document.body.classList.add('overflow-hidden');
                emailModalToggler = true;
                timerInterval = setInterval(() => timer--, 1000);
                loading = false;
            }
        }
    };

    const _verifyOtp = async () => {
        otpLoading = true;
        const { data, error } = await verifyOtp(supabase, otp.toString(), email);
        otp = '';
        otpLoading = false;
        if (!error) {
            emailForm.reset();
            closeEmailModal();
            toastMsg.set({
                msg: 'Email updated successfully',
                icon: 'Success',
                desc: `Your email has successfully updated to ${email}`
            });
            user.update((prev) => ({ ...prev, email: email.toString() }));
        } else {
            otpError = 'Invalid Otp';
        }
    };

    const _resendOtp = async () => {
        const { data, error } = await resendOtp(supabase, $user.email);
        if (!error) {
            timer = 60;
        }
    };

    $: {
        if (emailInput && emailError != '') {
            emailError = '';
        }

        if (otp && otpError != '') {
            otpError = '';
        }

        if (otp && otp.toString().length === 6 && !otpLoading) {
            _verifyOtp();
        }
    }
</script>

<div class="flex flex-col gap-4 col-span-3 relative">
    <Toast left="right-0" top="-top-5" />
    <h5 class="text-h_5 text-card font-semibold">Account Settings</h5>
    <div class="flex flex-col gap-8">
        <form
            class="flex flex-col gap-6 p-8 bg-foreground w-full border-2 border-card-5 rounded-lg"
            on:submit|preventDefault={handleEmailUpdate}
            bind:this={emailForm}
        >
            <h6 class="text-card text-h_6 font-semibold">Change your email address</h6>
            <div class="flex flex-col gap-2">
                <label class="text-card/80 text-md" for="email">New email</label>
                <div class="relative">
                    <input
                        type="email"
                        required
                        id="email"
                        name="email"
                        placeholder="example@gmail.com"
                        class="w-full sm:w-3/5 bg-section border-2 border-card-5 rounded-lg py-3.5 pl-11 placeholder-card/80 text-card"
                    />
                    <Icon
                        name="Mail"
                        class="fill-card/80 absolute top-1/2 -translate-y-1/2 left-4"
                        width="20"
                        height="15"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                class="uppercase w-full sm:w-[17rem] text-card hover:text-primary-blue border-2 border-primary-blue bg-primary-blue hover:bg-foreground rounded-lg py-4 text-md font-bold"
                >Save</button
            >
        </form>
        <div class="flex flex-col gap-6 p-8 bg-foreground w-full border-2 border-card-5 rounded-lg">
            <h6 class="text-card text-h_6 font-semibold">Account Details</h6>
            <div class="flex items-center gap-2">
                <Icon name="Mail" class="fill-card" width="20" height="15" />
                <p class="text-card text-md">{$user.email}</p>
            </div>

            <button
                on:click={openModal}
                class="uppercase w-full sm:w-[17rem] text-card hover:text-primary-red border-2 border-primary-red bg-primary-red hover:bg-foreground rounded-lg py-4 text-md font-bold"
                >DELETE ACCOUNT</button
            >
        </div>
    </div>
</div>

{#if emailModalToggler}
    <div
        class="w-full h-full overflow-hidden fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center bg-black/50"
    >
        <div
            class="rounded-lg border-2 border-card-5 bg-foreground p-5 flex flex-col gap-2 max-sm:mx-2 max-w-2xl"
            use:clickOutside
            on:clickoutside={closeEmailModal}
        >
            <p class="text-card text-lg font-normal">Verify new email</p>
            <hr class="border-card-5 border-2" />
            <div class="pt-6 flex flex-col gap-8">
                <p class="text-md text-card font-light">
                    {`We sent you a six digit confirmation code to ${email}. Please enter it below to
                    confirm your email adress.`}
                </p>
                <div class="flex flex-col gap-0.5">
                    {#if otpError !== ''}
                        <small class="text-primary-red px-2">{otpError}</small>
                    {/if}
                    <input
                        disabled={otpLoading}
                        bind:value={otp}
                        type="number"
                        placeholder={'Enter 6-digit code'}
                        class={`p-3 px-4 text-sm rounded-lg border border-card-5 bg-section placeholder-card/80 text-card w-full `}
                    />
                </div>
                <div class="text-card/80 font-inter flex items-end justify-between gap-4">
                    <p class="text-base">
                        Didn't receive a code?
                        <button
                            class:text-blue-light={timer <= 0}
                            disabled={timer > 0}
                            class="underline"
                            on:click={_resendOtp}
                        >
                            Send code again.
                        </button>
                    </p>
                    <small class="whitespace-nowrap">
                        {#if timer > 0}
                            {timer} seconds
                        {/if}
                    </small>
                </div>
                <div class="flex gap-6 items-center">
                    <button
                        on:click={closeEmailModal}
                        class="uppercase w-full sm:w-[12rem] text-card border-2 border-card-5 hover:bg-primary-navhover/20 rounded-lg py-3 text-md font-bold"
                        >Cancel</button
                    >
                </div>
            </div>
        </div>
    </div>
{/if}

{#if modalToggler}
    <div
        class="w-full h-full overflow-hidden fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-center bg-black/50"
    >
        <div
            class="rounded-lg border-2 border-card-5 bg-foreground p-5 flex flex-col gap-2 max-sm:mx-2"
            use:clickOutside
            on:clickoutside={closeModal}
        >
            <div class="flex items-center gap-2">
                <div class="bg-primary-red p-0.5 rounded-sm">
                    <Icon name="Warning" class="fill-card" width="16" height="16" />
                </div>
                <p class="text-card text-lg font-normal">Delete Account?</p>
            </div>
            <hr class="border-card-5 border-2" />
            <div class="pt-6 flex flex-col gap-8 sm:px-16">
                <p class="text-md text-card font-light text-left">
                    Are you sure you want to delete this Account?
                </p>
                <div class="flex flex-col gap-0.5">
                    {#if emailError !== ''}
                        <small class="text-primary-red px-2">{emailError}</small>
                    {/if}
                    <input
                        bind:value={emailInput}
                        type="email"
                        placeholder={'Enter your email address'}
                        class={`p-3 px-4 text-sm rounded-lg border border-card-5 bg-section placeholder-card/80 text-card w-full`}
                    />
                </div>
                <div class="flex gap-6 items-center">
                    <button
                        on:click={closeModal}
                        class="uppercase w-full sm:w-[12rem] text-card border-2 border-card-5 hover:bg-primary-navhover/20 rounded-lg py-3 text-md font-bold"
                        >Cancel</button
                    >
                    <button
                        on:click={deleteUser}
                        disabled={loading}
                        class="uppercase w-full sm:w-[12rem] text-card hover:text-primary-red border-2 border-primary-red bg-primary-red hover:bg-foreground rounded-lg py-3 text-md font-bold"
                        >DELETE</button
                    >
                </div>
            </div>
        </div>
    </div>
{/if}

<style>
    input[type='number'] {
        appearance: textfield;
        -moz-appearance: textfield;
    }

    input:active:focus {
        outline: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
</style>
