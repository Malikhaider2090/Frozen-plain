<script lang="ts">
    export let data;

    $: ({ files } = data);

    function humanFileSize(size: number = 0) {
        var i = size == 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024));
        return (size / Math.pow(1024, i)).toFixed(2) + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
    }
</script>

<h2 class="text-h2 text-card font-bold">FrozenPlain Files</h2>

<table class="w-full mt-8">
    <thead>
        <tr>
            <th>Filename</th>
            <th>File size</th>
        </tr>
    </thead>
    <tbody>
        {#if files}
            {#each files as { id, size }}
                <tr>
                    <td>{id}</td>
                    <td>{humanFileSize(size)}</td>
                </tr>
            {/each}
        {/if}
    </tbody>
</table>

<style lang="postcss">
    table {
        @apply bg-foreground border-4 border-card-5;
    }
    th {
        @apply text-start text-card font-semibold bg-section;
    }
    td,
    th {
        @apply py-3 px-3;
    }

    td {
        @apply border-2 border-card-5 text-start align-text-top text-card;
    }

    tbody tr:first-child td {
        @apply !border-t-0;
    }

    tr td:first-child {
        @apply border-l-0;
    }
    tr td:last-child {
        @apply border-r-0;
    }

    tr:last-child td:last-child {
        @apply rounded-br-lg;
    }
    tr:last-child td:first-child {
        @apply rounded-bl-lg;
    }

    tr:last-child td {
        @apply border-b-0;
    }

    .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    .inputfile + label {
        color: white;
        background-color: black;
        display: flex;
        align-items: center;
        gap: 8px;
        width: max-content;
        cursor: pointer;
        padding: 4px 10px;
        border-radius: 4px;
    }

    .inputfile:focus + label,
    .inputfile + label:hover {
        background-color: rgb(var(--blue-dark));
    }

    .inputfile:focus + label {
        outline: 1px dotted #000;
        outline: -webkit-focus-ring-color auto 5px;
    }

    .inputfile + label * {
        pointer-events: none;
    }
</style>
