import { container } from 'tsyringe';
import { ICustomersRepository } from '@modules/customers/domain/repositories/ICustomersRepository';
import CustomersRepository from 'dist/modules/customers/typeorm/repositories/CustomersRepository';

container.registerSingleton<ICustomersRepository>('CustomersRepository', CustomersRepository);