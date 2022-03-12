import { inject, injectable } from 'tsyringe';
import { IProductPaginate } from '../domain/models/IPaginateProducts';
import { IProductsRepository } from '../domain/repositories/IProductsRepository';

@injectable()
class ListProductService {
    constructor(
        @inject('CustomersRepository')
        private productsRepository: IProductsRepository,
    ) {}

    public async execute(): Promise<IProductPaginate> {

        const products = await this.productsRepository.findAllPaginate();

        return products;
    }
}

export default ListProductService;
