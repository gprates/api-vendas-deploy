import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class UsersController {
    public async index(response: Response): Promise<Response> {
        const listCustomer = new ListCustomerService();

        const customers = await listCustomer.execute();

        return response.json(customers);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        const showCustomer = new ShowCustomerService();

        const customers = await showCustomer.execute({ id });

        return response.json(customers);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            name,
            email,
         } = request.body;

        const createUser = new CreateCustomerService();

        const user = await createUser.execute({
            name,
            email,
        });

        return response.json(user);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const  { id } = request.params;

        const deleteCustomer = new DeleteCustomerService();

        await deleteCustomer.execute({ id });

        return response.sendStatus(204);
    }

    public async update(request: Request, response: Response): Promise<Response> {
        const { id, name, email } = request.params;

        const updateCustomer = new UpdateCustomerService();

        const customer = await updateCustomer.execute({ id, name, email });

        return response.json(customer);
    }
}