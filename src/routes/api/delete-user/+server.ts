import { SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { createClient } from '@supabase/supabase-js';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
    const data = await request.json();

    const supabaseAdmin = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE);

    const resp = await supabaseAdmin.auth.admin.deleteUser(data.user_id);
    
    return new Response('', {
        status: 200,
        headers: {
            'content-type': 'application/json'
        }
    });
};
