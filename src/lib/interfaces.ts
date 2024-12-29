export interface Product {
    name: string;
    sku: string;
    tagline: string;
    price: number;
    live: boolean;
    content: string;
    style: string;
    format: string;
    id: string;
    discount?: number;
    rating: number;
    created_at: string;
    reviews: [
        {
            rating: number;
        }
    ];
    paddle_price_id: string;
    formatted_price: string;
    files: string[] | undefined;
    images: ImageInterface[];
    thumbnail: ImageInterface;
    icon: ImageInterface;
}

export interface ImageInterface {
    file: string;
    size: number;
    url: string;
}

export interface ProductFilter {
    name: string;
    count: number;
}

export interface CommentInterface {
    id: number;
    likes: number;
    comment: string;
    created_at: string;
    accounts: {
        email: any;
    };
    comments: CommentInterface[];
    liked_by: string[] | null;
}

export interface ReviewInterface {
    id: number;
    likes: number;
    comment: string;
    created_at: string;
    accounts: {
        email: any;
    };
    liked_by: string[] | null;
    rating: number;
}
