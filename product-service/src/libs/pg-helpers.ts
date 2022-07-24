import { Client } from 'pg';
import { formatJSONResponse } from '@libs/api-gateway';
import {
    DB_CONNECTION_ERROR_MESSAGE,
    ERROR_STATUS_CODE,
    SUCCESS_STATUS_CODE
} from '../constants/http-response';

const {
    PG_HOST,
    PG_PORT,
    PG_DATABASE,
    PG_USERNAME,
    PG_PASSWORD
} = process.env;

const dbOptions = {
    host: PG_HOST,
    post: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    ssl: {
        rejectUnauthorized: false
    },
    connectionTimeoutMillis: 5000
};

export const getDbClient = () => new Client(dbOptions);

export const getProductsHandler = async (query: string) => {
    const client = getDbClient();
    await client.connect();

    try {
        const { rows } = await client.query(query);

        return formatJSONResponse(rows, SUCCESS_STATUS_CODE);
    } catch(error) {
        return formatJSONResponse(
            { message: DB_CONNECTION_ERROR_MESSAGE },
            ERROR_STATUS_CODE
        );
    } finally {
        await client.end();
    }
}

