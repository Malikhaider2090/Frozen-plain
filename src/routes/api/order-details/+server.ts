import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, PADDLE_API_KEY } from '$env/static/private';
import type { Product } from '$lib/interfaces.js';
import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { reduceBy } from 'ramda';

const groupProds = (acc: any, purchase: any) => {
    return acc.concat({ ...purchase.products, reviewd: purchase.reviewed });
};

const toTxnIds = (purchase: any) => {
    const txn_id = purchase.paddle_transaction_id;
    const created_at = purchase.created_at;
    return `${txn_id}|${created_at}`;
};

export const POST = async ({ locals, request }) => {
    const { ip } = await request.json();

    const { supabase, getSession } = locals;
    const session = await getSession();

    let orders: any = {};
    let products: any[] = [];

    if (session) {
        const { data, error } = await supabase
            .from('purchases')
            .select('*,products(*)')
            .eq('user_id', session.user.id);

        if (!error) {
            let _temp_prod = [...data];

            const lineItems = data.map((p: any) => ({
                price_id: p.products.paddle_price_id,
                quantity: 1
            }));

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

                const items = prices_data.data.details.line_items;

                _temp_prod = _temp_prod.map((p) => {
                    const item = items.find((e: any) => e.price.id === p.products.paddle_price_id);
                    return {
                        ...p,
                        products: {
                            ...p.products,
                            formatted_price: item.formatted_unit_totals.subtotal,
                            price: parseFloat(item.unit_totals.subtotal) / 100
                        }
                    };
                });
            } catch (error) {
                console.log(error);
            }
            const groupdedData = reduceBy(groupProds, [], toTxnIds, _temp_prod);

            Object.entries(groupdedData).forEach(([key, value]) => {
                const temp = value.reduce((total: number, prod: any) => total + prod.price, 0);
                orders[key] = { total: temp, products: value };
            });

            products = await Promise.all(
                _temp_prod.map(async (prod) => {
                    const { data: files } = await supabase
                        .from('product_file_links')
                        .select('file_id')
                        .eq('product_id', prod.products.sku);

                    return {
                        ...prod.products,
                        files: files?.map((f) => f.file_id),
                        reviewed: prod.reviewed,
                        transaction_id: prod.paddle_transaction_id
                    };
                })
            );

            return new Response(JSON.stringify({ orders, products }), {
                status: 200,
                statusText: 'Ok'
            });
        } else {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                statusText: error.message
            });
        }
    } else {
        return new Response(JSON.stringify({ error: 'Unauthorized access' }), {
            status: 403,
            statusText: 'Unauthorized Access!'
        });
    }
};
