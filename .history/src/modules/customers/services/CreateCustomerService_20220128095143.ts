import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';

class CreateCustomerService implements ICreateCustomer {
    name: string;
    email: string;
    public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const emailExists = await customersRepository.findByEmail(email);

        if (emailExists) {
            throw new AppError('There is already a customer with this e-mail address.');
        }

        const customer = customersRepository.create({ name, email });

        await customersRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;