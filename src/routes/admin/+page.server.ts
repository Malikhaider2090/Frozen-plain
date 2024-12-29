import { fail, redirect, type Actions } from '@sveltejs/kit';
import { dev } from '$app/environment';
import { v4 as uuidv4 } from 'uuid';

export const actions: Actions = {
    default: async ({ request, cookies }) => {
        const data = await request.formData();

        const password = data.get('password');

        // perform admin auth

        if (password?.toString() === 'admin') {
            const id = uuidv4();
            cookies.set('admin', id, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: !dev,
                maxAge: 60 * 60 // one hour
            });
            throw redirect(301, '/admin/products');
        } else {
            return fail(403, { success: false });
        }
    },
};
