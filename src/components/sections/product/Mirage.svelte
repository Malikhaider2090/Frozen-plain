<script>
    import Button from '../../shared/button.svelte';
    import Carousel from '../../shared/carousel.svelte';
</script>

<section class="w-full bg-section">
    <div class="container py-12">
        <div class="grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-6 place-items-center pb-6 gap-36">
            <div class="grid grid-cols-1 gap-6">
                <h1 class="font-inter font-semibold text-card text-h_2">Powered by Mirage</h1>
                <h1 class="font-inter font-semibold text-primary-blue text-h_5">
                    A free VST/AU control-hub for FrozenPlain sounds
                </h1>
                <div class="font-light text-md font-inter text-card relative pl-4">
                    <div
                        class="bg-gradient-to-b from-primary-blue to-primary-green absolute left-0 bottom-1 top-1 w-1 z-0 rounded-lg"
                    ></div>
                    <p>
                        Mirage is a sample-based-synthesis VST/AU plugin for Windows and Mac that
                        comes free with any powered-by-Mirage product. It’s the control hub for
                        FrozenPlain’s new sounds, offering a powerful set of parameters and effects
                        for rapid, flexible sound design, no matter what the sound source is.
                    </p>
                    <p class="mt-2">
                        Once it’s opened up in your DAW, you’ll see all of your powered-by-Mirage
                        products ready to click on and use instantly. There’s no subscription or
                        log-in procedure, just instant access to the sounds and presets.
                    </p>
                </div>
                <Button fit title="Download PDF User Manual" />
            </div>

            <Carousel
                uniqueId="mirage-carousel"
                size="h-64"
                gap="gap-4"
                rightAligned={false}
                items={[
                    {
                        path: 'img3.png',
                        title: 'Mirage libraries are loaded from a side panel'
                    },
                    {
                        path: 'img3.png',
                        title: 'Mirage libraries are loaded from a side panel'
                    },
                    {
                        path: 'img3.png',
                        title: 'Mirage libraries are loaded from a side panel'
                    }
                ]}
            />
        </div>
        <div class=" grid grid-cols-2 max-lg:grid-cols-1 max-lg:gap-6 gap-52 place-items-start font-inter text-card font-normal">
            <div class="grid grid-cols-1 gap-6">
                <div class="grid grid-cols-1 gap-4">
                    <p class="font-semibold text-h_6">Designed for sound layering</p>
                    <p class="font-light text-md">
                        Mirage allows for up to three different sounds to be controlled separately
                        and layered together. The layers in Mirage have the following controls
                        unique to them: pitch, volume and pan, filter, volume envelope, LFO, EQ,
                        sample loop settings and MIDI settings. These controls facilitate an
                        incredible amount of manipulation over the original sound source.
                    </p>
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <p class=" font-semibold text-h_6">
                        Minimum friction from your mind to your DAW
                    </p>
                    <p class=" font-light text-md">
                        Mirage is designed to not get in your way. It is fast to load up and is
                        efficient with CPU usage. It has a vector-based GUI that can be resized so
                        that it will work on any size screen. The controls are laid out intuitively,
                        and a full description each control can be viewed by hovering the mouse over
                        it. In the rare case when you need some deeper info, a PDF manual with all
                        of the nitty-gritty details covered is included.
                    </p>
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <p class="font-semibold text-h_6">
                        Use presets or design utterly unique patches
                    </p>
                    <p class="font-light text-md">
                        Mirage is simple on the surface, but has depth for complex sound design when
                        you need it. Initially you might start with exploring the ready-to-use
                        factory presets using the presets browser. But from there you can further
                        layer, mangle and modulate the sound to be the perfect fit for your track;
                        Mirage is a powerful tool for creating utterly unique organic instruments.
                    </p>
                </div>
            </div>
            <div class="grid grid-cols-1 gap-6 content-start">
                <div class="grid grid-cols-1 gap-4">
                    <p class="font-semibold text-h_6">Designed to be played</p>
                    <p class="font-light text-md">
                        Mirage is set up to make fully playable patches. Sounds will respond to both
                        MIDI velocity and the sustain pedal (MIDI CC 64). On top of that, any
                        parameter in Mirage can be controlled by knobs or sliders on your physical
                        MIDI controller. This is done by simply right-clicking the parameter,
                        selecting ‘MIDI learn’ and then moving your controller. And of course,
                        Mirage can be automated with your DAW.
                    </p>
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <p class="font-semibold text-h_6">Explore new sounds spontaneously</p>
                    <p class="font-light text-md">
                        For spontaneous inspiration, Mirage features controls for randomly loading
                        presets and changing parameters. The random preset button has 4 modes for
                        scoping the randomisation to your preferred level, whether that be a folder,
                        a library or the given search text. Parameters can be randomised at various
                        levels too: complete randomisation, just instruments or just the effects
                        rack.
                    </p>
                </div>
                <div class="grid grid-cols-1 gap-4">
                    <p class="font-semibold text-h_6">A rack of built-in Effects</p>
                    <p class="font-semibold text-h_6">Access to free updates</p>
                </div>
            </div>
        </div>
    </div>
</section>
