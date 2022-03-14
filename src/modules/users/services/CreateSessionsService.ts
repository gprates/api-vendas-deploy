import AppError from '@shared/errors/AppError';
import { Secret, sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { inject } from 'tsyringe';
import { IHashProvider } from '../providers/hashProvider/models/IHashProvider';
import { IUserAuthenticated } from '../domain/models/IUserAuthenticated';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

class CreateSessionsService {
    constructor(
        @inject('HashProvider')
        private hashProvider: IHashProvider,
        @inject('UserRepository')
        private usersRepository: IUsersRepository
    ) {}

    public async execute({ email, password }: IUser): Promise<IUserAuthenticated> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('Incorrect email or password combination.', 401);
        }

        const passwordConfirmed = await this.hashProvider.compareHash(password, user.password);

        if (!passwordConfirmed) {
            throw new AppError('Incorrect email or password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret as Secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            user,
            token
        };
    }
}

export default CreateSessionsService;