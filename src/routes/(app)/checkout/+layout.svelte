<script>
</script>

<section class="min-h-screen grid place-content-center bg-background min-w-full">
    <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="w-full p-6 bg-section md:rounded-s-lg">
            <div class="mb-4 md:mb-7 flex flex-row justify-between items-center">
                <p class="mb-4 md:mb-9 text-h_6 text-card font-inter font-semibold">
                    Order summary
                </p>
                <img src="/icons/cross.svg" class="w-4 stroke-card/50 md:hidden" alt="" />
            </div>
            <div class="mb-4 md:mb-8">
                <span class="text-h_3 text-primary-green font-inter font-semibold">US$58.20</span>
                <span class="text-sm text-card font-inter font-light">inc.VAT</span>
            </div>

            <div class="flex flex-col md:flex-row items-start justify-stretch md:gap-2">
                <img src="/images/bimage1.svg" class="w-[78px] md:w-[120px] mb-4 md:mb-0" alt="" />
                <div class="w-full">
                    <p class="pb-4 md:pb-20 text-sm text-card font-inter font-light">
                        Slow: Mirage
                    </p>
                    <div class="mb-2 md:mb-6 border-b-2 border-card-15/5 w-full"></div>
                    <div class="flex flex-col gap-4 md:gap-10 mb-6">
                        <div class="flex flex-row justify-between">
                            <span class="text-sm text-card font-inter font-light">Subtotal</span>
                            <span class="text-sm text-card font-inter font-light">US$58.20</span>
                        </div>
                        <div class="flex flex-row justify-between">
                            <span class="text-sm text-card font-inter font-light">VAT</span>
                            <span class="text-sm text-card font-inter font-light">US$0.00</span>
                        </div>
                    </div>
                    <div class="mb-2 md:mb-6 border-b-2 border-card-15/5 w-full"></div>
                    <div class="flex flex-row justify-between">
                        <span class="text-sm text-card font-inter font-light">Due today</span>
                        <span class="text-sm text-card font-inter font-light">US$58.20</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-skin p-6 md:rounded-e-lg">
            <slot />
        </div>
    </div>
</section>
