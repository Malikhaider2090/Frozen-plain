<script lang="ts">
    import { browser } from '$app/environment';
    import { goto } from '$app/navigation';
    import {
        allProducts,
        content,
        currency,
        format,
        orders,
        purchasedProducts,
        style,
        user
    } from '$lib/store';
    import { signOut } from '$lib/supabase';
    import { getIpAddress } from '$lib/utils/ip_address';
    import Footer from '../../components/nav/footer.svelte';
    import Header from '../../components/nav/header.svelte';

    export let data;

    let { supabase } = data;

    const handleSignOut = async () => {
        signOut(supabase);
        goto('/');
    };

    const fetchProducts = async () => {
        // console.log('fetching products');
        
        const ip = await getIpAddress();

        const resp = await fetch('/api/products-details', {
            method: 'POST',
            body: JSON.stringify({ ip })
        });
        const {
            allProducts: _allProducts,
            style: _style,
            content: _content,
            format: _format,
            currency_code: _currency_code
        } = await resp.json();

        allProducts.set(_allProducts);
        style.set(_style);
        content.set(_content);
        format.set(_format);
        currency.set({
            symbol: _allProducts[0].formatted_price[0],
            code: _currency_code
        });
    };

    $: if (browser && !$allProducts ) {
        fetchProducts();
    }

    const fetchOrderDetails = async () => {
        const ip = await getIpAddress();
        const resp = await fetch('/api/order-details', {
            method: 'POST',
            body: JSON.stringify({ ip })
        });

        if (resp.status === 500 || resp.status === 403) {
            console.error(resp.statusText);
        } else {
            const { orders: _orders, products: _purchasedProducts } = await resp.json();

            orders.set(_orders);
            purchasedProducts.set(_purchasedProducts);
        }
    };

    $: if (browser && $user.authenticated && !$orders && !$purchasedProducts) {
        fetchOrderDetails();
    }
</script>

<Header on:signOut={handleSignOut} />
<slot />
<Footer />
