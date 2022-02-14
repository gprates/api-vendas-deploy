import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined> {
        const user = await this.findOne({
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
        const user = this.findOne({
            where: {
                id,
            },
        });
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = this.findOne({
            where: {
                email,
            },
        });
        return user;
    }
}

export default UsersRepository;