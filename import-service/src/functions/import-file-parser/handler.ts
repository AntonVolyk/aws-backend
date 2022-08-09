import {S3Event} from "aws-lambda";
import {middyfy} from "@libs/lambda";
import {S3} from "aws-sdk";
import {formatJSONResponse} from "../../../../common/api-gateway";

const csv = require('csv-parser');
const BUCKET_NAME = 'aws-task-5-bucket';

export const importFileParser = async (event: S3Event) => {
     try {
        const s3 = new S3({region: 'eu-west-1'});

        const records = event.Records.map(async (record) => {

            const objectReadSteram = s3.getObject({
                Bucket: BUCKET_NAME,
                Key: record.s3.object.key
            }).createReadStream();

            await new Promise((res, rej) => {
                objectReadSteram.pipe(csv())
                    .on('data', console.log)
                    .on('error', (error) => {
                        console.log(error);
                        rej(error);
                    })
                    .on('end', async () => {
                        try {
                            await s3.copyObject({
                                Bucket: BUCKET_NAME,
                                CopySource: `${BUCKET_NAME}/${record.s3.object.key}`,
                                Key: 'parsed'
                            }).promise();

                            await s3.deleteObject({
                                Bucket: BUCKET_NAME,
                                Key: record.s3.object.key,
                            }).promise();

                            return res('Success');
                        } catch(error) {
                            return rej(error)
                        }
                    });
            })
        });

        await Promise.all(records);

        return formatJSONResponse(null, 200);
    } catch(error) {
        return formatJSONResponse(
            { message: 'Get records error' },
            500
        );
    }
}

export const main = middyfy(importFileParser);
