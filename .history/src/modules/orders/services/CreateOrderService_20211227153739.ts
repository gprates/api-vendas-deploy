import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import Order from 'src/modules/orders/typeorm/entities/Order';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateOrderService {
    public async execute({ name, price, quantity }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already a product with this name');
        }

        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await productsRepository.save(product);

        return product;
    }
}

export default CreateOrderService;
