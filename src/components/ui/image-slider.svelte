<script>

    let currentIndex = 0;
    let items = ['slide1.svg', 'slide2.svg'];

    const next = () => {
        currentIndex = (currentIndex + 1) % items.length;
    };

    const prev = () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
    };

</script>

<div class="grid grid-cols-1 gap-5 justify-center relative h-screen">

    <div class="absolute cursor-pointer">
        <button class="p-1 rounded-lg bg-section" on:click={prev}>
            <img class="w-[10px] h-[10px]" src="/icons/slideleftarrow.svg" alt="" /></button
        >

        <button class="p-1 rounded-lg bg-section" on:click={next}>
            <img class="w-[10px] h-[10px]" src="/icons/sliderightarrow.svg" alt="" /></button
        >
    </div>

    <div class="overflow-hidden relative">
        {#each items as item, i (i)}
            <div
                class="w-full h-full absolute transition-transform duration-300 transform translate-x-full"
                class:selected={i === currentIndex}
                style={`transform: translateX(${100 * (i - currentIndex)}%)`}
            >
                <div class="w-full h-full flex items-center justify-center">
                    <img class="rounded-md" src="/images/{item}" alt="" />
                </div>
            </div>
        {/each}
    </div>

    <div class="absolute transform -translate-x-1/2 flex space-x-2">
        {#each items as _, i (i)}
            <button
                class="w-4 h-4 bg-primary-blue rounded-full cursor-pointer"
                class:selected={i === currentIndex}
                on:click={() => (currentIndex = i)}
            ></button>
        {/each}
    </div>
</div>
