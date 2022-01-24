import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}

class ShowOrderService {
    public async execute({ id }: IRequest): Promise<Order> {
        const productsRepository = getCustomRepository(OrdersRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        return product;
    }
}

export default ShowOrderService;
