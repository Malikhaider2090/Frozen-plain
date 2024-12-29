export const load = async ({ parent }) => {

    const { blogs } = await parent()
    const categories: any = {}

    blogs.forEach((blog: { metadata: { category: any; }; }) => {
        const category = blog.metadata.category
        if (category in categories) {
            categories[category] += 1
        } else {
            categories[category] = 1
        }
    });

    return {
        blogs,
        categories
    };
};

