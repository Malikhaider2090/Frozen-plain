import { docsSlugFromPath } from "$lib/utils";

export const load = async ({locals}) => {

	const modules = import.meta.glob(`$lib/markdowns/**/*.md`);

	const {data, error} = await locals.supabase.from("blogs").select('*,comments(count)')
    
    const categories: any = {}
	const blogs: any = []

	for (const [path, resolver] of Object.entries(modules)) {

        const doc = await resolver?.();
        
        const category = doc.metadata.category;
		const sku = docsSlugFromPath(path);
		
		const blog = data?.find(_blog => _blog.slug === sku)
		// console.log(blog);
		

		blogs.push({
			metadata: doc.metadata,
			url: sku,
			comments: (blog && blog.comments[0].count) || 0
		})
        
        if(category in categories){
            categories[category] += 1
        }else {
            categories[category] = 1
        }
        
	}
	
    
	return {
        categories,
		blogs,
    };
};

