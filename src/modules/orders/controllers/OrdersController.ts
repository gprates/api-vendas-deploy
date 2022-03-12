import ListProductService from '@modules/products/services/ListProductService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../services/CreateOrderService';
import ShowOrderService from '../services/ShowOrderService';

export default class OrdersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listProducts = container.resolve(ListProductService);

        const customers = await listProducts.execute();

        return response.json(customers);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showOrder = new ShowOrderService();

        const order = await showOrder.execute({ id });

        return response.json(order);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { customer_id, products } = request.body;

        const createOrder = new CreateOrderService();

        const order = await createOrder.execute({
            customer_id,
            products,
        });

        return response.json(order);
    }
}