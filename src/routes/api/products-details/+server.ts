import { PADDLE_API_KEY } from '$env/static/private';
import { PUBLIC_AWS_IMAGES_BUCKET } from '$env/static/public';
import type { Product, ProductFilter } from '$lib/interfaces';
import { getAllProducts } from '$lib/supabase';
import { listAlbumObjects } from '$lib/utils/s3Client.js';

export const POST = async ({ locals, request }) => {
    const { ip } = await request.json();

    const response = await getAllProducts(locals.supabase);

    let content: ProductFilter[] = [];
    let format: ProductFilter[] = [];
    let style: ProductFilter[] = [];
    let products: Product[] = [];
    let currency_code: string = '';

    products = response.map((product: Product) => {
        const temp_content = product.content.toString().split('|');

        temp_content.forEach((c) => {
            const index = content.findIndex((_content) => _content.name === c);

            if (index === -1) {
                content.push({
                    name: c,
                    count: 1
                });
            } else {
                content[index].count += 1;
            }
        });

        const temp_format = product.format.toString().split('|');

        temp_format.forEach((f) => {
            const index = format.findIndex((_format) => _format.name === f);

            if (index === -1) {
                format.push({
                    name: f,
                    count: 1
                });
            } else {
                format[index].count += 1;
            }
        });

        const temp_style = product.style.toString().split('|');

        temp_style.forEach((s) => {
            const index = style.findIndex((_style) => _style.name === s);

            if (index === -1) {
                style.push({
                    name: s,
                    count: 1
                });
            } else {
                style[index].count += 1;
            }
        });

        let rating = product.reviews.reduce((total, next) => {
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

    const lineItems = products.map((p: Product) => ({ price_id: p.paddle_price_id, quantity: 1 }));

    try {
        let resp = await fetch('https://sandbox-api.paddle.com/pricing-preview', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${PADDLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                items: lineItems,
                customer_ip_address: ip
            })
        });

        const prices_data = await resp.json();

        currency_code = prices_data.data.currency_code;
        const items = prices_data.data.details.line_items;

        products = await Promise.all(
            products.map(async (p) => {
                const images = await listAlbumObjects(p.sku, PUBLIC_AWS_IMAGES_BUCKET);
                const item = items.find((e: any) => e.price.id === p.paddle_price_id);
                return {
                    ...p,
                    thumbnail: images.find((e) => e.file.split('.')[0] === 'thumbnail')!,
                    icon: images.find((e) => e.file.split('.')[0] === 'icon')!,
                    images: images.filter(
                        (e) => !['thumbnail', 'icon'].includes(e.file.split('.')[0])
                    ),
                    formatted_price: item.formatted_unit_totals.subtotal,
                    price: parseFloat(item.unit_totals.subtotal) / 100
                };
            })
        );
    } catch (error) {
        console.log(error);
    }

    // console.log(products);

    return new Response(
        JSON.stringify({ allProducts: products, content, format, style, currency_code }),
        {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
};
