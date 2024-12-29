<script lang="ts">
    import Page from '../../../../../components/admin/page.svelte';
    import Toast from '../../../../../components/shared/toast.svelte';
    import { toastMsg } from '$lib/store';

    export let form;
    export let data;

    $: if (form) {
        if (form.success) {
            toastMsg.set({
                msg: 'Product created successfully...',
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

    $: ({ files } = data);
</script>

<h2 class="text-h2 text-card font-bold">Add/Edit a Product</h2>

<Toast left="right-8" top="top-20" />
<Page pageTitle="Add Product" bind:files />
