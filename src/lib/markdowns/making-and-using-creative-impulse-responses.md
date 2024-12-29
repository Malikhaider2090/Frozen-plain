---
title: Making and using unusual impulse responses
date: 2018-11-20
author: Sam Windell
category: article
description: This article was originally written in May 2014 for subaqueousmusic.
---

This article was originally written in May 2014 for subaqueousmusic.com.

Convolution reverb is an excellent tool for emulating real spaces. Most of the impulse responses on the market are recorded from halls and rooms using sine sweeps and microphones. With [Frostpoint](https://frozenplain.com/product/frostpoint/), I have taken a slightly different approach. In this article I hope to show how it was made and my general experiences with impulse responses (IRs) and convolution reverberation.

##### Noise versus pitch

To roughly categorise, we can group any sound as a noise or as something pitched. This recognition was a good starting point for me when making IRs. A pitched sound has constant resonant frequencies. For example, if you were to play an A4 on your piano and look at the frequency spectrum, you would see a large constant peak at 440Hz. In contrast, if you clapped your hands and looked at the frequencies of that, you would see a whole array of frequencies, with no fundamental.

The reason that this distinction is important to make is because of how convolution reverb plugins work.  A good way of thinking about it is that the input audio is multiplied by the IR. Imagine the impulse was a recording of a piano A4 note, any audio that you play through the convolution effect that is also an A, will multiply up to make a very loud and unpleasant sound.

Therefore in general I knew I was looking for interesting noises, and not pitched sounds.

##### Creating the ‘Natural’ impulses

For a while I had been recording and collecting samples using a Zoom H6, mainly just using its included X-Y stereo mics. Being able to capture sounds on-the-go is incredibly useful. Whilst out and about, I was always looking for interesting noises, such as: machine buzz, creaky wood, water, etc. I recorded as much as I could, and then cut the audio down later. I tried to keep the stereo recordings quite wide (the X-Y mics were set at an angle of 120 degrees apart), as I felt this made for a more atmospheric and ambient sound. Some of the recordings had background noise, but unlike conventional sampling, this can actually sound great when used as an impulse.

These dry recordings were then put into Edison audio editor, which is where most of the shaping of the sound happened. The majority of captured sounds were not actually appropriate for use as an IR, but those not eliminated were treated very simply, as follows:

- High pass at about 50Hz – anything below was just muddy rumble.
- Volume envelopes added to shape the sound over time, sometimes emphasising transients, or just setting the IR length.
- It was then saved as a WAV file and tested.

The image at the top of this page has an orange line as an example of a potential volume envelope.

##### Creating synthesised impulses

As any producer knows, you can spend a lot of time perfecting a beautiful synth patch, tweaking all of the parameters to get it to sound just right. Making impulses is different though. Beautiful synth patches are not what we are after here, instead the focus is on creating noise and movement.

To achieve this I used lots of modulation, lots of white noise, and just about anything I could edit and randomise, I would. I used soft synths for this and for the whole time I would record the output to capture the whole sound design process. Each sound was probably made slightly differently, with different synths and effects. Once you are in the noise making mind-set, you can easily get carried away and have no idea how the sound started.

Using my recordings in granular synths was also something I deployed. The Mangle is a great plugin for granular sound design.

The impulses in the White Noise folder of FrostPoint were made in the same way; however, the original sound source was always noise. Just as I had done with the natural samples, the audio was high passed and shaped with envelopes.

##### Creating Formant Impulses

Formants are an interesting topic; they are essentially the frequency peaks of the human voice. To synthesise vowel sounds, formant filters are often used. However, as mentioned previously, convolution reverbs work by essentially multiplying the audio by the IR, so you can almost use the convolution effect as a filter. I therefore began experimenting with EQing and filtering white noise and using that as an IR. The result was a slightly voicey reverb sound, which was an interesting tone for sound design.

My next idea was to make 'real' formant IRs. I recorded multiple takes of myself making vowel sounds without using my vocal chords, kind of like whispering. I then layered these sounds together and made a 'choir' of ah's, oo's, and ee's. If you use a plugin that has a stretch IR control, you can create some great sounds by pitch shifting these formants.
