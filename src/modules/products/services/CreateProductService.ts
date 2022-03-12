import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import redisCache from '@shared/cache/RedisCache';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class CreateProductService {
    constructor(
        @inject('CustomersRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
        const productExists = await this.productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already a product with this name');
        }

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        const product = await this.productsRepository.create({ name, price, quantity });

        return product;
    }
}

export default CreateProductService;
