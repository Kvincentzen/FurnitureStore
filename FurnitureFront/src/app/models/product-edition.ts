import { Product } from 'src/app/models/product';
import { Edition } from 'src/app/models/edition';
export interface ProductEdition {
    id: number;
    editionId: number;
    productId: number;
    priceMod: number;
    edition: Edition;
    product: Product;
}