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

        const productIdExists = productExists.map((product) => product.id);

        const checkInexistentProducts = products.filter(
            product => !productIdExists.includes(product.id),
        );

        if (!checkInexistentProducts.length) {
            throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);
        }

        const quantityAvailable = products.filter(product => productExists.filter(
            p => p.id === product.id
        )[0].quantity < product.quantity);

        if (!quantityAvailable.length) {
            throw new AppError(
                `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`
            );
        }

    }
}

export default CreateOrderService;
