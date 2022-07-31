import { APIGatewayProxyHandler } from "aws-lambda";
import { formatJSONResponse } from "../../../../common/api-gateway";
import { middyfy } from "@libs/lambda";
import {
    ERROR_STATUS_CODE,
    PRODUCTS_NOT_FOUND_ERROR_MESSAGE,
    SUCCESS_STATUS_CODE
} from "../../constants/http-response";
import { getProductsByIdHandler } from "../../common/get-products";

export const getProductsById: APIGatewayProxyHandler = async (event) => {
    try{
        const { id } = event.pathParameters;
        const product = await getProductsByIdHandler(id);

        if (!product) {
            throw PRODUCTS_NOT_FOUND_ERROR_MESSAGE;
        }

        return formatJSONResponse(product, SUCCESS_STATUS_CODE);
    } catch (err) {
        return formatJSONResponse({ message: err }, ERROR_STATUS_CODE);
    }
};

export const main = middyfy(getProductsById);
