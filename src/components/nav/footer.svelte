<script lang="ts">
    import { user } from '$lib/store';
</script>

<footer class="bg-foreground">
    <div class="container py-16">
        <div
            class="grid grid-cols-1 content-center place-content-center sm:grid-cols-2 gap-6 md:grid-cols-3"
        >
            <div class="flex flex-col gap-4 md:gap-8 items-start font-bold justify-start">
                <p class="text-card font-inter">NAVIGATION</p>
                
                <div class="text-left flex flex-col font-light items-start gap-3">
                    <a
                        class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                        href="/">Home</a
                    >
                    <a
                        class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                        href="/shop">Shop</a
                    >
                    <a
                        class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                        href="/">Contact/FAQ</a
                    >
                    <a
                        class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                        href="/">About</a
                    >
                    <a
                        class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                        href="/">Refund Policy</a
                    >
                    <a
                        class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                        href="/">Terms and Conditions</a
                    >
                    <a
                        class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                        href="/">Cookie Policy (EU)</a
                    >
                </div>
            </div>

            <div class="flex flex-col gap-4 md:gap-8 items-start font-bold justify-start">
                <p class="text-card font-inter">ACCOUNT</p>
                
                <div class="text-left flex flex-col font-light items-start gap-3">
                    <!-- <a
                        class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                        href={$user.authenticated ? '/my-account/settings' : '/sign-in'}>My Account</a
                    > -->
                    <a
                        class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                        href={$user.authenticated ? '/my-account/orders' : '/sign-in'}>My Orders</a
                    >
                    <a
                        class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                        href={$user.authenticated ? '/my-account/downloads' : '/sign-in'}>Downloads</a
                    >
                    <a
                         class="text-xxs font-inter text-left text-card hover:text-primary-blue"
                         href={$user.authenticated ? '/my-account/settings' : '/sign-in'}>Account Details</a
                    >
                </div>
            </div>

            <div class="flex flex-col gap-4 md:gap-8 items-start font-bold justify-start">
                <p class="text-card font-inter">ABOUT</p>
                <div class="flex flex-col items-start justify-between h-full">

                    <p class="text-left font-light text-card flex flex-col items-start gap-3">
                        FrozenPlain makes sample libraries and audio plugins for composers, producers,
                        musicians and sound designers. Our goal is to help you make great music. To that
                        end, we value being straightforward and transparent. We hate battling with long
                        checkouts, complicated licence keys and bad user interfaces.
                    </p>
                    <div class="flex flex-row justify-center gap-3 mt-6">
                        <a href="https://facebook.com" class="rounded-full">
                            <svg
                                class="fill-card hover:fill-primary-blue cursor-pointer stroke-card bg-primary-blue hover:bg-primary-blue/40 rounded-full p-1"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                width="24"
                                viewBox="0 0 320 512"
                                ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
                                    d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"
                                /></svg
                            >
                        </a>
                        <a href="https://youtube.com" class="rounded-full">
                            <svg
                                class="fill-card hover:fill-primary-blue cursor-pointer stroke-card bg-primary-blue hover:bg-primary-blue/40 rounded-full p-1"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                width="24"
                                viewBox="0 0 576 512"
                                ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
                                    d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"
                                /></svg
                            >
                        </a>
                        <a href="https://twitter.com" class="rounded-full">
                            <svg
                                class="fill-card hover:fill-primary-blue cursor-pointer stroke-card bg-primary-blue hover:bg-primary-blue/40 rounded-full p-1"
                                xmlns="http://www.w3.org/2000/svg"
                                height="24"
                                width="24"
                                viewBox="0 0 512 512"
                                ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
                                    d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                                /></svg
                            >
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="w-full bg-gradient-to-r from-primary-blue to-primary-green h-[3px]"></div>
    <div class="container py-6 grid grid-cols-2 max-sm:grid-rows-2 max-sm:grid-cols-1">
        <p class="text-primary-blue font-inter text-left max-sm:text-center text-xs">
            Privacy and Site Cookie Policy
            <br />
            <span class="text-card">Protected by reCAPTCHA.</span> Privacy - Terms
        </p>
        <p class="text-card font-inter text-left max-sm:text-center text-xs">
            Our order process is conducted by our online reseller Paddle.com. Paddle.com is the
            Merchant of Record for all our orders. Paddle provides all customer service inquiries
            and handles returns.
        </p>
    </div>
</footer>
