import { Response, Request } from 'express';
import CreateProductService from '../services/CreateProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import Product from '../typeorm/entities/Product';

export default class ProductsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listProducts = new ListProductService();

        const products = listProducts.execute();

        return response.json(products);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showProduct = new ShowProductService();

        const product = showProduct.execute({ id });

        return response.json(product);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, price, quantity } = request.body;

        const createProduct = new CreateProductService();

        const product = createProduct.execute({
            name,
            price,
            quantity,
        });
    }
}