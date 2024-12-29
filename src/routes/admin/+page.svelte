<script lang="ts">
    import { enhance } from '$app/forms';

    export let form;
    let loading: boolean = false;
    let changed: boolean = false;
</script>

<div class="flex h-screen w-full justify-center items-center bg-background">
    <div class="w-1/2 rounded-lg flex flex-col gap-4 p-6 max-w-md shadow-xl bg-section">
        <h4 class="text-center text-h4 font-bold text-primary-blue">Admin Login</h4>
        <form
            method="post"
            use:enhance={() => {
                loading = true;
                return async ({ update }) => {
                    loading = false;
                    changed = false;
                    await update();
                };
            }}
            class="flex flex-col gap-2.5"
        >
            <div class="flex flex-col gap-0.5">
                <label for="password" class="text-card"
                    >Password
                    <small
                        class="text-primary-red text-[12px] ml-1"
                        class:hidden={!form || (form && changed) || (form && form.success)}
                        class:inline-block={form && !form?.success}>Wrong password!</small
                    >
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    on:input={() => (changed = true)}
                    class=" rounded-md p-1 px-2 bg-foreground text-card"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                class="mx-auto w-max border border-section rounded-lg px-4 py-1.5 bg-primary-blue text-card"
                >{loading ? 'Logging in...' : 'Login'}</button
            >
        </form>
    </div>
</div>
