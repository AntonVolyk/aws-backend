import { Product } from "../interfaces/product";
import {HttpResponseError} from "../interfaces/http-response-error";

export const formatJSONResponse = (
    body: Product[] | Product | HttpResponseError,
    statusCode: number
) => {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(body)
  }
}
