import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { OrdersRepository } from '../typeorm/repositories/OrdersRepository';
import Order from 'src/modules/orders/typeorm/entities/Order';
import CustomersRepository from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}

class CreateOrderService {
    public async execute({ customer_id, products }: IRequest): Promise<Order> {
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customersRepository = getCustomRepository(CustomersRepository);
        const productsRepository = getCustomRepository(ProductsRepository);

        const customerExists = await customersRepository.findById(customer_id);

        if (!customerExists) {
            throw new AppError('Could not find any customer with the given id.');
        }

        const productExists = await productsRepository.findAllByIds(products);

        if (!productExists.length) {
            throw new AppError('Could not find any product with the given ids.');
        }
    }
}

export default CreateOrderService;
