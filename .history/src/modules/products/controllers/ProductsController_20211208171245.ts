import { Response, Request } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';

export default class ProductsController {
    public async index(request: Request, response: Response) {
        const listProducts = new ListProductService();

        const products = listProducts.execute();

        return response.json(products);
    }

    public async show(request: Request, response: Response) {
        const { id } = request.params;

        const showProduct = new ShowProductService();

        const product = showProduct.execute({ id });

        return product;
    }
}