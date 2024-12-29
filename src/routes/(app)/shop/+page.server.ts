import type { Product, ProductFilter } from "$lib/interfaces.js";
import { getAllProducts } from "$lib/supabase"


export const load = async ({locals}) => {
    const response = await getAllProducts(locals.supabase)

    let content: ProductFilter[] = [];
    let format: ProductFilter[] = [];
    let style: ProductFilter[] = [];
    let products: Product[] = [];

    products = response.map((product: Product) => {

        const temp_content = product.content.toString().split("|")

        temp_content.forEach(c => {
            const index = content.findIndex(_content => _content.name === c)

            if(index === -1){
                content.push(
                    {
                        name: c,
                        count: 1
                    }
                )
            } else {
                content[index].count += 1
            }
        })

        const temp_format = product.format.toString().split("|")

        temp_format.forEach(f => {
            const index = format.findIndex(_format => _format.name === f)

            if(index === -1){
                format.push(
                    {
                        name: f,
                        count: 1
                    }
                )
            } else {
                format[index].count += 1
            }
        })
        
        const temp_style = product.style.toString().split("|")
        
        temp_style.forEach(s => {
            const index = style.findIndex(_style => _style.name === s)

            if(index === -1){
                style.push(
                    {
                        name: s,
                        count: 1
                    }
                )
            } else {
                style[index].count += 1
            }
        })

        let rating = product.reviews.reduce((total, next) => {
            return total + next.rating
        }, 0)

        if(rating != 0){
            rating = Math.ceil(rating / product.reviews.length)
        }
        return {
            ...product,
            rating: rating
        }
    })
    
    
    return {
        products,
        content,
        format,
        style,
    }
}