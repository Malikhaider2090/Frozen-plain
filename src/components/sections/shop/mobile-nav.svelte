<script lang="ts" >
    import { clickOutside } from '../../../../src/action/clickoutside';
    export let open = false;

    function toggleNav() {
        open = !open;
    }
</script>

{#if open}
    <div
        class="flex flex-col gap-6 bg-foreground w-full md:w-[25%]"
        use:clickOutside
        on:clickoutside={toggleNav}
    >
        <div class="flex flex-col gap-2 bg-foreground">
            <button on:click={toggleNav} class=" flex flex-row justify-center items-center gap-4 text-card text-lg font-semibold pt-6 py-3"><img src="/icons/cross.svg" alt="">CLOSE SIDEBAR</button>
            <hr class="1.5p-1.5-px h-px items-center mx-4 border-0 bg-section" />
            <button
                class="font-semibold font-inter text-sm flex items-start gap-3 text-card bg-foreground py-2 px-4 rounded-xl"
            >
                FILTER BY CONTENT
            </button>

            <div class="p-3 flex flex-col gap-3 w-full text-sm font-light">
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Found Sounds</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >13</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Keys</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >2</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Pods</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >23</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Sounds Effects</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >3</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Soundscapes</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >2</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Strings</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >4</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Textures</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >28</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Tonal Precussion</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >9</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Underscore</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >7</span
                    >
                </div>
            </div>
        </div>
        <hr class="1.5p-1.5-px h-px items-center mx-4 border-0 bg-section" />
        <div class="flex flex-col gap-2 bg-foreground">
            <button
                class="font-semibold font-inter text-sm flex items-start gap-3 text-card bg-foreground py-4 px-6 rounded-xl"
            >
                FILTER BY STYLE
            </button>

            <div class="p-3 flex flex-col gap-3 w-full text-sm font-light">
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Ambient</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >23</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Cinematic</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >22</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Cross-genre</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >4</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Dark</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >4</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Horror</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >4</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Realistic</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >8</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Thriller</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >3</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Unusual</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >22</span
                    >
                </div>
            </div>
        </div>
        <hr class="1.5p-1.5-px h-px items-center mx-4 border-0 bg-section" />
        <div class="flex flex-col gap-2 bg-foreground">
            <button
                class="font-semibold font-inter text-sm flex items-start gap-3 text-card bg-foreground py-4 px-6 rounded-xl"
            >
                FILTER BY FORMAT
            </button>

            <div class="p-3 flex flex-col gap-3 w-full text-sm font-light">
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Audio Plugin (VST/AU)</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >2</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">IR Pack</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >2</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Kontakt Instrument</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >9</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Mirage Library (VST/AU)</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >23</span
                    >
                </div>
                <div class="flex flex-row justify-between items-center bg-foreground rounded-xl">
                    <span class="p-2 text-card">Mirage Library Bundle</span>
                    <span
                        class="p-1.5 px-2 rounded-xl text-card bg-foreground border-2 border-section text-xxs font-light"
                        >2</span
                    >
                </div>
            </div>
        </div>
    </div>
{/if}
