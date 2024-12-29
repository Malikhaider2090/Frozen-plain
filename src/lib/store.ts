import { writable } from 'svelte/store';
import type { Product, ProductFilter } from './interfaces';

interface AuthStore {
    authenticated: boolean;
    email: string;
}

export interface CartProduct {
    sku: string;
    price: number;
    title: string;
    price_id: string;
    image: string;
}
export const user = writable<AuthStore>({ authenticated: false, email: '' });
export const cart = writable<CartProduct[]>([]);

export const toastMsg = writable({
    msg: '',
    icon: 'Success',
    desc: ''
});

export const likeLoading = writable(false);

export const checkoutModal = writable(false);

export const allProducts = writable<Product[] | null>(null);
export const content = writable<ProductFilter[]>([]);
export const style = writable<ProductFilter[]>([]);
export const format = writable<ProductFilter[]>([]);
export const currency = writable({
    symbol: '$',
    code: 'USD'
});
export const orders = writable<any | null>(null);
export const purchasedProducts = writable<Product[] | null>(null);
