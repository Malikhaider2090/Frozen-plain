import { saveObject } from '$lib/utils/s3Client';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request }) => {
        const data = await request.formData();

        const filename = data.get('filename');
        const file = data.get('file');

        const resp = await saveObject(`${filename}.zip`, file);

        if (resp.success) {
            return { success: true };
        } else {
            return { success: false };
        }
    }
};
