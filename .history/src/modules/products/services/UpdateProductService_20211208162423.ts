import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product | undefined> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }
        return product;
    }
}

export default UpdateProductService;
