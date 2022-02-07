import { inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';
import { getCustomRepository } from 'typeorm';
import { IDeleteCustomer } from '../domain/models/IDeleteCustomer';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

class DeleteCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
        ) {}

    public async execute({ id }: IDeleteCustomer): Promise<void> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        await customersRepository.remove(customer);
    }
}

export default DeleteCustomerService;