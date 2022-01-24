import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';
import UsersController from '../controllers/UsersController';

const usersRouter = Router();

usersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        password: Joi.string().trim().required(),
        email: Joi.string().required(),
    }
  }),
  SessionsController.
);