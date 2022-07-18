import { handlerPath } from '@libs/handler-resolver';
import {GET_METHOD, GET_PRODUCTS_URL} from "../../constants/http-request";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: GET_METHOD,
        path: GET_PRODUCTS_URL,
        cors: true,
        schemes: ['http', 'https'],
        responses: {
          200: {
            description: 'Successful API response',
            bodyType: 'Product'
          }
        }
      },
    },
  ],
};
