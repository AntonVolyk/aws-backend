import { APIGatewayProxyHandler } from 'aws-lambda';
import { middyfy } from '@libs/lambda';
import { getProductByIdQuery } from '../../constants/sql-queries';
import { getProductsHandler } from '@libs/pg-helpers';

export const getProductsById: APIGatewayProxyHandler = async (event) => {
    console.log('event:', event);

    const { id } = event.pathParameters;
    const query = getProductByIdQuery(id);

    return getProductsHandler(query);
};

export const main = middyfy(getProductsById);
