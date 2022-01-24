import { EntityRepository, Repository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    public async findByName(name: string): Promise<User | undefined> {
        const user = this.findOne({
            where: {
                name,
            },
        });
        return user;
    }
}
