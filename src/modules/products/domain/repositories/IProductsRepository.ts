import { ICreateProduct } from '../models/ICreateProduct';
import { IProductPaginate } from '../models/IPaginateProducts';
import { IProduct } from '../models/IProduct';

export interface IProductsRepository {
    findAll(): Promise<IProduct[] | undefined>;
    findByName(name: string): Promise<IProduct | undefined>;
    findById(id: string): Promise<IProduct | undefined>;
    create(data: ICreateProduct): Promise<IProduct>;
    save(product: IProduct): Promise<IProduct>;
    remove(product: IProduct): Promise<void>;
    findAllPaginate(): Promise<IProductPaginate>
}