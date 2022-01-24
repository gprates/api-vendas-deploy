import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}

class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const product = await usersRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        await usersRepository.remove(product);
    }
}

export default DeleteUserService;
