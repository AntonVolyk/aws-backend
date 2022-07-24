import products from '../../mocks/products.json';
import { formatJSONResponse } from '@libs/api-gateway';
import { APIGatewayProxyHandler } from "aws-lambda";
import { middyfy } from "@libs/lambda";
import { SUCCESS_STATUS_CODE } from "../../constants/http-response";

export const getProductsList : APIGatewayProxyHandler = async () => formatJSONResponse(products, SUCCESS_STATUS_CODE);

export const main = middyfy(getProductsList);
