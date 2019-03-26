import express from 'express';
import UserValidation from '../middleware/validateUser';
import userController from '../controllers/users';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Loanifly',
  });
});

// users routes
router.post(
  '/api/v1/auth/signup',
  UserValidation.signup,
  userController.signup,
);
router.post(
  '/api/v1/auth/signin',
  UserValidation.signin,
  userController.signin,
);

export default router;
