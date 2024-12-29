import type { DocResolver } from "$lib/types/docs";
import { error, redirect } from "@sveltejs/kit";
import { docsSlugFromPath } from "$lib/utils";
import type { PageLoad } from "./$types";

export const load = async ({params, data, fetch}) => {

	const modules = import.meta.glob(`$lib/markdowns/**/*.md`);
    

	let match: { path?: string; resolver?: DocResolver } = {};
	

	for (const [path, resolver] of Object.entries(modules)) {
        
		if (docsSlugFromPath(path) === params.slug) {
			match = { path, resolver: resolver as unknown as DocResolver };
			break;
		}
	}
    
	// let resp = await fetch("/api/fetch-comments", {
	// 	method: 'POST',
	// 	body: JSON.stringify({
	// 		'sku': params.slug,
	// 	})
	// })

	// const {data: comments, error} = await resp.json()

	// console.log(comments);
	
	

	const doc = await match?.resolver?.();

	// const comments = await 

	if (!doc || !doc.metadata) {
		throw error(404);
	}
	return {
		slug: params.slug,
		component: doc.default,
		metadata: doc.metadata,
		title: doc.metadata.title,
		...data
	};
};