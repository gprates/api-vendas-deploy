import { IHashProvider } from '../models/IHashProvider';

class BcryptHashProvider implements IHashProvider {
    public async generateHash(payload: string): Promise<string> {
        return payload;
    }

    public async compareHash(payload: string, hashed: string): Promise<boolean> {
        return payload === hashed;
    }

}

export default BcryptHashProvider;