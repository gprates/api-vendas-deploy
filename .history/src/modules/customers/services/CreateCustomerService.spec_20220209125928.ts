import 'reflect-metadata';
import { FakeCustomersRepository } from '../infra/typeorm/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomer', async () => {
    it('should be able to create a new customer', () => {
        const fakeCustomersRepository = new FakeCustomersRepository();

        const createCustomer = new CreateCustomerService(fakeCustomersRepository);

        const customer = createCustomer.execute({
            name: 'Jorge Aluizio',
            email: 'aluizio@developer.br'
        });

        expect(customer).toHaveProperty('id');
    });

    it('Should not be able to create two customers with the same email', () => {
        expect(1).toBe(2);
    });
});