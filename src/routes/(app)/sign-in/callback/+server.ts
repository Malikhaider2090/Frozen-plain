import { redirect } from '@sveltejs/kit';

export const GET = async ({ url, locals: { supabase } }) => {
    const code = url.searchParams.get('code');
    const error = url.searchParams.get('error');
    const error_code = url.searchParams.get('error_code');
    const error_description = url.searchParams.get('error_description');
    const redirect_ = url.searchParams.get('redirect');

    // TODO handle errors

    if (code) {
        await supabase.auth.exchangeCodeForSession(code);
    }
    if (redirect_) {
        throw redirect(303, redirect_);
    } else {
        throw redirect(303, '/');
    }
};
