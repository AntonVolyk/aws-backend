import {APIGatewayProxyHandler} from "aws-lambda";
import { S3 } from 'aws-sdk';
import {middyfy} from "@libs/lambda";
import {formatJSONResponse} from "../../../../common/api-gateway";

export const importProductsFile: APIGatewayProxyHandler = async (event) => {
    const { name } =  event.queryStringParameters;
    const s3 = new S3({ region: 'eu-west-1'});
    const params = {
        Bucket: 'aws-task-5-bucket',
        Key: `uploaded/${name}`,
        Expires: 60,
        ContentType: 'txt/csv'
    };

    try {
        const url = await s3.getSignedUrlPromise('putObject', params);

        return formatJSONResponse({ url }, 200);
    } catch(err) {
        console.log('error: ', err);
        return formatJSONResponse(
            { message: 'Get Signed Url Error' },
            500
        );
    }
}

export const main = middyfy(importProductsFile);
