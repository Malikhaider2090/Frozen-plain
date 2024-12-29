import type { Product } from '$lib/interfaces';
import { docsSlugFromPath } from '$lib/utils';
import { reduceBy } from 'ramda';

const groupProds = (acc: any, purchase: any) => {
    return acc.concat({ ...purchase.products, reviewd: purchase.reviewed });
};

const toTxnIds = (purchase: any) => {
    const txn_id = purchase.paddle_transaction_id;
    const created_at = purchase.created_at;
    return `${txn_id}|${created_at}`;
};

export const load = async ({ parent }) => {
    const { supabase } = await parent();

    const modules = import.meta.glob(`$lib/markdowns/**/*.md`);

    const { data, error } = await supabase.from('blogs').select('*,comments(count)');
    const { data: spotlightProds, error: err } = await supabase
        .from('products')
        .select('*,reviews(rating)')
        .match({ live: true })
        .limit(3)
        .order('created_at');

    let spotlightProducts: Product[] | undefined = spotlightProds?.map((product) => {
        let rating = product.reviews.reduce((total: any, next: { rating: any }) => {
            return total + next.rating;
        }, 0);

        if (rating != 0) {
            rating = Math.ceil(rating / product.reviews.length);
        }

        return {
            ...product,
            rating: rating
        };
    });
    let blogs: any = [];

    for (const [path, resolver] of Object.entries(modules)) {
        const doc = await resolver?.();

        const category = doc.metadata.category;
        const sku = docsSlugFromPath(path);

        const blog = data?.find((_blog) => _blog.slug === sku);

        blogs.push({
            metadata: doc.metadata,
            url: sku,
            comments: (blog && blog.comments[0].count) || 0
        });
    }

    blogs = blogs.sort(
        (
            blog1: { metadata: { date: string | number | Date } },
            blog2: { metadata: { date: string | number | Date } }
        ) => {
            const blog1_date = new Date(blog1.metadata.date);
            const blog2_date = new Date(blog2.metadata.date);
            return blog2_date - blog1_date;
        }
    );

    return {
        blogs,
        spotlightProducts,
        // orders,
        // products
    };
};
