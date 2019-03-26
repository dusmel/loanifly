import express from 'express';
import UserValidation from '../middleware/validateUser';
import userController from '../controllers/users';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Loanifly',
  });
});

//users routes
router.post('/api/v1/auth/signup', UserValidation.account, userController.signup);


export default router;
