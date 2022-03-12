import AppError from '@shared/errors/AppError';
import DiskStorageProvider from '@shared/providers/storageProvider/DiskStorageProvider';
import S3StorageProvider from '@shared/providers/storageProvider/S3StorageProvider';
import uploadConfig from '@config/uploads';
import { IUpdateUserAvatar } from '../domain/models/IUpdateUserAvatar';
import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IUser } from '../domain/models/IUser';

@injectable()
class UpdateUserAvatarService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) {}

    public async execute({ user_id, avatarFilename }: IUpdateUserAvatar): Promise<IUser> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        if (uploadConfig.driver === 's3') {
            const storageProvider = new S3StorageProvider();

            if (user.avatar) {
                await storageProvider.deleteFile(user.avatar);
            }

            const filename = await storageProvider.saveFile(avatarFilename);
            user.avatar = filename;

        } else {
            const storageProvider = new DiskStorageProvider();

            if (user.avatar) {
                await storageProvider.deleteFile(user.avatar);
            }

            const filename = await storageProvider.saveFile(avatarFilename);
            user.avatar = filename;
        }

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;