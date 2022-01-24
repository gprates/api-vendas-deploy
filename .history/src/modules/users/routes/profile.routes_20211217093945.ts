import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();
profileRouter.use(isAuthenticated);

profileRouter.get('/', isAuthenticated, profileController.show);

profileRouter.put('/', isAuthenticated, celebrate({
    [Segments.BODY]: {
        name: Joi.string().trim().required(),
        email: Joi.string().email().lowercase().required(),
    }
}))