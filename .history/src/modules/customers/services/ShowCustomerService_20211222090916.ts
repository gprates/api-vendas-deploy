import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({ id }: IRequest): Promise<Customer | undefined> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const customer = customersRepository.findById(id);

        if (!customer) {
            throw new AppError('Customer not found.', 404);
        }

        return customer;
    }
}

export default ShowCustomerService;