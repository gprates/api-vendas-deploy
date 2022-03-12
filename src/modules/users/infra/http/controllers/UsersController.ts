import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListUserService from '@modules/users/services/ListUserService';
import ShowUserService from '@modules/users/services/ShowUserService';

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const listUser = new ListUserService();

        const users = await listUser.execute();

        return response.json(classToClass(users));
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;

        const showUser = new ShowUserService();

        const user = await showUser.execute({ id });

        return response.json(classToClass(user));
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const {
            name,
            email,
            password,
         } = request.body;

        const createUser = new CreateUserService(password);

        const user = await createUser.execute({
            name,
            email,
            password
        });

        return response.json(classToClass(user));
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const  { id } = request.params;

        const deleteUser = new DeleteUserService();

        await deleteUser.execute({ id });

        return response.sendStatus(204);
    }
}