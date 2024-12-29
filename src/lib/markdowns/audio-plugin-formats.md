---
title: Audio Plugin Formats
date: 2021-03-13
author: Sam Windell
category: article
description: In this article, I'm going to cover some general information regarding what the different popular audio plugins formats are.
---
In this article, I'm going to cover some general information regarding what the different popular audio plugins formats are. After reading this you'll have more of a grip of what a developer means when they say their plugin is a VST/AU. What exactly is a VST? And what is an Audio Unit? I wrote this article a while back but I'd like to move to this blog section, so here it is!

## VST or Audio Plugin?

The term VST is often used as a general term for any plugin type of plugin. In fact, the VST format is a specific format designed by Steinberg. For the general case, we can instead simply use the term audio plugin. The main types of audio plugin relevant to most users are as follows: VST2, VST3, AU and AAX. Audio plugins are typically run in a Digital Audio Workstation (DAW), which is the host software. There are many DAWs on the market, a few examples of which are: Cubase, Ableton Live, Studio One, Logic, FL Studio, Garage Band, Reaper.

### VST2

Available for Windows and Mac.

VST2 (virtual studio technology) is the most widely used audio plugin format and has been in use for many years. On Windows, it is the standard format used by hosts, and you can be pretty certain that your Windows DAW will support it. The VST format is also designed for Mac though it is slightly less widespread. On Windows the VST2 format is in the form of a .dll file, and on Mac is the .vst file. For a list of DAWs that support VST2 please see the [wikipedia page](https://en.wikipedia.org/wiki/Virtual_Studio_Technology#VST_hosts). A few examples of popular DAWs that do *not* support VST2 are Logic, Garage Band and Pro Tools.

### VST3

Available for Windows and Mac.

VST3 (virtual studio technology 3) is the most recent format designed by Steinberg. It is an entirely new format – different from the VST2 format. It is designed with a few features that are useful particularly for feature-heavy plugins. Despite being a new and slightly more powerful format to VST2 it is not widely supported yet.

### AU

Available on Mac only.

AU (audio unit) is a format designed by Apple. It is roughly comparable to the VST2 format though is not compatible with it. The AU format comes in the .component file format. AU is only for Mac and is then only format supported by by Apple’s DAWs Logic and Garage Band.

### AAX

Available on Windows and Mac.

AAX (avid audio extension) is the new format for use in Pro Tools. Pro Tools is very well established host used throughout the music production, mixing and mastering industry. This type of format is unique to Pro Tools, but is still worth mentioning due to Pro Tools’s prevalence in those areas of audio production.

### Standalone

Some developers also offer a standalone version of their products. As the name suggests this is not actually a plugin. It is just a version of audio plugin that can be launched like you would a normal desktop application. It does not require a DAW in order to work. This is a convenient way for users to use the plugin and is sometimes helpful for live performances.

### 32 bit plugins versus 64 bit plugins

32 bit or 64 bit are types of computer architecture, with 64 bit being much more common in modern computers (the wider addressing width of 64 bit architectures is generally advantageous in modern computing). When a plugin is described as one of these, it simply means it is built for that particular architecture. The complications come from the fact that some DAWs that run on 64 bit systems can host both 32 bit and 64 bit plugins. This is not always the case and therefore it is important to ensure that you have a host that is capable of hosting the plugin, otherwise it will not work. Finding the architecture of your DAW and operating system is found in different ways, but a quick google search will quickly point you to the right place to look.
