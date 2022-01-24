import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';
import Customer from '../typeorm/entities/Customer';
import usersRouter from '@modules/users/routes/users.routes';
import { custom } from 'joi';

interface IRequest {
    id: string;
    name: string;
    email: string;
}

class UpdateCustomerService {
    public async execute({ id, name, email }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = await customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.');
        }

        const customerExists = await customersRepository.findByEmail(email);

        if (customerExists && email !== customer.email) {
            throw new AppError('This email address is already in use')
        }

        customer.name = name;
        customer.email = email;

        await customersRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;