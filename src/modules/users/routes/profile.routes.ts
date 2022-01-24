import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Joi, Segments } from 'celebrate';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put('/', celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().lowercase().required(),
            old_password: Joi.string().trim(),
            password: Joi.string().trim().optional(),
            password_confirmation: Joi.string().trim()
                .valid(Joi.ref('password'))
                .when('password', {
                    is: Joi.exist(),
                    then: Joi.required(),
                }),
        },
    }),
    profileController.update,
);

export default profileRouter;
