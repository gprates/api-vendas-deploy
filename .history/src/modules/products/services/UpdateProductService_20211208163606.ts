import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';
import CreateProductService from '';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        const productExists = await productsRepository.findByName(name);

        if (productExists) {
            throw new AppError('There is already a product with this name.');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        return product;
    }
}

export default UpdateProductService;
