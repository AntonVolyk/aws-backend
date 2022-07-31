import { getDbClient } from '@libs/pg-helpers';
import {
    CREATE_UUID_EXTENSION_QUERY,
    DROP_STOCKS_AND_PRODUCTS_TABLES_QUERY
} from "../../constants/sql-queries";

export const initDB = async () => {
  const client = getDbClient();
  await client.connect();

  try {
      await client.query(CREATE_UUID_EXTENSION_QUERY);

      await client.query(DROP_STOCKS_AND_PRODUCTS_TABLES_QUERY);
      await client.query(`
        CREATE TABLE products(
            id uuid DEFAULT uuid_generate_v4 (),
            title TEXT NOT NULL,
            description TEXT,
            price INTEGER,
            PRIMARY KEY (id)
        );`);

      await client.query(`
          CREATE TABLE stocks(
            product_id uuid,
            count INTEGER,
            FOREIGN KEY ("product_id") REFERENCES products ("id")
      );`);

      await client.query(`
        INSERT INTO products (title, description, price) VALUES 
         ('ProductOne', 'Short Product Description-1', 240),
         ('ProductTwo', 'Short Product Description-2', 840),
         ('ProductThree', 'Short Product Description-3', 440),
         ('ProductFour', 'Short Product Description-4', 540),
         ('ProductFive', 'Short Product Description-5', 240),
         ('ProductSix', 'Short Product Description-6', 4240);
      `);

      await client.query(`
        WITH id_1 AS (SELECT id FROM products WHERE title='ProductOne')
        INSERT INTO stocks(product_id, count) SELECT id, 23 from id_1;
        
        WITH id_2 AS (SELECT id FROM products WHERE title='ProductTwo')
        INSERT INTO stocks(product_id, count) SELECT id, 48 from id_2;
        
        WITH id_3 AS (SELECT id FROM products WHERE title='ProductThree')
        INSERT INTO stocks(product_id, count) SELECT id, 59 from id_3;
        
        WITH id_4 AS (SELECT id FROM products WHERE title='ProductFour')
        INSERT INTO stocks(product_id, count) SELECT id, 66 from id_4;
        
        WITH id_5 AS (SELECT id FROM products WHERE title='ProductFive')
        INSERT INTO stocks(product_id, count) SELECT id, 77 from id_5;
        
        WITH id_6 AS (SELECT id FROM products WHERE title='ProductSix')
        INSERT INTO stocks(product_id, count) SELECT id, 2547 from id_6;
      `);
  } catch(error) {
    console.error('Error during database request executing: ', error);
  } finally {
    client.end();
  }
};
