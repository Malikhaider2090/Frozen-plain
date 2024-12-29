<script lang="ts">
    import PaginationButton from './pagination-button.svelte';

    $: pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    let pageNumber: number = 1;
    let input: any;

    const getPages = (currentPage: number, pages: number[]) => {
        if (pages.length > 5) {
            const length = pages.length;
            if (currentPage < pages[length - 2]) {
                return [
                    pages[0],
                    currentPage === 1 ? pages[1] : pages.indexOf(currentPage + 1),
                    '...',
                    pages[length - 2],
                    pages[length - 1]
                ];
            } else if (currentPage === pages[length - 1]) {
                return [
                    pages[0],
                    pages.indexOf(currentPage - 1),
                    '...',
                    pages[length - 2],
                    pages[length - 1]
                ];
            } else {
                return [
                    pages[0],
                    pages.indexOf(currentPage),
                    '...',
                    pages[length - 2],
                    pages[length - 1]
                ];
            }
        } else {
            return [...pages];
        }
    };

    const handlePage = (event: any) => {
        let tempData = event.detail.data;

        if (tempData === 'left') {
            currentPage = currentPage - 1;
            pageNumber = currentPage;
        } else if (tempData === 'right') {
            currentPage = currentPage + 1;
            pageNumber = currentPage;
        } else if (tempData === '...') {
            return;
        } else {
            currentPage = Number.parseInt(tempData);
            pageNumber = currentPage;
        }
    };

    const handleChange = () => {
        if (pages.includes(pageNumber)) {
            currentPage = pageNumber;
        } else {
            pageNumber = currentPage;
        }
    };

    const handleKeyPress = (event: any) => {
        if (event.key === 'Enter') {
            handleChange();
            input.blur();
        }
    };

    $: currentPage = 1;

    let width: number;
</script>

<svelte:window bind:innerWidth={width} />

<div class="flex justify-center items-center gap-2 my-4">
    <PaginationButton
        title=""
        classes={''}
        icon={'left'}
        disabled={currentPage === pages[0]}
        on:message={handlePage}
    />
    {#if width >= 640}
        {#each getPages(currentPage, pages) as page}
            <PaginationButton
                title={page.toString()}
                classes={'text-card'}
                active={page === currentPage}
                on:message={handlePage}
            />
        {/each}
    {:else}
        <input
            type="number"
            class="bg-background text-sm rounded-md py-2 px-3 border border-border text-card text-center max-w-[60px] h-10"
            bind:value={pageNumber}
            on:change={handleChange}
            on:keyup={handleKeyPress}
            bind:this={input}
        />
    {/if}
    <PaginationButton
        title=""
        classes={''}
        icon={'right'}
        disabled={currentPage === pages[pages.length - 1]}
        on:message={handlePage}
    />
</div>

<style lang="postcss">
    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type='number'] {
        -moz-appearance: textfield;
    }
</style>
