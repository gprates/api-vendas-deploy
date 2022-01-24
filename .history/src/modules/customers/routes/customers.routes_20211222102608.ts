import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController;

customersRouter.get('/', customersController.index);

customersRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required(),
    },
  }),
  customersController.show
);

customersRouter.put('/:id', isAuthenticated, celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        password: Joi.string().trim().required(),
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
  }),
  customersController.update,
);

customersRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        password: Joi.string().trim().required(),
    },
  }),
  customersController.create,
);

customersRouter.delete('/:id', isAuthenticated, celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
);

export default customersRouter;