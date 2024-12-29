<script lang="ts">
    import Carousel from '../../shared/carousel.svelte';
</script>

<section class="w-full py-[50px]">
    <div class="container grid grid-cols-2 max-lg:grid-cols-1 place-items-center gap-5">
        <div class="grid grid-cols-1 gap-8">
            <h1 class="font-inter font-semibold text-primary-blue text-h_5">
                Designed by renowned ambient producer, Hilyard
            </h1>
            <div class="font-light text-md font-inter text-card relative pl-4">
                <div
                    class="bg-gradient-to-b from-primary-blue to-primary-green absolute left-0 bottom-1 top-1 w-1 z-0 rounded-lg"
                ></div>
                <p class="">
                    For over 8 years, Hilyard has been transporting listeners to serene and
                    beautiful worlds with his impactful ambient music. He combines a masterful use
                    of drone- sound-design with subtle compositional elements to create emotion,
                    depth, nostalgia and uplifting melancholy. He has an outstanding 25 releases
                    (albums, singles and EPs) on<span class="text-primary-blue">Spotify</span>. For
                    Lost Reveries, Hilyard has drawn from his own sonic palette to create a set of
                    sample-based instruments that allow you to create your own emotive ambient
                    tones. plugin offers diverse features for creating compelling instruments and
                    sound design.
                </p>
                <p class="mt-2">
                    Hilyard’s work has been part of prominent record labels in the ambient-music
                    world:
                    <span class="text-primary-blue">Stereoscenic</span> and
                    <span class="text-primary-blue">Cryo Chamber</span>. The effect of this type of
                    music has been surprisingly wide reaching as is evident of Cryo Chamber’s 340K
                    YouTube subscribers. You might find inspiration on how to utilise Lost Reveries
                    by listening to the work of Stereoscenic and Cryo Chamber’s artists.
                </p>
            </div>
        </div>

        <Carousel
            uniqueId="hilyard-carousel"
            items={[
                {
                    path: 'img1.png',
                    title: 'Hilyard - a wake in shadows',
                    description: 'Spotify | Bandcamp'
                },
                {
                    path: 'img2.jpeg',
                    title: 'Hilyard - a wake in shadows',
                    description: 'Spotify | Bandcamp'
                },
                {
                    path: 'img1.png',
                    title: 'Hilyard - a wake in shadows',
                    description: 'Spotify | Bandcamp'
                },
                {
                    path: 'img2.jpeg',
                    title: 'Hilyard - a wake in shadows',
                    description: 'Spotify | Bandcamp'
                }
            ]}
        />
    </div>
</section>
