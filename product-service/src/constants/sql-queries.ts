import {ProductDTO} from "../interfaces/product";

export const GET_PRODUCTS_QUERY = 'SELECT * FROM products';
export const CREATE_UUID_EXTENSION_QUERY = `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`;
export const DROP_STOCKS_AND_PRODUCTS_TABLES_QUERY = `DROP TABLE IF EXISTS stocks,products CASCADE;`;
export const getProductByIdQuery = (id: string) =>
    `SELECT * FROM products FULL JOIN stocks
     ON products.id=stocks.product_id WHERE products.id='${id}';`
export const getCreateProductQuery = ({
    title,
    description,
    price,
    count
}: ProductDTO) => `WITH uuid AS 
    (INSERT INTO products(title, description, price) VALUES('${title}', '${description}', '${price}') RETURNING id)
    INSERT INTO stocks(product_id, count) SELECT id, ${count} from uuid;`;
