import { instanceToInstance } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import DeleteUserService from '../services/DeleteUserService';
import ListUserService from '../services/ListUserService';

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listUser = new ListUserService();

        const users = await listUser.execute();

        return response.json(instanceToInstance(users));
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

        return response.json(instanceToInstance(user));
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const  { id } = request.params;

        const deleteUser = new DeleteUserService();

        await deleteUser.execute({ id });

        return response.sendStatus(204);
    }
}