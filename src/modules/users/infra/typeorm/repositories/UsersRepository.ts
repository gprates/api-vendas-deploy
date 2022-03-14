import { ICreateUser } from '@modules/users/domain/models/ICreateUser';
import { IPaginateUser } from '@modules/users/domain/models/IPaginateUser';
import { IUsersRepository } from '@modules/users/domain/repositories/IUsersRepository';
import { EntityRepository, getRepository, Like, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UsersRepository implements IUsersRepository {

    private ormRepository: Repository<User>;

    constructor() {
      this.ormRepository = getRepository(User);
    }

    public async remove(user: User): Promise<void> {
        await this.ormRepository.remove(user);
    }

    public async create({ name, email, password }: ICreateUser): Promise<User> {
        const user = this.ormRepository.create({ name, email, password });

        await this.ormRepository.save(user);

        return user;
      }

      public async save(user: User): Promise<User> {
        await this.ormRepository.save(user);

        return user;
      }

      public async findAllPaginate(search: string): Promise<IPaginateUser> {
        if (search) {
            return (
            await this.ormRepository
            .createQueryBuilder()
            .where([{ name: Like(`%${search}`)}, {email: Like(`%${search}`)}])
            .orderBy(`User.name`, 'ASC')
            .paginate()) as IPaginateUser;
        }

        return (
            await this.ormRepository
            .createQueryBuilder()
            .orderBy('User.name', 'ASC')
            .paginate()) as IPaginateUser;
      }

      public async findAll(): Promise<User[]> {
        const users = await this.ormRepository.find();

        return users;
      }

    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
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

        return this.ormRepository.findOne(findOptions);

        const where = { name };

        return this.findOne({ where });

        return this.findOne( {where: { name } }); */
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {
                id,
            },
        });
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: {
                email,
            },
        });
        return user;
    }
}

export default UsersRepository;