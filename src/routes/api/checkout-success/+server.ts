import { redirect } from '@sveltejs/kit';

export const GET = async ({ locals, url }) => {
    throw redirect(300, '/cart');
};
