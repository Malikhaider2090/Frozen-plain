import { PADDLE_API_KEY, SUPABASE_SERVICE_ROLE } from '$env/static/private';
import {
    PUBLIC_AWS_IMAGES_BUCKET,
    PUBLIC_AWS_REGION,
    PUBLIC_SUPABASE_URL
} from '$env/static/public';
import { saveImage } from '$lib/utils/s3Client';
import { createClient } from '@supabase/supabase-js';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request }) => {
        const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE);

        const data = await request.formData();

        const name = data.get('title');
        const sku = data.get('sku');
        const tagline = data.get('tagline');
        const price = data.get('price');
        const content = data.get('content');
        const format = data.get('format');
        const style = data.get('style');
        const thumbnail = data.get('thumbnail');
        const icon = data.get('icon');
        const images = data.getAll('images');
        const status = data.get('status');
        const files = data.getAll('files');

        const { data: existingProduct } = await supabase
            .from('products')
            .select('id')
            .eq('sku', sku)
            .limit(1)
            .single();

        if (existingProduct) {
            return fail(409, { success: false, msg: 'Product already exist!' });
        }

        // console.log(`${sku}/thumbnail.${thumbnail!.name.split('.').pop()}`);
        // console.log(files);

        const thumbnailName = `${sku}/thumbnail.${thumbnail!.name.split('.').pop()}`;
        const respThumbnail = await saveImage(
            thumbnailName,
            PUBLIC_AWS_IMAGES_BUCKET,
            Buffer.from(await thumbnail!.arrayBuffer(), 'utf-8'),
            thumbnail!.type
        );

        if (respThumbnail.error) {
            return fail(403, { success: false, msg: 'Error adding product!' });
        }
        const respIcon = await saveImage(
            `${sku}/icon.${icon!.name.split('.').pop()}`,
            PUBLIC_AWS_IMAGES_BUCKET,
            Buffer.from(await icon!.arrayBuffer(), 'utf-8'),
            icon!.type
        );

        if (respIcon.error) {
            return fail(403, { success: false, msg: 'Error adding product!' });
        }

        const respFiles = await Promise.all(
            images.map(async (e) => {
                return await saveImage(
                    `${sku}/${e!.name}`,
                    PUBLIC_AWS_IMAGES_BUCKET,
                    Buffer.from(await e!.arrayBuffer(), 'utf-8'),
                    e!.type
                );
            })
        );

        if (respFiles.some((e) => e.error)) {
            return fail(403, { success: false, msg: 'Error adding product!' });
        }

        if (respThumbnail.success) {
            const paddleResp = await fetch('https://sandbox-api.paddle.com/products', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${PADDLE_API_KEY}`
                },
                body: JSON.stringify({
                    name,
                    tax_category: 'standard',
                    description: tagline,
                    image_url: `https://${PUBLIC_AWS_IMAGES_BUCKET}.s3.${PUBLIC_AWS_REGION}.amazonaws.com/${thumbnailName}`
                })
            });
            const resp = await paddleResp.json();
            const paddleProductId = resp.data.id;

            const paddlePriceResp = await fetch('https://sandbox-api.paddle.com/prices', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${PADDLE_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    description: `price for ${name}`,
                    product_id: paddleProductId,
                    unit_price: {
                        amount: `${price}00`,
                        currency_code: 'GBP'
                    },
                    quantity: {
                        minimum: 1,
                        maximum: 1
                    }
                })
            });

            const PriceResp = await paddlePriceResp.json();
            const paddlePriceId = PriceResp.data.id;

            const { data: productId } = await supabase
                .from('products')
                .insert({
                    name,
                    sku,
                    tagline,
                    price,
                    content,
                    format,
                    style,
                    live: status === 'live',
                    paddle_product_id: paddleProductId,
                    paddle_price_id: paddlePriceId
                })
                .select('id')
                .limit(1)
                .single();

            if (productId) {
                const { data: links, error: linkError } = await supabase
                    .from('product_file_links')
                    .insert(files.map((f) => ({ file_id: f, product_id: sku })))
                    .select('*');

                return { success: true };
            }
        }
        return fail(403, { success: false, msg: 'Error adding new product!' });
    }
};
