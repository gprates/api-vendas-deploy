import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import User from '../infra/typeorm/entities/User';
import { hash } from 'bcryptjs';
import { inject } from 'tsyringe';
import { IHashProvider } from '../providers/hashProvider/models/IHashProvider';

interface IRequest {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    constructor(
        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const emailExists = await usersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('Email address is already used by another user.');
        }

        const hashedPassword = await this.hashProvider.generateHash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
