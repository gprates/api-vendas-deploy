import { EntityRepository, Repository } from 'typeorm';
import Customer from '../entities/Customer';

@EntityRepository(Customer)
export class CustomersRepository extends Repository<Customer> {
    public async findByName(name: string): Promise<Customer | undefined> {
        const customer = await this.findOne({
            where: {
                name,
            },
        });
        return customer;

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

    public async findById(id: string): Promise<Customer | undefined> {
        const customer = this.findOne({
            where: {
                id,
            },
        });
        return customer;
    }

    public async findByEmail(email: string): Promise<Customer | undefined> {
        const customer = this.findOne({
            where: {
                email,
            },
        });
        return customer;
    }
}

export default CustomersRepository;