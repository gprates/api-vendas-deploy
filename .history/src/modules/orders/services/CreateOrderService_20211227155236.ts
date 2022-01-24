import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import Order from 'src/modules/orders/typeorm/entities/Order';

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    public async execute({ customer_id }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const productExists = await ordersRepository.findById(customer_id);

        if (productExists) {
            throw new AppError('There is already a product with this name');
        }

        const product = ordersRepository.create({
            customer_id,
        });

        await productsRepository.save(product);

        return product;
    }
}

export default CreateOrderService;
