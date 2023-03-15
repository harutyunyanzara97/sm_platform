const DiscountController = require("../controllers/DiscountController");
const { roleAuth } = require("../middlwares/RoleMiddlware");
const { requireAuth } = require("../middlwares/AuthMiddlware");
const { Router } = require("express");

// Validators
const CreatePostValidation = require("../common/validation/CreatePostValidation");
const UpdatePostValidation = require("../common/validation/UpdatePostValidation");
const { roles } = require('../common/roles');

const discountController = new DiscountController();
const router = Router();

router.post(
  "/create",
  roleAuth(roles.productAdmin),
  // CreatePostValidation,
  discountController.create.bind(discountController)
);

router.get("/:id",
  requireAuth,
  discountController.getOne.bind(discountController)
);

router.get("/",
  requireAuth,
  discountController.getAll.bind(discountController)
);

router.put("/",
  roleAuth(roles.productAdmin),
  // UpdatePostValidation,
  discountController.update.bind(discountController)
);

router.delete(
  "/:id",
  roleAuth(roles.productAdmin),
  discountController.delete.bind(discountController)
);

module.exports = router;
