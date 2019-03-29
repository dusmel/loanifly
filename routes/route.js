import express from "express";
import authorization from "../middleware/jwt/authorization";

import UserValidation from "../middleware/validateUser";
import userController from "../controllers/users";

import contributionsValidations from "../middleware/validateContributions";
import contributorController from "../controllers/contributors";

import requestersValidations from '../middleware/validateRequester';
import requesterController from '../controllers/requester';

import loansValidations from "../middleware/validateLoans";
import loansController from "../controllers/loans";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Loanifly"
  });
});

// users routes
router.post(
  "/api/v1/auth/signup",
  UserValidation.signup,
  userController.signup
);

router.post(
  "/api/v1/auth/signin",
  UserValidation.signin,
  userController.signin
);

// Administrators routes
router.get(
  "/api/v1/users",
  authorization.authorizeAdmin,
  userController.viewUsers
);

router.put(
  "/api/v1/loans/:id",
  authorization.authorizeAdmin,
  loansValidations.validateRejectGrant,
  loansController.grantLoan
);

router.get(
  "/api/v1/user/:id",
  authorization.authorizeAdmin,
  userController.viewUser
);
router.put(
  '/api/v1/contributions/:id/pay',
  authorization.authorizeAdmin,
  loansValidations.validateParams,
  contributorController.payContribution,
);

router.delete(
  "/api/v1/user/:id",
  authorization.authorizeAdmin,
  userController.deleteUser
);

// Contributors routes
router.post(
  "/api/v1/contributions",
  authorization.authorizeContributor,
  contributionsValidations.validateContribute,
  contributorController.contribute
);

router.get(
  '/api/v1/contributions',
  authorization.authorizeContributor,
  contributorController.viewContributions,
);

// Contributor and requester
router.get(
  "/api/v1/contributions/total",
  authorization.authorizeRequesterAndContributor,
  contributorController.viewTotalContributions
);

// Requesters routes
router.post(
  '/api/v1/loans',
  authorization.authorizeRequester,
  requestersValidations.create,
  requesterController.requestLoan,
);

// Requesters routes
router.get(
  "/api/v1/loans/:id",
  authorization.authorizeRequester,
  requestersValidations.getOne,
  requesterController.getSingleRequest
);

export default router;
