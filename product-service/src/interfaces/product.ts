import {Stock} from "./stock";

export interface Product {
    id?: string;
    description: string;
    price: number;
    title: string;
}

export interface ProductDTO extends Product, Stock {}
