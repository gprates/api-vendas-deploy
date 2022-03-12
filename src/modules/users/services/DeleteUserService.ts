import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}

class DeleteUserService {
    public async execute({ id }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        await usersRepository.remove(user);
    }
}

export default DeleteUserService;
