import express from 'express';
import authorization from '../middleware/jwt/authorization';

import UserValidation from '../middleware/validateUser';
import userController from '../controllers/users';

import contributionsValidations from '../middleware/validateContributions';
import contributorController from '../controllers/contributors';

import requestersValidations from '../middleware/validateRequester';
import requesterController from '../controllers/requester';

import loansValidations from '../middleware/validateLoans';
import loansController from '../controllers/loans';

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

// Contributor and requester
router.get(
  '/api/v1/contributions/total',
  authorization.authorizeRequesterAndContributor,
  contributorController.viewTotalContributions,
);

router.get(
  '/api/v1/loans/total',
  authorization.authorizeContributor,
  contributorController.viewLoans,
);

// Administrators routes
router.get(
  '/api/v1/users',
  authorization.authorizeAdmin,
  userController.viewUsers,
);
router.put(
  '/api/v1/loans/pay',
  authorization.authorizeRequester,
  requesterController.payLoan,
);

router.put(
  '/api/v1/loans/:id',
  authorization.authorizeAdmin,
  loansValidations.validateRejectGrant,
  loansController.grantLoan,
);

router.get(
  '/api/v1/user/:id',
  authorization.authorizeAdmin,
  requestersValidations.getOne,
  userController.viewUser,
);

router.put(
  '/api/v1/contributions/pay/:id',
  authorization.authorizeAdmin,
  loansValidations.validateParams,
  contributorController.payContribution,
);

router.delete(
  '/api/v1/user/:id',
  authorization.authorizeAdmin,
  userController.deleteUser,
);

// for the admin
router.get(
  '/api/v1/loans',
  authorization.authorizeAdmin,
  loansController.viewLoans,
);

router.get(
  '/api/v1/contributions/admin',
  authorization.authorizeAdmin,
  contributorController.viewAllContributions,
);

router.get(
  '/api/v1/loans/paid',
  authorization.authorizeAdmin,
  loansController.viewTotalPaidAmount,
);

router.get(
  '/api/v1/contributions/:id',
  authorization.authorizeAdmin,
  loansValidations.validateParams,
  contributorController.viewContribution,
);

// Contributors routes
router.post(
  '/api/v1/contributions',
  authorization.authorizeContributor,
  contributionsValidations.validateContribute,
  contributorController.contribute,
);

router.get(
  '/api/v1/contributions',
  authorization.authorizeContributor,
  contributorController.viewContributions,
);

// Requester routes (POST)
router.post(
  '/api/v1/loans',
  authorization.authorizeRequester,
  requestersValidations.create,
  requesterController.requestLoan,
);

// Requester routes (GET)
router.get(
  '/api/v1/loans/:id',
  authorization.authorizeRequester,
  requestersValidations.getOne,
  requesterController.getSingleRequest,
);

// Requester routes (PUT)
router.put(
  '/api/v1/loans',
  authorization.authorizeRequester,
  requestersValidations.validateUpdateLoan,
  requesterController.updateLoan,
);

// Requester routes (DELETE)
router.delete(
  '/api/v1/loans/',
  authorization.authorizeRequester,
  requesterController.cancelLoanRequest,
);

export default router;
