import { Product } from "../interfaces/product";
import products from '../mocks/products.json';

export const getProducts = (): Product[] => {
    return products;
}

export function getProductsByIdHandler(id: string): Product {
    const products = getProducts();

    return products.find(item => item.id === id);
}

