---
title: Level meters and folder settings | Devlog 1
date: 2023-06-22
author: Sam Windell
category: devlog
description: Welcome to my second devlog on the journey towards version 3 of Mirage.
---
Welcome to my second devlog on the journey towards version 3 of Mirage. My [previous devlog](https://frozenplain.com/im-working-on-a-new-version-of-mirage-devlog-0/) contained details about what my goals are for this update, and what I've done so far. In this post, I'm going to show you some of the features I've added to Mirage since last time. Please note that at the time of writing this these changes are not publicly released.

______________________________________________________________________

## Improved audio level meters

I've improved the responsiveness and accuracy of the audio level meters in Mirage. Here are the key areas of improvement:

1. It's now easier to see how each layer is contributing to the total audio output; abrupt changes in volume are now accurately displayed. Additionally, the level that is shown is now more reflective of what your ear perceives.
1. It's easier to detect when clipping is occurring; the meters now represent the peak of the audio signal, instead of a moving average. Therefore, you can more reliably see when the audio is too loud and distorts.
1. It's easier to normalise the volume level across different presets; the level meter has clearer markings and has better coloured volume-level bands.

______________________________________________________________________

## Improved settings for library and preset folders

I've made it easier to manually install libraries, and move libraries from one hard-drive to another. Here are the changes:

1. There's a new settings menu that shows all of the folder settings in one place. It's inspired by [Bitwig's settings menu](https://assets.bitwig.net/media/bitwig_userguide/11/images/00intro/10%20-%20DASHBOARD%20SETTINGS%20TAB%20AUDIO%20-%20v2.4.png?v=6SLyQ4UxPM), which I find to be quite clear.
1. Mirage now keeps track of a folder which it will automatically scan for libraries. You no longer need to add libraries one-by-one. It's backwards compatible with the old system; if you have libraries outside of this new scan-folder, then they will appear in the Additional Libraries section.

As well as this, I've been working on improvements related to library & preset loading. For example, the GUI will stay responsive as it loads or scan libraries & presets.

### Technical Details

#### Audio Level Meters

Previously, Mirage's level meters used a moving average. With some tweaking of the averaging window size, this technique can result in a level meter that does a reasonable job of matching what the ear hears, particularly for sustained sounds. However, the averaging effect masks peaks in the audio signal (the transients). It's displaying a low-pass filtered version of the signal.

An important use of an audio level meter is to display when the audio signal is clipping. Depending on the timbre of the sound, it can be hard to detect with your ear when clipping is occurring. However, a level meter can flash red - making it unmistakable.

The solution then is to track the *peaks* of an audio signal, rather than its average. For this to be visually-pleasing the audio meter should still have some sort of smoothing, but without altering the peaks. This takes the form of a "falldown" characteristic.

First, we assign a variable to represent the level of the signal. Next, we scan through the audio. If any point is louder than our current level, we immediately set our level to that new high. If not, we decrement our level by a small amount (probably calculated based on a desired falldown time - I use 500 ms).

The result is a level meter that jumps up when there are peaks - giving us important information about clipping, but smoothly slides back down when the audio signal lessens.

For the GUI representation you'll want to convert the level to decibels using the handy function `db = 20 * log10(amp)`, and then show this decibel level within a range of your choosing. I have found that 6dB to -60dB is reasonable.

## Wrapping up

These 2 changes are what you might call "polish". I think polish is an important thing to do; lots of well thought-out aspects add up to a great overall experience. Therefore, this type of work is another key aspect of version 3 of Mirage (along with: improve the installer, add VST3 & CLAP formats, and remove hurdles to development). Thanks for reading.
