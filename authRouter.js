import { Router } from 'express';
import controller from './authController.js';
import { check } from 'express-validator';

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
router.get('/users', controller.getUsers);

export default router;
