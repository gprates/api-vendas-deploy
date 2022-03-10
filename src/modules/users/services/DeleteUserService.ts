import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import IDeleteUser from '../domain/models/IDeleteUser';

@injectable()
class DeleteUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}
    
    public async execute({ id }: IDeleteUser): Promise<void> {
        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new AppError('User not found.');
        }

        await this.usersRepository.remove(user);
    }
}

export default DeleteUserService;
