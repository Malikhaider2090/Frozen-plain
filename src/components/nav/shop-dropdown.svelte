<script>
    import { quintOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';

    let miragelib = [
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated2.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost2.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated2.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost3.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated3.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost3.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated4.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated4.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost2.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost.svg',
            link: ''
        }
    ];
    let kontaktins = [
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated2.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost2.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated2.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost3.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated3.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost3.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated4.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost.svg',
            link: ''
        }
    ];
    let miragelibbundle = [
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated.svg',
            link: ''
        },
        {
            name: 'Lost Reveries',
            icon: '/icons/dropdownicons/lost.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated2.svg',
            link: ''
        }
    ];
    let plugin = [
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated2.svg',
            link: ''
        },
        {
            name: 'Isolated Signals',
            icon: '/icons/dropdownicons/isolated.svg',
            link: ''
        }
    ];
</script>

<div
    transition:slide={{
        delay: 250,
        duration: 300,
        easing: quintOut,
        axis: 'y'
    }}
    class="p-6 grid grid-cols-3 z-50 gap-20 w-[760px] h-fit border-2 border-card/5 rounded-lg bg-black"
>
    <div class="grid grid-cols-1 gap-1 items-start content-start">
        <h1 class=" font-futura font-normal text-card text-shopcard p-3">
            Mirage libraries (vst/au)
        </h1>
        {#each miragelib as item}
            <a
                class="flex flex-row items-center gap-2 text-card/80 hover:text-card hover:bg-primary-blue rounded-lg py-1 pl-2"
                href={item.link}
            >
                <img src={item.icon} alt="" />
                {item.name}
            </a>
        {/each}
    </div>
    <div class="grid grid-cols-1 gap-1 content-start">
        <h1 class="text-card font-futura font-normal text-shopcard p-3">KONTAKT INSTRUMENTS</h1>
        {#each kontaktins as item}
            <a
                class="flex flex-row items-center gap-2 text-card/80 hover:text-card hover:bg-primary-blue rounded-lg py-1 pl-2"
                href={item.link}
            >
                <img src={item.icon} alt="" />
                {item.name}
            </a>
        {/each}
    </div>
    <div class="grid grid-cols-1 gap-1 content-start">
        <h1
            class="text-card font-futura font-normal text-shopcard p-3 w-full overflow-hidden text-ellipsis"
        >
            MIRAGE LIBRARY BUNDLES (VST/AU)
        </h1>
        {#each miragelibbundle as item}
            <a
                class="flex flex-row items-center gap-2 text-card/80 hover:text-card hover:bg-primary-blue rounded-lg py-1 pl-2"
                href={item.link}
            >
                <img src={item.icon} alt="" />
                {item.name}
            </a>
        {/each}
        <h1
            class="text-card font-futura font-normal text-shopcard p-3 w-full overflow-hidden text-ellipsis"
        >
            Plugin (vst/au)
        </h1>
        {#each plugin as item}
            <a
                class="flex flex-row items-center gap-2 text-card/80 hover:text-card hover:bg-primary-blue rounded-lg py-1 pl-2"
                href={item.link}
            >
                <img src={item.icon} alt="" />
                {item.name}
            </a>
        {/each}
    </div>
</div>
