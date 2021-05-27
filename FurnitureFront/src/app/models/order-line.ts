import { Product } from 'src/app/models/product';
export interface OrderLine {
    id: number;
    orderId: number;
    productId: number;
    amount: number;
    price: number;
    product: Product;
}