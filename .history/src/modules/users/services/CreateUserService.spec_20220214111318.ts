import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        hashProvider = new FakeHashProvider();
        createUser = new CreateUserService(fakeUsersRepository, hashProvider);
    });

    it('should be able to create a new user', async () => {
        const user = await createUser.execute({
            name: 'Jorge Aluizio',
            email: 'aluizio@developer.br',
            password: '123456',
        });

        expect(user).toHaveProperty('id');
    });
});