import { EntityRepository, Repository } from 'typeorm';
import Order from '../entities/Order';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {
    public async findById(id: string): Promise<Order | undefined> {
        const order = await this.findOne({
            where: {
                id,
            },
        });
        return order;
    }
}
