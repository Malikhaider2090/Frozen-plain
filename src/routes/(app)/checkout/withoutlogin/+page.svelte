<script>
    import { Mail } from 'lucide-svelte';
    let email = '';

    let selectedCountry = ''; // This variable will store the selected country code
    const countries = [
        { name: 'Aland Islands', code: 'AX' },
        { name: 'Albania', code: 'AL' },
        { name: 'Algeria', code: 'DZ' },
        { name: 'American Samoa', code: 'AS' },
        { name: 'Andorra', code: 'AD' },
        { name: 'Angola', code: 'AO' },
        { name: 'Anguilla', code: 'AI' },
        { name: 'Antigua and Barbuda', code: 'AG' },
        { name: 'Argentina', code: 'AR' },
        { name: 'Armenia', code: 'AM' },
        { name: 'Zimbabwe', code: 'ZW' }
    ];

    function handleCountryChange(e) {
        selectedCountry = e.target.value;
    }
</script>

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
    <p class="text-lg text-card font-inter font-light">
        We collect this information to help combat fraud,<br />and to keep your payment secure.
    </p>

    <div class="grid gap-2">
        <label class="text-lg text-card font-inter font-light" for="card">Email address</label>

        <div class="relative">
            <input
                type="text"
                name="email"
                class="pl-12 pr-4 w-full py-3.5 placeholder-card/50 text-card text-text-card rounded-lg bg-section placeholder-text-card/80"
                placeholder="example@gmail.com"
            />
            <Mail
                class="absolute  {email
                    ? 'stroke-card'
                    : 'stroke-card/50'} left-4 top-1/2 -translate-y-1/2"
            />
            <button
                class="bg-primary-blue rounded-lg absolute right-0 top-1/2 -translate-y-1/2 p-4 text-sm  focus:bg-card-15 focus:text-primary-blue focus:border-card-5 text-card font-inter font-semibold"
                >Send Code</button
            >
        </div>
    </div>
    <div class="grid gap-2">
        <label class="text-lg text-card font-inter font-light" for="email">Verify your email</label>
        <label class="text-xxs text-card font-inter font-light" for="email"
            >We sent you a six digit confirmation code to example@mail.com. Please<br />
            enter it below to confirm your email adress.</label
        >
        <div class="relative">
            <input
                type="text"
                name="email"
                class=" p-4 bg-section w-full rounded-lg"
                id="email"
                placeholder="Enter 6-digit code"
            />
        </div>
        <p class="text-md text-card font-inter font-light">
            Didn’t receive a code? <a class="underline" href="/">Send code again.</a>
        </p>
    </div>

    <div class="grid gap-2">
        <label class="text-lg text-card font-inter font-light" for="country">Country</label>

        <select
            class="text-card border-none p-3 bg-section w-full rounded-lg"
            id="country"
            on:change={handleCountryChange}
            bind:value={selectedCountry}
        >
            <option value="">Select a country</option>
            {#each countries as { name, code }}
                <option value={code}>{name}</option>
            {/each}
        </select>

        <label class="text-xxs text-card font-inter font-light">
            <input class="bg-section" type="checkbox" name="country" id="country" />

            FrozenPlain may send me product updates and offers via email. It is<br /> possible to opt-out
            at any time.
        </label>
    </div>
</div>
<button
    class="w-full p-3 bg-primary-green text-card hover:bg-secondarygreen font-inter font-semibold text-h_6 flex justify-center rounded-lg"
>
    Continue
</button>
