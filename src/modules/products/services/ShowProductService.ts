import Product from '../infra/typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';
import { IShowProduct } from '../domain/models/IShowProduct';

@injectable()
class ShowProductService {
    constructor(
        @inject('CustomersRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute({ id }: IShowProduct): Promise<Product> {

        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        return product;
    }
}

export default ShowProductService;
