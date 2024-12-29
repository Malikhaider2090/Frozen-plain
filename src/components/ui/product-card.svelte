<script>
    import Button from '../shared/button.svelte';
    export let imagesrc = '';
    export let title = '';
    export let description = '';
    export let price = '';
</script>

<div class="flex flex-col bg-foreground border-2 border-section rounded-lg">
    <img class="w-full" src="/icons/{imagesrc}.svg" alt="" />
    <div class="m-3 mt-4 flex flex-col justify-start gap-2">
        <div class="flex flex-row gap-2">
            <div class="pt-1">
                <img class="w-5" src="/icons/{imagesrc}.svg" alt="" />
            </div>
            <div class="flex flex-col gap-4">
                <a href="/product" class="font-normal font-futura text-h5 text-card">{title}</a>
                <p class="font-normal font-futura text-h5 text-card">{description}</p>
                <div class="flex flex-row gap-1 mt-1">
                    <img class="w-4" src="/icons/star.svg" alt="" />
                    <img class="w-4" src="/icons/star.svg" alt="" />
                    <img class="w-4" src="/icons/star.svg" alt="" />
                    <img class="w-4" src="/icons/star.svg" alt="" />
                </div>
                <p class="font-normal font-futura text-h4 text-card">${price}</p>
            </div>
        </div>

        <!-- <Button icon="cart" title="ADD TO CART" /> -->
    </div>
</div>
