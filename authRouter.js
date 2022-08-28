import { Router } from 'express';
import controller from './authController.js';
import { check } from 'express-validator';
import authMiddleware from './middleware/authMiddleware.js';
import roleMiddleware from './middleware/roleMiddleware.js';

const router = new Router();

router.post(
  '/registration',
  [
    check('nickname', "nickname can't be at least 2 character")
      .if((_, { req }) => !req.body.isPsychologist)
      .isLength({ min: 2 }),
    check('firstName', "first name can't be at least 2 character")
      .if((_, { req }) => req.body.isPsychologist)
      .isLength({ min: 2 }),
    check('lastName', "last name can't be at least 2 character")
      .if((_, { req }) => req.body.isPsychologist)
      .isLength({ min: 2 }),
    check('password', 'password should be at least 6 symbol').isLength({ min: 6 }),
    check('email', 'email not valid').isEmail()
  ],
  controller.registration
);
router.post('/login', controller.login);
router.get('/users', [authMiddleware, roleMiddleware(['ADMIN'])], controller.getUsers);
router.get('/patients', [authMiddleware, roleMiddleware(['PSYCHOLOGISTS', 'ADMIN'])], controller.getPatients);
router.get('/psychologists', [authMiddleware, roleMiddleware(['PATIENTS', 'ADMIN'])], controller.getPsychologist);

export default router;
