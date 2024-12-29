---
title: I'm working on Mirage V3 - CLAP, VST3, infrastructure | Devlog 0
date: 2023-06-06
author: Sam Windell
category: devlog
description: This is my first blog about my work on version 3 of Mirage.
---
This is my first blog about my work on version 3 of Mirage. I intend to regularly post updates on my development progress from now on. Join me as I work through the development process all the way to the beta release, and then the final thing. Hopefully, that will be of interest to some people. I know that it will be a good excuse for me to solidify my thoughts and decision-making.

These posts are written with 2 kinds of readers in mind. Firstly, those who are interested in FrozenPlain products, and want to see what's upcoming. And secondly, programmers who are interested in the technicalities of how I develop Mirage.

This first blog post will just be an overview on what version 3 of Mirage will entail, and about my current stage of development on it. Later blog posts will probably be smaller in scope; delving into specific technical details or design decisions. 

## Recap: what is Mirage?

A description of Mirage can be found on [this page](https://frozenplain.com/mirage). But in short, Mirage is FrozenPlain's sample-based-synthesiser engine. It's an audio plugin that all of our new sample libraries live in. It provides the interface for layering, morphing and controlling sounds from our sample libraries. Mirage is free, but it currently can't play any sounds without a library.

It was first launched with [Wraith](https://frozenplain.com/product/wraith) in 2019. [Version 2](https://frozenplain.com/mirage-v2-is-out-now/) of Mirage was released in November 2021. It was a big update to the GUI; including custom background images for each library. It also added the option to reorder the effects, and new reverb, delay and phaser effects. Like all Mirage updates, it was free.

I am committed to improving and developing Mirage for the foreseeable future.

If this project had a mission statement it might be something like this:

*"Offer a robust, well-integrated and fast tool for creating virtual instruments for digital music production; featuring a comprehensive library collection, and designed to last for many years."* 

## The goals Mirage v3

With that mission statement in mind, I've been working on version 3 of Mirage already for about 6 months. This will not be a flashy update; there are not going to be many new features. Lots of the changes relate to the structural design of Mirage's code.

Here are the specific goals:

1. Improve Mirage's internal structure for a better ability to add new big features in the future:
   - Make provisions for robust backwards-compatibility (and to some extent, forwards-compatibility).
   - Improve the capability for automatic testing of Mirage.
   - Integrate more deeply with the modern plugin formats.
1. Offer VST3 and CLAP versions.
1. Improve the installer application.
1. Improve the simplicity, reliability and speed of loading libraries and presets from your hard drive.

The first point of that list is a big one. Many parts of the code need to be restructured in order to facilitate adding new features in a maintainable manner. Until now, things were written in a way to get a feature added as quickly as possible. But now more thought needs to be put in, otherwise the codebase is going to rapidly become unmaintainable. Had I known what I know now, things would have been done differently, but that's perhaps always part of a long-term software project. 

## New plugin formats: CLAP and VST3

A big driver for doing this update is the need to support the VST3 plugin format. From a developer's perspective, I don't have many nice things to say about VST3. But I'm not going to moan here. Mirage will have a VST3 version because I believe that will be useful to many people.

I do have positive things to say about another plugin format though, [CLAP](https://u-he.com/community/clap/). This will also be supported in the next release. In fact, implementing this format has been a delightful guide for improving Mirage's audio and parameter systems. Sadly CLAP is only supported by a couple of big DAWs at the time of writing this, Reaper and Bitwig. I hope that will change soon.

For the developer, the CLAP format is simple and thoughtfully designed, and implemented in the C programming language. This is a huge benefit to developers. It allows us to efficiently support the format rather than first battle through pages of documentation and countless C++ classes. It's also free and open source, and is not subject to the policies of any particular DAW or plugin manufacturer.

For the end user, I think CLAP offers value too. It's worth quickly clarifying that CLAP offers pretty much all of the features of other plugin formats, such as VST3: parameters, automation, sample-accurate automation, resizable GUI, etc. As well as that, it allows for polyphonic modulation; modulation of parameters per voice, rather than at the whole plugin level. It also offers the ability for potentially more efficient processing using thread pools. And finally, it's good for end-users because it is good for developers. Developers that can write code with more robustness, ease and simplicity and therefore can better serve the needs of their users. 

## My progress so far (developer details)

To set the scene a little: Mirage is developed by just myself at the moment. It's a primarily from-scratch C++ codebase with ~210,000 lines of code, some of which is third-party library code.

### 1. New audio processing architecture

So far on the road to Mirage v3, I have converted Mirage's internal structure from a VST2-like architecture to a CLAP-like architecture. The CLAP API allowed me to restructure things more clearly. In particular, the API is explicit about how different threads are used; this way of thinking allowed me to make some excellent improvements.

Audio processing is now done in a single, unified callback - as is required by modern APIs. I have not yet implemented support for sample-accurate parameter automation, but this might be something I will do.

### 2. A new system for compiling Mirage's source code

I have moved from a CMake build system to a [Zig](https://ziglang.org/) build system. I might do a separate post about this.

### 3. New GUI for the installer application

I have also nearly finished implementing a new GUI for the installer application. Previously I was using the [wxWidgets](https://www.wxwidgets.org/) library, however, this had the following issues:

- It has a very large CMake build system that is incompatible with my new Zig build system.
- It has slow compile times.
- It has a vast API. My use case is small and specific. A custom solution will be smaller and more maintainable, allowing me to improve the user experience and speed up the time it takes to add new features.

My new solution for the installer's GUI is native-looking. In other words, it uses the GUI toolkit that the operating system offers. This allows for a familiar and trustworthy experience for the user. Therefore, the solution I've chosen to take is to design a small API that allows me to write the majority of the code in a platform-independent way, and then implement a back-end for each of the operating systems that I want to support. Namely, using Win32 on Windows, and AppKit on Mac. My platform API relates to the creation and layout of all the widgets of the GUI, and the user's interaction with them.

The particular details of how this GUI system works could be the subject of a more in-depth blog post.

The installer application is also getting an improved user experience. It will be simpler and more intuitive to install Mirage libraries.

### 4. Project-wide refactoring

The last topic of work that I've been doing is harder to quantify: refactoring. Loads of Mirage's systems have been restructured to be more easily expanded upon and maintained. A common theme in this process has been improving multithreading. Also, the way that the GUI can be resized has been restructured, allowing for continuous resizing. 

## Wrapping up

In this blog post, I hope I have established the groundwork upon which I will expand in future posts. This idea of a "devlog" is common in the world of indie game developers on YouTube - I've been inspired to do something similar. I hope to get better at doing these over time. I'd like to dive deep into some technical aspects soon. I will perhaps include videos too.

Thanks for reading. See you in the next one.\[/vc_column_text\]\[/vc_column\]\[/vc_row\]
