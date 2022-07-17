import { formatJSONResponse } from '@libs/api-gateway';
import products from './mock.json';
import { APIGatewayProxyHandler } from "aws-lambda";
import { middyfy } from "@libs/lambda";

const getProductsList : APIGatewayProxyHandler = async () => formatJSONResponse(products);

export const main = middyfy(getProductsList);
