import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

interface IRequest {
    name: string;
    price: number;
    quantity: number;
}

class CreateProductService {
    public async execute({ name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);
        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already a product with this name');
        }

        const product = productsRepository.create({
            name,
            price,
            quantity,
        });

        await RedisCache.invalidate('api-vendas-PRODUCT_LIST');

        await productsRepository.save(product);

        return product;
    }
}

export default CreateProductService;
