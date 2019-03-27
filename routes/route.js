import express from "express";
import authorization from "../middleware/jwt/authorization";

import UserValidation from "../middleware/validateUser";
import userController from "../controllers/users";

import contributionsValidations from "../middleware/validateContributions";
import contributorController from "../controllers/contributors";

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

router.get(
  "/api/v1/user/:id",
  authorization.authorizeAdmin,
  userController.viewUser
);

// Contributors routes
router.post(
  "/api/v1/contributions",
  authorization.authorizeContributor,
  contributionsValidations.validateContribute,
  contributorController.contribute
);

export default router;
