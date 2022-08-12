import { Router } from 'express';
const router = new Router();
import controller from './authController.js';

router.post('/registration', controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

export default router;