import { Color } from 'src/app/models/color';
export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    genreId: number;
    stock: number;
    color: Color;
}