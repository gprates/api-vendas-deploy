import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';
import multer from 'multer';
import uploadConfig from '@config/uploads';

const usersRouter = Router();
const usersController = new UsersController;
const usersAvatarController = new UserAvatarController;
const upload = multer(uploadConfig);

usersRouter.get('/', usersController.index);

usersRouter.get('/:id', isAuthenticated, celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }
  }),
  usersController.show,
);

usersRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), usersAvatarController.update);

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      password: Joi.string().trim().required(),
      email: Joi.string().required().lowercase(),
    },
  }),
  usersController.create,
);

usersRouter.delete('/:id', isAuthenticated, celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    }
  }),
  usersController.delete,
);

export default usersRouter;