import { IUserToken } from '@modules/users/domain/models/IUserToken';
import { IUserTokensRepository } from '@modules/users/domain/repositories/IUserTokensRepository';
import { EntityRepository, getRepository, Repository,  } from 'typeorm';
import UserToken from '../entities/UserToken';

@EntityRepository(UserToken)
export class UserTokensRepository implements IUserTokensRepository {
    private ormRepository: Repository<IUserToken>;

    constructor() {
      this.ormRepository = getRepository(UserToken);
    }

    public async findByToken(token: string): Promise<IUserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: {
                token,
            },
        });
        return userToken;
    }

    public async generate(user_id: string): Promise<IUserToken> {
        const userToken = await this.ormRepository.create({
            user_id,
        });

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UserTokensRepository;