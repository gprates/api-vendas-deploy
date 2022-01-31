import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';
import Customer from '../infra/typeorm/entities/Customer';

interface IRequest {
    name: string;
    email: string;
}

class CreateCustomerService {
    public async execute({ name, email }: IRequest): Promise<Customer> {
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