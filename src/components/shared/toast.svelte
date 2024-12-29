<script lang="ts">
    import { fade, fly } from 'svelte/transition';
    import { toastMsg } from '$lib/store';
    import Icon from './icon.svelte';

    export let top: string = 'top-0';
    export let left: string = 'left-0';
    export let right: string = 'right-0';
    export let classes: string = '';

    $: {
        if ($toastMsg.msg != '') {
            setTimeout(() => {

                toastMsg.set({
                    msg: '',
                    icon: 'Success',
                    desc: ''
                });
            }, 10000);
        }
    }

    const hideToast = () => {
        toastMsg.set({
            msg: '',
            icon: 'Success',
            desc: ''
        });
    };

    $: borderColor =
        $toastMsg.icon === 'Success' ? 'border-primary-green' : 'border-primary-yellow';
    $: iconBg = $toastMsg.icon === 'Success' ? 'bg-green-bg-surface' : 'bg-yellow-bg-surface';
    $: iconColor = $toastMsg.icon === 'Success' ? 'fill-primary-green' : 'fill-primary-yellow';
</script>

{#if $toastMsg.msg !== ''}
    <button
        on:click={hideToast}
        in:fly={{ x: 200, duration: 500 }}
        out:fade
        class={`flex flex-col w-max max-w-xs gap-2 font-inter bg-foreground z-50 fixed top-16 py-2 px-3 pl-5 rounded-lg border-l-8 ${borderColor} ${top} ${left} ${right} ${classes}`}
    >
        <div class="flex gap-2 items-center">
            <div class="{iconBg} rounded-sm p-0.5">
                <Icon name={$toastMsg.icon} width="16" height="16" class={iconColor} />
            </div>

            <p class="text-card font-normal whitespace-pre-wrap text-xs">{$toastMsg.msg}</p>
        </div>
        <p class="text-card/80 font-light whitespace-pre-wrap text-xs text-left">
            {$toastMsg.desc}
        </p>
    </button>
{/if}
