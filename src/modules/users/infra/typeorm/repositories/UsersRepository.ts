import ICreateUser from '@modules/users/domain/models/ICreateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async findByName(name: string): Promise<User | undefined> {
        const user = this.ormRepository.findOne({
            where: {
                name,
            },
        });
        return user;

        // maneiras diferentes de fazer/destruturação/etc

        /* const findOptions: FindOneOptions = {
            where: {
                name,
            }
        };

        return this.findOne(findOptions);

        const where = { name };

        return this.findOne({ where });

        return this.findOne( {where: { name } }); */
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = this.ormRepository.findOne({
            where: {
                id,
            },
        });
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.ormRepository.findOne({
            where: {
                email,
            },
        });
        return user;
    }

    public async create({name, email}: ICreateUser): Promise<User> {
        const user = this.ormRepository.create({name, email});
        await this.ormRepository.save(user);
        return user;
    }

    public async save(user: User): Promise<User> {
        await this.ormRepository.save(user);
        return user;
    }

    public async remove(user: User): Promise<void> {
        await this.ormRepository.remove(user);
    }
}

export default UsersRepository;