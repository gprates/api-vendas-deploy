import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import { inject, injectable } from 'tsyringe';
import { ICustomersRepository } from '../domain/repositories/ICustomersRepository';

@injectable()
class UpdateCustomerService {
    constructor(
        @inject('CustomersRepository')
        private customersRepository: ICustomersRepository
    ) {}

    public async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        const customerExists = await customersRepository.findByEmail(email);

        if (customerExists && email !== customer.email) {
            throw new AppError('This email address is already in use');
        }

        customer.name = name;
        customer.email = email;

        await customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;