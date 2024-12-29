<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import { invalidate } from '$app/navigation';
    import { onMount } from 'svelte';
    import '../app.css';
    import { user } from '$lib/store';

    export let data;

    let { supabase, session } = data;

    $: ({ supabase, session } = data);

    onMount(() => {
        const {
            data: { subscription }
        } = supabase.auth.onAuthStateChange((event, _session) => {
            if (event === 'SIGNED_OUT') {
                user.set({
                    authenticated: false,
                    email: ''
                });
                localStorage.removeItem('ipAddress');
            }
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth');
            } else {
                if (_session) {
                    user.set({
                        authenticated: true,
                        email: _session?.user.email || 'Email'
                    });
                }
            }
        });

        return () => subscription.unsubscribe();
    });
</script>

<slot />
