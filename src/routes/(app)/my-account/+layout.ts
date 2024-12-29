export const load = async ({ parent }) => {
    const { orders, products } = await parent();

    return {
        orders,
        products
    };
};
