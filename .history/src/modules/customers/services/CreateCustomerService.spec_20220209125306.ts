import { FakeCustomersRepository } from '../infra/typeorm/repositories/fakes/FakeCustomersRepository';
import CreateCustomerService from './CreateCustomerService';

describe('CreateCustomer', () => {
    it('should be able to create a new customer', () => {
        const fakeCustomersRepository = new FakeCustomersRepository();

        const createCustomer = new CreateCustomerService(fakeCustomersRepository);
    });

    it('Should not be able to create two customers with the same email', () => {
        expect(1).toBe(2);
    });
});