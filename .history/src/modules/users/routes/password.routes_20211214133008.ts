import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post('/forgot', celebrate({
    [Segments.BODY]: {
        email: Joi.string().required().lowercase(),
    }
  }),
  forgotPasswordController.create,
);

passwordRouter.post('/reset', celebrate({
    [Segments.BODY]: {
        email: Joi.string().required().lowercase(),
        password: Joi.string().required(),
        passwordConfirmation: Joi.string().required().valid(Joi.ref('password')),
    }
  }),
  forgotPasswordController.create,
);

export default passwordRouter;