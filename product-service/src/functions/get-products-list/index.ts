import { handlerPath } from '@libs/handler-resolver';
import {
  GET_METHOD,
  PRODUCTS_URL
} from "../../constants/http-request";

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: GET_METHOD,
        path: PRODUCTS_URL,
        cors: true,
        schemes: ['http', 'https'],
        responses: {
          200: {
            description: 'Successful API response',
            bodyType: 'ProductList'
          }
        }
      },
    },
  ],
};
