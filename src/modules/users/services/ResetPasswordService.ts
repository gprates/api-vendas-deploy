import AppError from '@shared/errors/AppError';
import { addHours, isAfter } from 'date-fns';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IResetPassword } from '../domain/models/IResetPassword';
import { IUserTokensRepository } from '../domain/repositories/IUserTokensRepository';

@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository
    ) {}

    public async execute({ token, password }: IResetPassword): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exists.');
        }

        const user = await this.usersRepository.findById(userToken.id);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('User token is expired.');
        }

        user.password = await hash(password, 8);

        this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
