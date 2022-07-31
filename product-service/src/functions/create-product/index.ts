import { handlerPath } from '@libs/handler-resolver';
import { POST_METHOD, PRODUCTS_URL } from "../../constants/http-request";

export default {
    handler: `${handlerPath(__dirname)}/handler.main`,
    events: [
        {
            http: {
                method: POST_METHOD,
                path: PRODUCTS_URL,
                cors: true,
                schemes: ['http', 'https'],
                bodyType: 'Product',
                responses: {
                    200: {
                        description: 'Successful API response'
                    }
                }
            },
        },
    ],
};
