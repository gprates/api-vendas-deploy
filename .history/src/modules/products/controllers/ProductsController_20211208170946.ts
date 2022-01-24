import { Response, Request } from 'express';
import ListProductService from '../services/ListProductService';

export default class ProductsController {
    public async index(request: Request, response: Response) {
        const listProducts = new ListProductService();

        const products = listProducts.execute();

        return response.json(products);
    }
}