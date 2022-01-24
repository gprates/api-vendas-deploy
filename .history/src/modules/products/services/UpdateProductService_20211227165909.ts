import { getCustomRepository } from 'typeorm';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

class UpdateProductService {
    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> {
        const productsRepository = getCustomRepository(ProductsRepository);

        const product = await productsRepository.findOne(id);

        if (!product) {
            throw new AppError('Product not found.');
        }

        const productExists = await productsRepository.findByName(name);

        if (productExists && name !== product.name) {
            throw new AppError('There is already a product with this name.');
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        const helloworld = 'hey';
        console.log(helloworld);

        await productsRepository.save(product);

        return product;
    }
}

export default UpdateProductService;