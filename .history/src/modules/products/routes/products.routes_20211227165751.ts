import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import { celebrate, Joi, Segments } from 'celebrate';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get('/', productsController.index);

productsRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
  }),
  productsController.show,
);

productsRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
    },
  }),
  productsController.create,
);

productsRouter.put('/:id', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
    },
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
  }),
  productsController.update,
);

/* const throwIfExists(modelRepository: any) => async (req: Request, res: Response, next: NextFunction) =>{
    const { id } = req;
    const entity = await modelRepository.findOne(id);
    if (entity) {
        res.send(422, { message: 'Entity already exists' });
    } else {
        next();
    }
}

const throwIfNotExists(modelRepository: any, primaryKey: any[]) => async (req: Request, res: Response, next: NextFunction) =>{
    const entity = await modelRepository.findOne(...primaryKey);
    if (!entity) {
        res.send(404, { message: 'Entity not found' });
    } else {
        next();
    }
} */

productsRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
    },
  }),
  // throwIfNotExists(ProductsRepository, 'id'),
  productsController.delete,
);

export default productsRouter;
