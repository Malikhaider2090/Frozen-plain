<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import { clickOutside } from '../../action/clickoutside';
    import { slide } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import { page } from '$app/stores';

    export let showYear: boolean = true;
    export let type = '';
    export let date = '';
    export let imagesrc = '';
    export let postedname = '';
    export let title = '';
    export let description = '';
    export let url = '';
    export let comments = 0;

    let width: number;
    let displayDate: Date;

    onMount(() => {
        displayDate = new Date(date);
    });

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    const handleClick = () => {
        goto(`/blog/${url}`);
    };

    let open = false;
    function toggleNav() {
        open = !open;
    }
</script>

<div
    class="flex flex-col bg-foreground border-2 border-section rounded-lg overflow-hidden group"
    bind:clientWidth={width}
>
    <div class="w-full bg-center relative bg-no-repeat bg-cover bg-blogimage1">
        <img class="w-full h-[16rem] object-cover group-hover:scale-110 transition-all duration-500" src={imagesrc} alt="" />
        {#if showYear}
            <div
                class="text-card flex flex-row gap-1 items-center justify-center font-inter bg-primary-blue rounded-br-lg absolute top-0 left-0 py-4 px-6 z-10"
            >
                <span class="text-shopcard font-light">
                    {displayDate ? displayDate?.getDate() : ''}
                </span>
                <span class="text-shopcard font-light uppercase">
                    {displayDate ? months[displayDate?.getMonth()] : ''}
                </span>
                <span class="text-shopcard font-light">
                    {displayDate ? displayDate?.getFullYear() : ''}
                </span>
            </div>
        {:else}
            <div
                class="text-card flex flex-col items-center justify-center font-inter bg-primary-blue rounded-br-lg absolute top-0 left-0 py-2 px-4 z-10"
            >
                <span class="text-h5 font-light">
                    {displayDate ? displayDate?.getDate() : ''}
                </span>
                <span class="text-xs font-light uppercase">
                    {displayDate ? months[displayDate?.getMonth()] : ''}
                </span>
            </div>
        {/if}
    </div>

    <div class="px-8 {width > 400 ? 'pb-5' : 'pb-2'} mt-4 flex flex-col justify-start gap-2">
        <div class="flex flex-col gap-2">
            <div class="flex {width > 400 ? 'flex-row' : 'flex-col'} gap-4">
                <div class="flex gap-2 justify-between items-center">
                    <button
                        class="font-normal text-card text-xs bg-primary-blue p-1 rounded-[4px] px-3 uppercase"
                        >{type}</button
                    >
                    <!-- <div class="flex gap-2 items-center">
                    </div> -->
                </div>
                <div class="flex gap-2 items-center justify-between w-full">
                    <div class="flex gap-2 items-center">
                        <button><img src="/icons/blogicon1.svg" alt="" /></button>
                        <p class="font-light text-card font-inter text-xs whitespace-nowrap">
                            Posted by {postedname}
                        </p>
                    </div>
                    <div class="flex items-center gap-2 relative">
                        <button class="relative">
                            <img src="/icons/blogicon2.svg" alt="" />
                            <p
                                class="bg-card rounded-full text-primary-blue aspect-square text-[12px] h-4 p-0.5 absolute flex justify-center items-center font-semibold -top-1 -right-1"
                            >
                                {comments}
                            </p>
                        </button>
                        <!-- svelte-ignore a11y-mouse-events-have-key-events -->
                        <!-- svelte-ignore a11y-no-static-element-interactions -->
                        <div on:mouseenter={toggleNav} on:mouseleave={toggleNav} class="w-max flex items-center py-0.5">
                            <button on:click={toggleNav} class="">
                                <img src="/icons/blogicon3.svg" alt="" />
                            </button>
                            {#if open}
                                <!-- svelte-ignore a11y-no-static-element-interactions -->
                                <div
                                    transition:slide={{
                                        delay: 250,
                                        duration: 300,
                                        easing: quintOut,
                                        axis: 'x'
                                    }}
                                    use:clickOutside
                                    on:clickoutside={() => {
                                        if (open) {
                                            open = false;
                                        }
                                    }}
                                    class="bg-black flex flex-row items-baseline gap-1 p-3 rounded-lg absolute -top-2 right-[18px] cursor-pointer"
                                >
                                    <a
                                        href="https://www.facebook.com/sharer/sharer.php?u={$page.url}/{url}"
                                        target="_blank"
                                    >
                                        <svg
                                            width="11"
                                            height="18"
                                            viewBox="0 0 11 18"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="hover:fill-card/50 fill-card w-5 box-content"
                                        >
                                            <path
                                                d="M9.36 10.125L9.89016 6.87305H6.63609V4.74609C6.63609 4.30078 6.7732 3.89648 7.04742 3.5332C7.32164 3.16992 7.81828 2.98828 8.53734 2.98828H10.0181V0.228516C10.0181 0.228516 9.74086 0.19043 9.18633 0.114258C8.6318 0.0380859 8.03766 0 7.40391 0C6.73359 0 6.12422 0.09375 5.57578 0.28125C5.02734 0.480469 4.56117 0.764648 4.17727 1.13379C3.79336 1.50293 3.49781 1.96289 3.29063 2.51367C3.08344 3.05273 2.97984 3.67383 2.97984 4.37695V6.87305H0V10.125H2.97984V18H6.63609V10.125H9.36Z"
                                            />
                                        </svg>
                                    </a>

                                    <a href="https://twitter.com" target="_blank">
                                        <svg
                                            width="16"
                                            height="14"
                                            viewBox="0 0 16 14"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="hover:fill-card/50 fill-card w-5 box-content"
                                        >
                                            <path
                                                d="M12.4386 0H14.7924L9.65013 5.87731L15.6996 13.875H10.9622L7.25224 9.02444L3.00721 13.875H0.652013L6.1522 7.58856L0.349609 0H5.20586L8.55934 4.4336L12.4372 0H12.4386ZM11.6126 12.4662H12.9168L4.49788 1.33485H3.09828L11.6126 12.4662Z"
                                            />
                                        </svg>
                                    </a>

                                    <a
                                        href="mailto:?subject=FrozenPlain blog&body=Check out this blog {$page.url}/{url}"
                                    >
                                        <svg
                                            width="19"
                                            height="13"
                                            viewBox="0 0 19 13"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="hover:fill-card/50 fill-card w-5 box-content"
                                        >
                                            <path
                                                d="M17.3496 0H1.34961C1.08439 0 0.830039 0.0978312 0.642503 0.271972C0.454966 0.446113 0.349609 0.682299 0.349609 0.928571V11.4524C0.349609 11.8628 0.525204 12.2565 0.837765 12.5467C1.15033 12.8369 1.57425 13 2.01628 13H16.6829C17.125 13 17.5489 12.8369 17.8615 12.5467C18.174 12.2565 18.3496 11.8628 18.3496 11.4524V0.928571C18.3496 0.682299 18.2443 0.446113 18.0567 0.271972C17.8692 0.0978312 17.6148 0 17.3496 0ZM9.34961 6.47833L3.92044 1.85714H14.7788L9.34961 6.47833ZM6.41544 6.5L2.34961 9.96048V3.03952L6.41544 6.5ZM7.89544 7.75976L8.67378 8.42292C8.85822 8.57996 9.09937 8.66708 9.34961 8.66708C9.59985 8.66708 9.841 8.57996 10.0254 8.42292L10.8038 7.75976L14.7788 11.1429H3.92044L7.89544 7.75976ZM12.2838 6.5L16.3496 3.03952V9.96048L12.2838 6.5Z"
                                            />
                                        </svg>
                                    </a>

                                    <a href="https://www.pinterest.com/" target="_blank">
                                        <svg
                                            width="17"
                                            height="17"
                                            viewBox="0 0 17 17"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="hover:fill-card/50 fill-card w-5 box-content"
                                        >
                                            <g clip-path="url(#clip0_10132_603)">
                                                <path
                                                    d="M8.50756 0C3.80926 0 0 3.80306 0 8.49371C0 12.0931 2.24022 15.1695 5.40474 16.4066C5.32793 15.7352 5.26496 14.7006 5.43244 13.9676C5.58607 13.3038 6.42726 9.7459 6.42726 9.7459C6.42726 9.7459 6.17541 9.23547 6.17541 8.48743C6.17541 7.30565 6.8617 6.4256 7.71548 6.4256C8.44333 6.4256 8.79341 6.97123 8.79341 7.62121C8.79341 8.34788 8.33126 9.43914 8.0857 10.4524C7.88296 11.2986 8.51259 11.99 9.34622 11.99C10.8586 11.99 12.0209 10.3959 12.0209 8.10398C12.0209 6.06981 10.5576 4.65042 8.46348 4.65042C6.04067 4.65042 4.62022 6.4608 4.62022 8.33405C4.62022 9.06072 4.89978 9.84396 5.24985 10.2702C5.32037 10.3544 5.32667 10.4311 5.30526 10.5153C5.2423 10.7806 5.09496 11.3614 5.06726 11.4796C5.032 11.633 4.94133 11.6682 4.78015 11.5915C3.71733 11.0936 3.05244 9.54851 3.05244 8.29759C3.05244 5.61973 4.99926 3.15937 8.67504 3.15937C11.623 3.15937 13.9199 5.2564 13.9199 8.06626C13.9199 10.9956 12.0713 13.3503 9.50867 13.3503C8.64733 13.3503 7.83511 12.9028 7.56185 12.3722C7.56185 12.3722 7.13496 13.994 7.02919 14.3925C6.8403 15.133 6.32148 16.0558 5.97141 16.6228C6.76978 16.868 7.6097 17 8.49244 17C13.1907 17 17 13.1969 17 8.50629C17.0139 3.80306 13.2046 0 8.50756 0Z"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_10132_603">
                                                    <rect width="17" height="17" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </a>

                                    <a href="https://www.linkedin.com/" target="_blank">
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 16 16"
                                            xmlns="http://www.w3.org/2000/svg"
                                            class="hover:fill-card/50 fill-card w-5 box-content"
                                        >
                                            <path
                                                d="M8.83264 6.73751C9.05456 6.4876 9.2365 6.2357 9.46441 6.02177C10.1642 5.36202 10.9919 5.03014 11.9595 5.03814C12.4913 5.04213 13.0151 5.08012 13.5269 5.22807C14.6985 5.56594 15.3782 6.37365 15.7041 7.51723C15.948 8.37491 15.992 9.25659 15.994 10.1403C15.998 12.0036 15.988 13.8689 15.992 15.7322C15.992 15.9062 15.944 15.9521 15.7721 15.9521C14.8125 15.9441 13.8508 15.9441 12.8912 15.9521C12.7212 15.9541 12.6852 15.9022 12.6852 15.7422C12.6912 13.9689 12.6912 12.1955 12.6852 10.4202C12.6832 9.97633 12.6552 9.53049 12.5313 9.09865C12.3014 8.30294 11.7316 7.89709 10.8979 7.94107C9.75831 8.00105 9.16652 8.56484 9.02058 9.72242C8.98659 9.99832 8.9686 10.2762 8.97059 10.5541C8.97259 12.2795 8.96859 14.0049 8.97459 15.7302C8.97459 15.9022 8.93261 15.9521 8.75667 15.9521C7.78903 15.9441 6.82138 15.9441 5.85374 15.9521C5.69779 15.9541 5.65381 15.9122 5.65381 15.7542C5.65781 12.3395 5.65781 8.92271 5.65381 5.50796C5.65381 5.33803 5.70979 5.30004 5.86973 5.30004C6.78739 5.30604 7.70706 5.30804 8.62472 5.30004C8.79466 5.29804 8.83664 5.35402 8.83464 5.51396C8.82665 5.92181 8.83264 6.32966 8.83264 6.73751Z"
                                            />
                                            <path
                                                d="M3.57069 10.6401C3.57069 12.3295 3.56869 14.0189 3.57469 15.7082C3.57469 15.8962 3.52871 15.9521 3.33478 15.9501C2.37513 15.9401 1.41548 15.9421 0.453833 15.9481C0.299889 15.9501 0.253906 15.9102 0.253906 15.7522C0.257905 12.3315 0.257905 8.91072 0.253906 5.48798C0.253906 5.34603 0.287894 5.29605 0.437839 5.29605C1.41148 5.30204 2.38513 5.30404 3.35877 5.29405C3.5467 5.29205 3.57069 5.36402 3.57069 5.52596C3.56869 7.23334 3.57069 8.93671 3.57069 10.6401Z"
                                            />
                                            <path
                                                d="M3.83661 1.9093C3.83861 2.97091 2.97692 3.8346 1.91731 3.8346C0.871694 3.8346 0.0040123 2.97091 1.37647e-05 1.92529C-0.00398477 0.869682 0.863697 0 1.92131 0C2.97093 0.00399854 3.83461 0.865683 3.83661 1.9093Z"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
                <div class="flex flex-row gap-2 items-center justify-start"></div>
            </div>
            <div class="flex flex-col justify-start gap-3 {width > 400 ? 'm-2' : ''}">
                <p class="font-semibold text-h5 font-futura text-card line-clamp-2">{title}</p>
                <p class="font-light text-md font-inter text-card line-clamp-3">{description}</p>
            </div>
            <button
                on:click={handleClick}
                class="flex flex-row justify-start hover:text-primary-blue w-full gap-2 items-center font-bold font-futura text-sm text-card py-4 px-0 rounded-lg"
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
