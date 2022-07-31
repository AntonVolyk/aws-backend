import { Product } from "../product-service/src/interfaces/product";
import {HttpResponseError} from "../interfaces/http-response-error";
import {ImportProductFileResponse} from "../import-service/src/interfaces/import-product-file-response";

export const formatJSONResponse = (
    body: Product[] | Product | ImportProductFileResponse | HttpResponseError,
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
