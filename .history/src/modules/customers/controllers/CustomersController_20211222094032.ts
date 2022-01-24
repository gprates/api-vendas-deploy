import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listCustomer = new ListCustomerService();

        const customers = await listCustomer.execute();

        return response.json(customers);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            name,
            email,
            password,
         } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({
            name,
            email,
            password
        });

        return response.json(user);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const  { id } = request.params;

        const deleteCustomer = new DeleteCustomerService();

        await deleteCustomer.execute({ id });

        return response.sendStatus(204);
    }
}