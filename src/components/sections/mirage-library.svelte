<script>
    import Button from '../shared/button.svelte';
</script>

<section class="container flex flex-col gap-4">
    <h2 class="text-primary-blue font-inter font-semibold text-h_2">The home of Mirage</h2>
    <p class="text-card text-md leading-8 font-semibold font-inter">Our ever-expanding <span class="text-primary-green">VST/AU</span> engine for FrozenPlain sample libraries</p>
</section>
<section class="w-full bg-section shadow-lg">
    <div class="container py-12 flex items-center gap-5 mt-5">
        <div class="grid gap-4">
            <div class="font-light text-lg font-inter text-card relative pl-4">
                <div
                    class="bg-gradient-to-b from-primary-blue to-primary-green absolute left-0 bottom-2 top-2 w-1 z-0 rounded-lg"
                ></div>
                Designed from the ground up to be the engine for our sample libraries, this<span
                    class="text-primary-green">VST/VU</span
                >
                plugin offers diverse features for creating compelling instruments and sound design.
                <br />
                <br />
                The ever-growing selection of sample libraries for Mirage explores the worlds of cinematic,
                ambient, thriller, horror and meditation sounds
            </div>
            <div class="flex max-md:items-center max-xl:flex-col max-xl:items-start gap-5">
                <button
                    class="flex flex-row gap-3 hover:text-primary-blue items-center font-bold font-futura text-sm text-card py-4 px-0 rounded-lg"
                    ><svg
                        class="stroke-primary-blue fill-primary-blue"
                        xmlns="http://www.w3.org/2000/svg"
                        height="24"
                        width="24"
                        viewBox="0 0 384 512"
                        ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
                            d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                        /></svg
                    >LEARN MORE</button
                >
                <Button fit title="BROWSE MIRAGE LIBRARIES (10)" />
            </div>
        </div>
        <img class="w-1/2 max-md:hidden" src="/icons/Mirage 1.svg" alt="" />
    </div>
</section>
