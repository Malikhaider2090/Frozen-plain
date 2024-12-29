<script lang="ts">
    import { toastMsg } from '$lib/store';
    import Page from '../../../../../../components/admin/page.svelte';
    import Toast from '../../../../../../components/shared/toast.svelte';

    export let form;
    export let data;

    $: ({product, selectedFiles: _selectedFiles, files} = data)

    $: if (form) {
        if (form.success) {
            toastMsg.set({
                msg: 'Product edited successfully...',
                icon: 'Success',
                desc: ''
            });
        } else {
            toastMsg.set({
                msg: form.msg!,
                icon: 'Warning',
                desc: ''
            });
        }
    }
    
</script>

<h2 class="text-h2 text-card font-bold">Add/Edit a Product</h2>

<Toast left="right-8" top="top-20" />
<Page pageTitle="Edit Product" bind:product bind:_selectedFiles bind:files />
