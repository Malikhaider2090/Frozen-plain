---
title: Making Progress | Devlog 3
date: 2023-11-10
author: Sam Windell
category: devlog
description: Hi, welcome to another devlog.
---
Hi, welcome to another [devlog](https://frozenplain.com/category/devlog/) for Mirage v3, the next iteration of FrozenPlain's sampler plugin. The goal of version 3 is threefold: (1) set up the project so it is maintainable for years to come, (2) lay the groundwork for big new features, and finally, (3) offer VST3 and CLAP versions of the plugin. This update will be free.

In this post, I'm going to share some of the things that I've been working on since the last post. I'm also going to outline a couple of upcoming ideas. Feel free to leave a comment if you have any feedback on these.

______________________________________________________________________

## Settings

How Mirage deals with settings has been reworked again. Some of these changes were outlined in the [last post](https://frozenplain.com/level-meters-and-folder-settings-devlog-1/), but there's been some further developments. Mirage now allows you to have multiple folders where you store presets and libraries. These folders are then automatically scanned. It's a familiar and powerful idea that you've probably already come across in your DAW's settings; for example, you can often add multiple folders to scan for VST plugins.

As well as this, all the other settings in Mirage have been consolidated into a single 'settings' panel. It's easier to find what you are looking for now.

______________________________________________________________________

## Restructuring

As always, I've been working on restructuring the code so that Mirage can be more easily maintained. This has been taking up the vast bulk of my time. I'm pleased to say however that it's paying off - I feel confident that the areas that I have redesigned are indeed more maintainable. There's still a lot to do though.

For me, 'more maintainable' encompasses many things that I think will ultimately benefit the user of Mirage:

1. An improved ability to automatically test the code will reduce the chance of bugs.
1. Better-designed code allows me to add more features and improve performance.
1. It also makes it easier for other developers to contribute to Mirage. Having multiple developers working on it will increase the rate of new features.

Now however, rather than solely working on restructuring, I'd like to focus more on releasing some public betas. Restructuring can be done alongside these public releases. I think that having a VST3/CLAP version of Mirage work will be valuable to some people so I want to get it available soon.

______________________________________________________________________

## Ideas for the installer

I'd like rework the installation process of Mirage. These are some 'pain points' in the current process:

- The requirement for being connected to the internet: sometimes your studio PC isn't internet connected.
- The need to enter an email+password or a download-ticket: it's hassle.
- The lack of option for doing a manual installation: if you know what you're doing, sometimes you just want a VST file and be done with it.

I think fixing these will allow people to more quickly and easily *use the product to make music* - and that's my goal. Here's my proposed solution:

- Mirage will be installed separately from its libraries.
- There will be a freely accessible webpage that has download links for the Mirage installer. And additionally, download links for manual-installation files.
- The installer will ask you what formats you want (VST3, CLAP, AU, etc) and then install them. It won't do anything else, (no downloading, no login, no configuration).
- When you buy a Mirage product, you will get a download link for the library you that you bought (a zip file containing the library and presets). You will be directed to install Mirage and open it up. You can then 'drag and drop' the zip file onto Mirage to install it.
- The Mirage plugin will have a few new features to compliment this new installation process:
  - The settings will be improved to make it easy to customise Mirage's folders.
  - There will be a 'check for updates' button: clicking it will check if you have the latest version and direct you to the download webpage, if needed.
  - It will support 'drag and drop' for installing libraries.
  - It will be entirely self-contained, it won't require a separate installer application to set it up.
- This will all be paired with a better set of Knowledge Base pages.

### Changelog (Technical Details)

- Created a new file format for saving plugin state. Mirage used to save it's state as JSON. It still supports reading JSON but now it also has a new binary state format. It's a simple format that is incredibly fast to read/write and is designed to be easily extended and have easy backwards compatibility. The JSON format doesn't have that advantage, and introduces quite a bit of unnecessary complexity with it's requirement for converting binary to text (and the resulting floating-point precision loss). The new format is also roughly 10x smaller.
- Created a new file format for saving Mirage's settings. Mirage used to save it's settings as JSON. The settings file should be viewable with a text editor and so a text format is necessary. It also should be both forwards and backwards compatible. If you happen to load up an older version of Mirage it shouldn't erase settings that are needed by a newer version. A new, simple, INI-like format does the trick for these requirements. Trying to meet these requirements with the old JSON system is more complicated than needed.
- Removed lots of global state for better testiblity and encapsulation.
- Refactored the async asset loading system, making it much simpler and easier to maintain and extend. This system is a fiddly one with some strict requirements. Essentially it is used to asynchronously load libraries, instruments and audio files.
- Refactored the presets and state systems.
- Reorganised the folder and build structure of the project. The file structure of the code repository impacts the perceived interaction of different parts of the codebase. It allows for a clearer understanding of the modules that make up the whole.

## Wrapping up

Thanks for reading. I hope to be able to share with you a beta version featuring CLAP and VST3 formats soon. See you in the next one.\[/vc_column_text\]\[/vc_column\]\[/vc_row\]
