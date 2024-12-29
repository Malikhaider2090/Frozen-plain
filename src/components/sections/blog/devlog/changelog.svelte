<section class="p-12 bg-foreground border-2 text-card border-card/5 rounded-lg">
    <h1 class="justify-self-start font-inter font-semibold text-h_3">Changelog (Technical Details)</h1>
    <p class="mt-8 flex flex-row items-start gap-4">
        <img class="w-2 h-2 mt-2" src="/icons/dot.svg" alt="" />
        Created a new file format for saving plugin state. Mirage used to save it’s state as JSON. It
        still supports reading JSON but now it also has a new binary state format. It’s a simple format
        that is incredibly fast to read/write and is designed to be easily extended and have easy backwards
        compatibility. The JSON format doesn’t have that advantage, and introduces quite a bit of unnecessary
        complexity with it’s requirement for converting binary to text (and the resulting floating-point
        precision loss). The new format is also roughly 10x smaller.
    </p>
    <p class="mt-4 flex flex-row items-start gap-4">
        <img class="w-2 h-2 mt-2" src="/icons/dot.svg" alt="" />
        Created a new file format for saving Mirage’s settings. Mirage used to save it’s settings as
        JSON. The settings file should be viewable with a text editor and so a text format is necessary.
        It also should be both forwards and backwards compatible. If you happen to load up an older version
        of Mirage it shouldn’t erase settings that are needed by a newer version. A new, simple, INI-like
        format does the trick for these requirements. Trying to meet these requirements with the old
        JSON system is more complicated than needed.
    </p>
    <p class="mt-4 flex flex-row items-start gap-4">
        <img class="w-2 h-2 mt-2" src="/icons/dot.svg" alt="" />
        Removed lots of global state for better testiblity and encapsulation.
    </p>
    <p class="mt-4 flex flex-row items-start gap-4">
        <img class="w-2 h-2 mt-2" src="/icons/dot.svg" alt="" />
        Refactored the async asset loading system, making it much simpler and easier to maintain and
        extend. This system is a fiddly one with some strict requirements. Essentially it is used to
        asynchronously load libraries, instruments and audio files.
    </p>
    <p class="mt-4 flex flex-row items-start gap-4">
        <img class="w-2 h-2 mt-2" src="/icons/dot.svg" alt="" />
        Refactored the presets and state systems.
    </p>
    <p class="mt-4 flex flex-row items-start gap-4">
        <img class="w-2 h-2 mt-2" src="/icons/dot.svg" alt="" />
        Reorganised the folder and build structure of the project. The file structure of the code repository
        impacts the perceived interaction of different parts of the codebase. It allows for a clearer
        understanding of the modules that make up the whole.
    </p>
</section>
