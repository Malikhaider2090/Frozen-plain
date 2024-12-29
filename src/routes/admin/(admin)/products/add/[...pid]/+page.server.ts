import { SUPABASE_SERVICE_ROLE } from '$env/static/private';
import { PUBLIC_AWS_IMAGES_BUCKET, PUBLIC_SUPABASE_URL } from '$env/static/public';
import { listAlbumObjects, removeImage, saveImage } from '$lib/utils/s3Client.js';
import { createClient } from '@supabase/supabase-js';
import { fail, type Actions } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const supabase = createClient(PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE);
    const pid = params.pid;

    try {
        const { data: product } = await supabase
            .from('products')
            .select('*')
            .eq('sku', pid)
            .limit(1)
            .single();

        const { data: selectedFiles, error } = await supabase
            .from('product_file_links')
            .select('file_id')
            .eq('product_id', pid);

        const images = await listAlbumObjects(pid, PUBLIC_AWS_IMAGES_BUCKET);

        if (!error) {
            return {
                product: { ...product, images },
                selectedFiles
            };
        }
    } catch (error) {
        console.error(error);
    }
};

const difference = (setA: any[], setB: any[]) => {
    let differenceSet = new Set(setA);
    for (let i of new Set(setB)) {
        differenceSet.delete(i);
    }
    return differenceSet;
};

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
        const removedImages = JSON.parse(data.get('removed_images')!.toString());
        const files = data.getAll('files');
        const previousFiles = JSON.parse(data.get('previous_files')!.toString());

        const removedFiles = difference(previousFiles, files);
        const addedFiles = difference(files, previousFiles);

        if (removedImages.length > 0) {
            removedImages.forEach(async (e: string) => {
                const temp_resp = await removeImage(`${sku}/${e}`, PUBLIC_AWS_IMAGES_BUCKET);
                if (temp_resp.error) {
                    return fail(403, { success: false, msg: 'Error editing product!' });
                }
            });
        }

        if (thumbnail && thumbnail.name !== 'undefined') {
            const thumbnailName = `${sku}/thumbnail.${thumbnail!.name.split('.').pop()}`;

            const respThumbnail = await saveImage(
                thumbnailName,
                PUBLIC_AWS_IMAGES_BUCKET,
                Buffer.from(await thumbnail!.arrayBuffer(), 'utf-8'),
                thumbnail!.type
            );

            if (respThumbnail.error) {
                return fail(403, { success: false, msg: 'Error editing product!' });
            }
        }

        if (icon && icon.name !== 'undefined') {
            const iconName = `${sku}/icon.${icon!.name.split('.').pop()}`;

            const respIcon = await saveImage(
                iconName,
                PUBLIC_AWS_IMAGES_BUCKET,
                Buffer.from(await icon!.arrayBuffer(), 'utf-8'),
                icon!.type
            );

            if (respIcon.error) {
                return fail(403, { success: false, msg: 'Error editing product!' });
            }
        }

        if (images && images[0].name !== 'undefined') {
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
        }

        await supabase
            .from('products')
            .update({
                name,
                tagline,
                price,
                content,
                format,
                style,
                live: status === 'live'
            })
            .eq('sku', sku);

        if (addedFiles.size > 0) {
            await supabase
                .from('product_file_links')
                .insert(Array.from(addedFiles).map((f) => ({ file_id: f, product_id: sku })));
        }

        if (removedFiles.size > 0) {
            Array.from(removedFiles).forEach(async (e: string) => {
                await supabase
                    .from('product_file_links')
                    .delete()
                    .match({ product_id: sku, file_id: e });
            });
        }

        return { success: true };
    }
};
