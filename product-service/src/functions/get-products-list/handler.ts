import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { GET_PRODUCTS_QUERY } from '../../constants/sql-queries';
import { getProductsHandler } from '@libs/pg-helpers';

export const getProductsList: APIGatewayProxyHandler = async (event) => {
    console.log('event:', event);

    return getProductsHandler(GET_PRODUCTS_QUERY);
}

export const main = middyfy(getProductsList);
