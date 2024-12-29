import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({locals, params, depends}) => {

	const {data: comments, error} = await locals.supabase
        .from('comments')
        .select(
            `id,comment,likes,created_at,accounts(email),liked_by,comments(id,comment,likes,created_at,accounts(email),liked_by)`
        )
        .match({ blog_ref: params.slug, type: 'comment' })
        .order('created_at', {ascending: true})
		
	return {
		comments
	};
};

export const actions: Actions = {};
