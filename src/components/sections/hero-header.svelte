<script>
    import { goto } from '$app/navigation';
    import Button from '../shared/button.svelte';
</script>

<section class="w-full bg-cover bg-no-repeat max-sm:bg-left bg-center bg-hero-header">
    <div class="container py-12 flex items-center justify-center">
        <div class="grid gap-2 justify-items-center">
            <div class="grid gap-3">
                <h1 class="font-bold font-futura my-3 text-card max-sm:text-h2 text-h2 text-center">
                    Sample-based Synths
                </h1>
                <h2 class="font-bold font-futura text-card text-lg text-center">
                    For Ambient, Cinematic and Electronic music
                </h2>
                <p class="text-card max-sm:text-sm font-inter text-md text-center">
                    Libraries and audio plugins for composers, producers, <br /> musicians and sound
                    designers
                </p>
            </div>

            <div>
                <Button on:click={() => goto('/shop')} title="SHOP NOW" />
            </div>
        </div>

        <!-- <div class="grid justify-items-center max-lg:hidden"> -->
        <!--     <img class="w-11/12" src="/icons/header-image2.svg" alt="Piano" /> -->
        <!-- </div> -->
    </div>
</section>
