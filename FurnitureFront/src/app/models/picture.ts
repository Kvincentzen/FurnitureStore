import { Product } from './product';
export interface Picture {
    id: number;
    name: string;
    productId: number;
    product: Product;
}