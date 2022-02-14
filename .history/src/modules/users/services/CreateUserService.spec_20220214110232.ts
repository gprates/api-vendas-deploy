import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        createUser = new CreateUserService(fakeUsersRepository);
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'Jorge Aluizio',
            email: 'aluizio@developer.br'
        });

        expect(user).toHaveProperty('id');
    });

    it('Should not be able to create two users with the same email', async () => {
        await createUser.execute({
            name: 'Jorge Aluizio',
            email: 'aluizio@developer.br'
        });

        expect(
            await createUser.execute({
                name: 'Jorge Aluizio',
                email: 'aluizio@developer.br'
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});