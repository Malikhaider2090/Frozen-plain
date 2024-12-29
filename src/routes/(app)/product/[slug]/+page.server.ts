import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params, depends }) => {

    const { data: reviews, error } = await locals.supabase
        .from('reviews')
        .select(
            `id,comment,likes,created_at,accounts(email),liked_by,rating,products!inner(sku,id)`
        )
        .match({ 'products.sku': params.slug })
        .order('created_at', { ascending: true })

    return {
        reviews,
    };
};

export const actions: Actions = {};
