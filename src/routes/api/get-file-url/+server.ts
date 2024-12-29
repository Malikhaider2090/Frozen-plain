import { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } from '$env/static/private';
import { PUBLIC_AWS_REGION } from '$env/static/public';
import {
    GetObjectCommand,
    ListObjectsCommand,
    ListObjectsV2Command,
    S3Client
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const POST = async ({ locals, request }) => {
    const { filename, sku } = await request.json();

    const { supabase, getSession } = locals;
    const session = await getSession();

    if (session) {
        const { data, error } = await supabase
            .from('purchases')
            .select('user_id,products!inner(sku)')
            .eq('user_id', session.user.id)
            .eq('products.sku', sku);
        if (!error) {
            const s3Client = new S3Client({
                credentials: {
                    accessKeyId: AWS_ACCESS_KEY_ID,
                    secretAccessKey: AWS_SECRET_ACCESS_KEY
                },
                region: PUBLIC_AWS_REGION
            });

            const command = new GetObjectCommand({
                Bucket: 'frozenplain-products-3',
                Key: filename
            });

            const url = await getSignedUrl(s3Client, command, { expiresIn: 60 });

            return new Response(JSON.stringify({ url }), { status: 200, statusText: 'Ok' });
        } else {
            return new Response(JSON.stringify({ error: 'Unauthorized access' }), {
                status: 403,
                statusText: 'Unauthorized Access!'
            });
        }
    } else {
        return new Response(JSON.stringify({ error: 'Unauthorized access' }), {
            status: 403,
            statusText: 'Unauthorized Access!'
        });
    }
};
