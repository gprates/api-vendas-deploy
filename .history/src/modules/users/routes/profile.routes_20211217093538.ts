import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { Router } from 'express';
import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController()

profileRouter.get('/', isAuthenticated, profileController.show);