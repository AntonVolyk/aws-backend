import { Product } from '../../interfaces/product';
import * as productApi from '../../common/get-products';
import products from '../../mocks/products.json';

const productMock: Product = {
    count: 3,
    description: 'Short Product Description7',
    id: '7567ec4b-b10c-45c5-9345-fc73c48a80a1',
    price: 15,
    title: 'ProductName'
};

describe('get products by id', () => {
    it('return correct product', () => {
        const spy = jest.spyOn(productApi, 'getProducts');
        const product = productApi.getProductsByIdHandler(productMock.id);

        spy.mockReturnValue(products);
        expect(product).toEqual(productMock);
    })
});
