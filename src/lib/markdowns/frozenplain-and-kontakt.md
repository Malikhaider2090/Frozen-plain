---
title: FrozenPlain and Kontakt
date: 2018-11-20
author: Sam Windell
category: news
featured_image: /images/blog/terracotta-screen-photo.webp
description: 
---

##### Kontakt Libraries

Initially I made sample libraries using Native Instruments' Kontakt. Kontakt is a sampler that gives a surprising amount of control to third party developers like myself. It has the standard sampler features such as mapping samples across the keyboard and across different velocities, but also Kontakt has a comprehensive scripting language that allows you to write code to implement new behaviours and create a custom GUI. This framework provided by Kontakt gives a huge advantage to releasing great products quickly and effectively. Kontakt handles the nitty-gritty details of making sample-based instruments, so you can focus on the higher level design. That being said, there are some drawbacks:

*   Lack of control. The Kontakt engine can't do everything, there are countless things that you might want to do when making something new and creative that Kontakt simply doesn't support and there is no option around this.
*   Accessibility. If I develop an instrument in Kontakt it means the user also has to own Kontakt. If I remove that requirement anyone who can load a VST or AU can use my products fully. There are licences that developers can get from Native Instruments to remove this requirement, but they are mostly inaccessible to companies in my position. Releasing products in my own format has another advantage, in that I am not tied up with Native Instruments's decisions. In 10 years I still have the resources to distribute my products, while I cannot guarantee that Kontakt will be available then.
*   My future plans. Investing in making plugins and sample libraries from scratch gives me experience with making things starting from a fundamental level. This is a powerful toolset to create truly unique and boundary pushing products in the future.

This being said, Kontakt is a great tool that I use nearly daily. It is important to me that any sample-based instrument that I create in the future is not a step down from this standard.

##### Plugins (VST/AU)

Taking the points above into consideration, my efforts have now been directed towards creating my own plugins using just C++ and a handful of code libraries. Thankfully I really enjoy software development, because what was in store was nearly 2 years of learning. For the path that I chose to take, these were some of the new development challenges to me: GUI system programming, DSP programming, learning the VST and AU APIs, creating the build system to compile the program in all it's different configurations, learning operating system APIs like Win32 and Cocoa, creating installers for Windows and Mac, testing the plugin in multiple DAWs, and the general challenges of low level performance and reliability. My first plugin not using Kontakt was Obelisk, a simple but handy MIDI harmoniser plugin. It's designed to be used as a way to discover new harmonies and create chord progressions, and has seemed to be useful to many people. It is likely that this will be something that I will revisit in the future.

