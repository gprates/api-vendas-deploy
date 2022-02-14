import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/hashProvider/fakes/FakeHashProvider';
import CreateSessionsService from './CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        createSession = new CreateSessionsService(
            fakeUsersRepository,
            fakeHashProvider,
        );
    });

    it('should be able to authenticate', async () => {
        const user = await createUser.execute({
            name: 'Jorge Aluizio',
            email: 'aluizio@developer.br',
            password: '123456',
        });

        const response = await createSession.execute({
            email: 'aluizio@developer.br',
            password: '123456',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });

    /* it('Should not be able to create two users with the same email', async () => {
        const user = await fakeUsersRepository.create({
            name: 'Jorge Aluizio',
            email: 'aluizio@developer.br',
            password: '123456',
        });

        expect(
            await createUser.execute({
                name: 'Jorge Aluizio',
                email: 'aluizio@developer.br',
                password: '123456',
            }),
        ).rejects.toBeInstanceOf(AppError);
    }); */
});