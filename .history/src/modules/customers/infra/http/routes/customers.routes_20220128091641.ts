import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../infra/http/controllers/CustomersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController;

customersRouter.get('/', customersController.index);

customersRouter.use(isAuthenticated);

customersRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().required(),
    },
  }),
  customersController.show
);

customersRouter.put('/:id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().trim().required(),
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
        email: Joi.string().trim().required(),
    },
  }),
  customersController.create,
);

customersRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
  }),
  customersController.delete,
);

export default customersRouter;