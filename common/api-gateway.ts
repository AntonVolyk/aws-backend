import {Product} from "../product-service/src/interfaces/product";
import {ImportProductFileResponse} from "../import-service/src/interfaces/import-product-file-response";
import {HttpResponseError} from "../interfaces/http-response-error";

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
