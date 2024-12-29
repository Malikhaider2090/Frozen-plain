<script>
    import { PlayCircle } from 'lucide-svelte';
</script>

<section class="w-full">
    <div class="container pb-12 grid grid-cols-1 gap-8">
        <div class="flex flex-col md:flex-row justify-center gap-5">
            <button
                class="outline-btn flex flex-row gap-2 sm:w-full md:w-fit items-center font-futura font-bold text-sm text-card hover:text-primary-blue py-3.5 px-4 border-2 bg-foreground border-card/5 rounded-lg hover:bg-primary-navhover/20"
                ><PlayCircle class="stroke-card" />Product Video</button
            >
            <button
                class="outline-btn flex flex-row gap-2 hover:text-primary-blue sm:w-full md:w-fit items-center font-futura font-bold text-sm text-card py-3 px-4 border-2 bg-foreground border-card/5 rounded-lg hover:bg-primary-navhover/20"
                ><PlayCircle class="stroke-card" />Mirage Video</button
            >
        </div>
        <div class="flex justify-center">
            <!-- svelte-ignore a11y-media-has-caption -->
            <!-- <img class="w-[100%] h-auto md:h-[565px]" src="/images/video.svg" alt="" /> -->
            <!-- <video  src=""></video> -->
            <iframe
                class="p-3 w-11/12 h-[60vh] bg-primary-navhover/20 rounded-lg border border-card/10"
                src="https://www.youtube.com/embed/4VbUuz87i98?si=azszeVOfgjZIYeKp"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
        </div>
    </div>
</section>
