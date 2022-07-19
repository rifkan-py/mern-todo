import express from 'express';
import { signin, signup } from '../controllers/authController';
import { check } from 'express-validator';

const router = express.Router();

router.post(
  '/signup',
  [
    check('name', 'username must be at least 4 characters long')
      .isString()
      .isLowercase()
      .isLength({ min: 4 }),
    check('email', 'please provide a valid email').isEmail(),
    check(
      'password',
      'we suggest you to put strong password'
    ).isStrongPassword(),
  ],
  signup
);
router.post('/signin', signin);

export default router;
