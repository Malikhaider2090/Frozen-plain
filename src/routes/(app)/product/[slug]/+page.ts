export const load = ({ params, data }) => {
    return {
        slug: params.slug,
        ...data
    }
}