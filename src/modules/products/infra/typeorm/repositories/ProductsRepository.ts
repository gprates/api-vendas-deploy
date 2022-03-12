import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProductPaginate } from '@modules/products/domain/models/IPaginateProducts';
import { IProductsRepository } from '@modules/products/domain/repositories/IProductsRepository';
import { EntityRepository, getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

interface IFindProducts {
    id: string;
}

@EntityRepository(Product)
export default class ProductsRepository implements IProductsRepository {
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = getRepository(Product);
    }

    public async create({ name, price, quantity }: ICreateProduct): Promise<Product> {
        const customer = this.ormRepository.create({ name, price, quantity });
        await this.ormRepository.save(customer);

        return customer;
    }

    public async remove(product: Product): Promise<void> {
        await this.ormRepository.remove(product);
    }

    public async save(product: Product): Promise<Product> {
        await this.ormRepository.save(product);

        return product;
    }

    public async findAll(): Promise<Product[] | undefined> {
        const products = await this.ormRepository.find();

        return products;
    }

    public async findAllPaginate(): Promise<IProductPaginate> {
        const products = await this.ormRepository.createQueryBuilder().paginate();

        return products as IProductPaginate;
      }

    public async findByName(name: string): Promise<Product | undefined> {
        const product = await this.ormRepository.findOne({
            where: {
                name,
            },
        });

        return product;
    }

    public async findById(id: string): Promise<Product | undefined> {
        const product = this.ormRepository.findOne({
            where: {
                id,
            },
        });

        return product;
    }

    public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
        const productIds = products.map(product => product.id);

        const productExists = await this.ormRepository.find({
            where: {
                id: In(productIds),
            }
        });

        return productExists;
    }
}
