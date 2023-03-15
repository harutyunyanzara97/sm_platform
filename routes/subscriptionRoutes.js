const SubscriptionController = require("../controllers/SubscriptionController");
const { roleAuth } = require("../middlwares/RoleMiddlware");
const { requireAuth } = require("../middlwares/AuthMiddlware");
const { Router } = require("express");

// Validators
const CreatePostValidation = require("../common/validation/CreatePostValidation");
const UpdatePostValidation = require("../common/validation/UpdatePostValidation");
const { roles } = require('../common/roles');

const subscriptionController = new SubscriptionController();
const router = Router();

router.post(
  "/create",
  roleAuth(roles.productAdmin),
  // CreatePostValidation,
  subscriptionController.create.bind(subscriptionController)
);

router.get("/:id",
  requireAuth,
  subscriptionController.getOne.bind(subscriptionController)
);

router.get("/",
  requireAuth,
  subscriptionController.getAll.bind(subscriptionController)
);

router.put("/",
  roleAuth(roles.productAdmin),
  // UpdatePostValidation,
  subscriptionController.update.bind(subscriptionController)
);

router.delete(
  "/:id",
  roleAuth(roles.productAdmin),
  subscriptionController.delete.bind(subscriptionController)
);

module.exports = router;
