import { Router, IRouter } from 'express';
import rateLimit from '../middleware/rateLimit.js';
import { upload } from '../middleware/multerConfig.js';
import apiController from '../controllers/apiController.js';
import { submitForm } from '../controllers/docSubmissionController.js';

const router: IRouter = Router();
router.use(rateLimit);
router.route('/self').get(apiController.self);
router.route('/health').get(apiController.health);
// eslint-disable-next-line @typescript-eslint/no-misused-promises
router.post('/submit-form', upload.array('documents', 10), submitForm);

export default router;

