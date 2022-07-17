import { Product } from "../interfaces/product";

export const formatJSONResponse = (response: Product[] ) => {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(response)
  }
}
