<script>
    import Button from '../shared/button.svelte';
    export let year = ''; 
    export let type = '';
    export let date = '';
    export let month = '';
    export let imagesrc = '';
    export let postedname = '';
    export let title = '';
    export let description = '';
</script>

<div class="flex flex-col bg-foreground border-2 border-section rounded-lg">
    <div class="w-full bg-center relative bg-no-repeat bg-cover bg-blogimage1">
        <img class="w-full" src="/images/{imagesrc}.svg" alt="" />
        {#if year}
            <div
                class="text-card flex flex-row gap-1 items-center justify-center font-inter bg-primary-blue rounded-tl-lg rounded-br-lg absolute top-0 left-0 py-4 px-6 z-10"
            >
                <span class="text-shopcard font-light">
                    {date}
                </span>
                <span class="text-shopcard font-light">
                    {month}
                </span>
                <span class="text-shopcard font-light">
                    {year}
                </span>
            </div>
        {:else}
            <div
                class="text-card flex flex-col items-center justify-center font-inter bg-primary-blue rounded-tl-lg rounded-br-lg absolute top-0 left-0 py-2 px-4 z-10"
            >
                <span class="text-h5 font-light">
                    {date}
                </span>
                <span class="text-xs font-light">
                    {month}
                </span>
            </div>
        {/if}
    </div>

    <div class="m-4 mt-4 flex flex-col justify-start gap-2">
        <div class="flex flex-col gap-4">
            <div class="flex gap-2 items-center justify-left">
                <button class="font-normal text-card text-xs bg-primary-blue p-1 rounded-lg px-3"
                    >{type}</button
                >
                <button><img src="/icons/blogicon1.svg" alt="" /></button>
                <p class="font-light text-card font-inter text-xs">Posted by {postedname}</p>
                <button><img src="/icons/blogicon2.svg" alt="" /></button>
                <button><img src="/icons/blogicon3.svg" alt="" /></button>
            </div>
            <div class="flex flex-col gap-3">
                <p class=" text-left font-semibold text-h5 font-futura text-card">{title}</p>
                <p class="font-light text-left text-md font-inter text-card">{description}</p>
            </div>
            <button
                class="flex hover:text-primary-blue w-full gap-2 items-center justify-start font-bold font-futura text-sm text-card py-4 px-0 rounded-lg"
                ><svg
                    class="stroke-primary-blue fill-primary-blue"
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    width="24"
                    viewBox="0 0 384 512"
                    ><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path
                        d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"
                    /></svg
                >CONTINUE READING</button
            >
        </div>
    </div>
</div>
