import {APIGatewayProxyHandler} from "aws-lambda";
import {getDbClient} from "@libs/pg-helpers";
import {formatJSONResponse} from "@libs/api-gateway";
import {DB_CONNECTION_ERROR_MESSAGE, ERROR_STATUS_CODE, SUCCESS_STATUS_CODE} from "../../constants/http-response";
import {getCreateProductQuery} from "../../constants/sql-queries";
import {middyfy} from "@libs/lambda";
import {ProductDTO} from "../../interfaces/product";
import {productDTOSchema} from "../../schemas/product-dto-schema";
import {PRODUCT_VALIDATION_ERROR_MESSAGE} from "../../constants/http-request";

export const createProduct: APIGatewayProxyHandler = async (event) => {
    console.log('event:', event);

    const client = getDbClient();

    try {
        const { error, value } = productDTOSchema.validate(body);

        console.log('validation:', value);

        if (error) {
            throw PRODUCT_VALIDATION_ERROR_MESSAGE;
        }

        await client.connect();

        const body: ProductDTO = event.body;
        const createProductQuery = getCreateProductQuery(body);
        const product = await client.query(createProductQuery);

        return formatJSONResponse(product.rows, SUCCESS_STATUS_CODE);
    } catch(error) {
        return formatJSONResponse(
            { message: DB_CONNECTION_ERROR_MESSAGE },
            ERROR_STATUS_CODE
        );
    } finally {
        await client.end();
    }
}

export const main = middyfy(createProduct);
