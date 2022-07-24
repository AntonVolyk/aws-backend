import {APIGatewayProxyHandler} from "aws-lambda";
import {dbOptions} from "@libs/pg-helpers";
import {formatJSONResponse} from "@libs/api-gateway";
import {DB_CONNECTION_ERROR_MESSAGE, ERROR_STATUS_CODE, SUCCESS_STATUS_CODE} from "../../constants/http-response";
import {getCreateProductQuery} from "../../constants/sql-queries";
import {middyfy} from "@libs/lambda";
import {ProductDTO} from "../../interfaces/product";
import {productDTOSchema} from "../../schemas/product-dto-schema";
import {PRODUCT_VALIDATION_ERROR_MESSAGE} from "../../constants/http-request";
import {Pool} from "pg";

export const createProduct: APIGatewayProxyHandler = async (event) => {
    console.log('event:', event);

    const client = new Pool(dbOptions);

    try {
        const body: ProductDTO = event.body;
        const { error } = productDTOSchema.validate(body);

        if (error) {
            throw PRODUCT_VALIDATION_ERROR_MESSAGE;
        }

        await client.connect();
        await client.query('BEGIN');

        const createProductQuery = getCreateProductQuery(body);
        const product = await client.query(createProductQuery);

        await client.query('COMMIT')

        return formatJSONResponse(product.rows, SUCCESS_STATUS_CODE);
    } catch(error) {
        await client.query('ROLLBACK');

        return formatJSONResponse(
            { message: DB_CONNECTION_ERROR_MESSAGE },
            ERROR_STATUS_CODE
        );
    } finally {
        client.end();
    }
}

export const main = middyfy(createProduct);
