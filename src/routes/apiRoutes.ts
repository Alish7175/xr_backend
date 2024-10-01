import { Router, IRouter } from 'express';
import apiController from '../controllers/apiController.js';
import rateLimit from '../middleware/rateLimit.js';

const router: IRouter = Router();
router.use(rateLimit);
router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health);

export default router;
