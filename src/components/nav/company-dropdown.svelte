<script>
    import { quintOut } from 'svelte/easing';
    import { slide } from 'svelte/transition';

    let company = [
        {
            name: 'About',
            link: ''
        },
        {
            name: 'NewsLetter',
            link: ''
        },
        {
            name: 'RefundPolicy',
            link: ''
        },
        {
            name: 'Term & Conditions',
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
    class="p-6 grid grid-cols-1 z-50 gap-20 w-60 h-fit border-2 border-card/5 rounded-lg bg-black"
>
    <div class="grid grid-cols-1">
        {#each company as item}
            <a
                class="flex flex-row gap-2 text-card/80 hover:text-card hover:bg-primary-blue rounded-lg py-1 pl-2"
                href={item.link}
            >
                {item.name}
            </a>
        {/each}
    </div>
</div>
