import { SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { getAllObjects } from '$lib/utils/s3Client';
import { createClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
    if (!cookies.get('admin')) {
        throw redirect(303, '/admin');
    }
    const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE);

    let _files = await getAllObjects();
    await supabase.from('product_files').upsert(_files.map((e) => ({ id: e.file, size: e.size })));

    const { data: files } = await supabase.from('product_files').select('id,size');

    const { data: products, error } = await supabase.from('products').select('*');

    if (!error) {
        return { products, files: files || [] };
    }
};
