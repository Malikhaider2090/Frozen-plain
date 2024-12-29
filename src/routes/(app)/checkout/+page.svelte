<div class="mb-4 md:mb-7 flex flex-row justify-between items-center">
    <div class="">
        <span class="text-h_6 text-card/50 font-inter font-semibold">Your detail </span>
        <span class="text-h_6 text-card/50 font-inter font-semibold"> &gt; </span>
        <span class="text-h_6 text-card font-inter font-semibold">Payment</span>
    </div>
    <svg
        width="16"
        height="16"
        viewBox="0 0 22 22"
        class="fill-card cursor-pointer hover:fill-card/50 fill-current hidden md:block"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M21.0613 18.9387C21.343 19.2205 21.5014 19.6027 21.5014 20.0012C21.5014 20.3997 21.343 20.7819 21.0613 21.0637C20.7795 21.3455 20.3973 21.5038 19.9988 21.5038C19.6002 21.5038 19.218 21.3455 18.9363 21.0637L11 13.125L3.06126 21.0612C2.77946 21.343 2.39727 21.5013 1.99876 21.5013C1.60024 21.5013 1.21805 21.343 0.936257 21.0612C0.654464 20.7794 0.496155 20.3972 0.496155 19.9987C0.496155 19.6002 0.654464 19.218 0.936257 18.9362L8.87501 11L0.938756 3.06122C0.656964 2.77943 0.498655 2.39724 0.498655 1.99872C0.498655 1.60021 0.656964 1.21802 0.938756 0.936225C1.22055 0.654432 1.60274 0.496123 2.00126 0.496123C2.39977 0.496123 2.78196 0.654432 3.06376 0.936225L11 8.87498L18.9388 0.934975C19.2205 0.653182 19.6027 0.494873 20.0013 0.494873C20.3998 0.494873 20.782 0.653182 21.0638 0.934975C21.3455 1.21677 21.5039 1.59896 21.5039 1.99747C21.5039 2.39599 21.3455 2.77818 21.0638 3.05998L13.125 11L21.0613 18.9387Z"
        />
    </svg>
</div>
<div class="grid gap-4 md:gap-5 mb-8 md:mb-36">
    <button class="w-full p-3 bg-card flex justify-center rounded-lg">
        <img class="w-24" src="/icons/paypal.svg" alt="" />
    </button>
    <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
        <div class="border-b-2 border-card-15/5 w-full md:w-32"></div>
        <div class="text-card">Or pay by card</div>
        <div class="border-b-2 border-card-15/5 w-full md:w-32"></div>
    </div>
    <div class="grid gap-2">
        <label class="text-sm text-card font-inter font-light" for="card">Card Number</label>
        <div class="relative">
            <input
                type="number"
                name=""
                class="p-4 bg-section w-full rounded-lg"
                placeholder="XXXX XXXX XXXX XXXX"
                id="card"
                required
            />
            <img
                src="/icons/creditcard.svg"
                class="absolute stroke-card right-4 top-1/2 -translate-y-1/2"
                alt=""
            />
        </div>
    </div>
    <div class="grid gap-2">
        <label class="text-sm text-card font-inter font-light" for="name">Number on Card</label>
        <div class="relative">
            <input
                type="text"
                name="name"
                class=" p-4 bg-section w-full rounded-lg"
                id="name"
                required
            />
        </div>
    </div>
    <div class="grid grid-cols-2 gap-9">
        <div class="grid gap-2">
            <label class="text-sm text-card font-inter font-light" for="name">Expiration date</label
            >
            <div class="relative">
                <input
                    type="number"
                    name="name"
                    placeholder="MM/YY"
                    class=" p-4 bg-section w-full rounded-lg"
                    id="name"
                />
            </div>
        </div>
        <div class="grid gap-2">
            <label class="text-sm text-card font-inter font-light" for="number">Security code</label
            >
            <div class="relative">
                <input
                    type="number"
                    name="number"
                    placeholder="CVV"
                    class=" p-4 bg-section w-full rounded-lg"
                    id="number"
                />
                <img
                    src="/icons/codenumber.svg"
                    class="absolute stroke-card right-4 top-1/2 -translate-y-1/2"
                    alt=""
                />
            </div>
        </div>
    </div>
</div>
<button
    class="w-full p-3 bg-primary-green hover:bg-secondarygreen text-card font-inter font-semibold text-h_6 flex justify-center rounded-lg"
>
    Pay now
</button>
