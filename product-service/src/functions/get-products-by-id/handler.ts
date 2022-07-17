import { APIGatewayProxyHandler } from "aws-lambda";
import { formatJSONResponse } from "@libs/api-gateway";
import products from "../../mocks/products.json";
import { middyfy } from "@libs/lambda";
import {
    ERROR_STATUS_CODE,
    PRODUCTS_NOT_FOUND_ERROR_MESSAGE,
    SUCCESS_STATUS_CODE
} from "../../constants/http-response";

const getProductsById: APIGatewayProxyHandler = async (event) => {
    try{
        const { id } = event.pathParameters;
        const product = products.find(item => item.id === id);

        if (!product) {
            throw PRODUCTS_NOT_FOUND_ERROR_MESSAGE;
        }

        return formatJSONResponse(product, SUCCESS_STATUS_CODE);
    } catch (err) {
        return formatJSONResponse({ message: err }, ERROR_STATUS_CODE);
    }
};

export const main = middyfy(getProductsById);
