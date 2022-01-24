import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';

interface IRequest {
    id: string;
}

class ShowOrderService {
    public async execute({ id }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);

        const order = await ordersRepository.findOne(id);

        if (!order) {
            throw new AppError('Order not found.');
        }

        return order;
    }
}

export default ShowOrderService;
