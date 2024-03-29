import {APIGatewayProxyHandler} from "aws-lambda";
import {dbOptions} from "@libs/pg-helpers";
import {
    DB_CONNECTION_ERROR_MESSAGE,
    ERROR_STATUS_CODE_400,
    ERROR_STATUS_CODE_500, PRODUCT_VALIDATION_ERROR_MESSAGE,
    SUCCESS_STATUS_CODE
} from "../../constants/http-response";
import {getCreateProductQuery} from "../../constants/sql-queries";
import {middyfy} from "@libs/lambda";
import {ProductDTO} from "../../../../interfaces/product";
import {productDTOSchema} from "../../schemas/product-dto-schema";
import {Pool} from "pg";
import {formatJSONResponse} from "../../../../common/api-gateway";

export const createProduct: APIGatewayProxyHandler = async (event) => {
    console.log('event:', event);

    const client = new Pool(dbOptions);

    try {
        const body: ProductDTO = event.body;
        const { error } = productDTOSchema.validate(body);

        if (error) {
            return formatJSONResponse(
                { message: PRODUCT_VALIDATION_ERROR_MESSAGE },
                ERROR_STATUS_CODE_400
            );
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
            ERROR_STATUS_CODE_500
        );
    } finally {
        client.end();
    }
}

export const main = middyfy(createProduct);
