import {middyfy} from "@libs/lambda";
import {SNS} from "aws-sdk";
import {dbOptions} from "@libs/pg-helpers";
import {Client} from "pg";
import {ProductDTO} from "../../../../interfaces/product";
import {getCreateProductQuery} from "../../constants/sql-queries";

export const catalogBatchProcess = async (event) => {
    const sns = new SNS({ region: 'eu-west-1'});
    const products: ProductDTO[] = event.Records.map(item => JSON.parse(item.body));
    const client = new Client(dbOptions);

    try {
        await client.connect();

        const query = products.reduce((acc, product) => {
            const createProductQuery = getCreateProductQuery(product);
            return acc.concat(createProductQuery);
        }, '');

        await client.query(query);

        await sns.publish({
            Subject: 'Products uploaded',
            Message: JSON.stringify(products),
            TopicArn: process.env.SNS_ARN
        }, (err, data) => {
            console.log('data: ', data);
            console.log('error: ', err);
        }).promise();
    } catch(error) {
        console.log('error: ', error);
    } finally {
        client.end();
    }
};

export const main = middyfy(catalogBatchProcess);
