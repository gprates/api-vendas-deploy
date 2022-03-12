import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';

@injectable()
class DeleteProductService {
    constructor(
        @inject('CustomersRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ id }: IDeleteProduct): Promise<void> {

        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        await redisCache.invalidate('api-vendas-PRODUCT_LIST');

        await this.productsRepository.remove(product);
    }
}

export default DeleteProductService;
