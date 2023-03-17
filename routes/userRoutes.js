// controllers
const UserController = require('../controllers/UserController');
const userController = new UserController();
const { roleAuth } = require("../middlwares/RoleMiddlware");

// validators
const SignInValidation = require('../common/validation/SignInValidation');
const SignUpValidation = require('../common/validation/SignUpValidation');
const { roles } = require('../common/roles');

const { Router } = require('express');
const router = Router();

router.post(
  '/create',
  // SignUpValidation,
  // roleAuth(roles.superAdmin),
  userController
    .createProductUser.bind(userController)
);

router.post(
  '/sign-in',
  // SignInValidation,
  userController
    .signIn.bind(userController)
);

router.get(
  '/:id',
  roleAuth(roles.superAdmin),
  userController
    .getOne.bind(userController)
);

router.get(
  '/',
  roleAuth(roles.superAdmin),
  userController
    .getAll.bind(userController)
);

router.put(
  '/',
  roleAuth(roles.superAdmin),
  userController
    .update.bind(userController)
);

router.delete(
  '/:id',
  roleAuth(roles.superAdmin),
  userController
    .delete.bind(userController)
);

// router.post(
//   '/verify-email',
//   authenticationController
//     .verifyEmail.bind(authenticationController)
// );

// router.post(
//   '/request-verify-email',
//   authenticationController
//     .requestVerifyEmail.bind(authenticationController)
// );

// router.post(
//   '/resend-token',
//   authenticationController
//     .resendVerificationToken.bind(authenticationController)
// );

// router.post(
//   '/request-reset-password',
//   authenticationController
//     .verifyEmailOnResetPassword.bind(authenticationController)
// );

// router.post(
//   '/reset-password',
//   ResetPasswordValidation,
//   authenticationController
//     .resetPassword.bind(authenticationController)
// );

module.exports = router;
