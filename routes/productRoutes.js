const ProductController = require("../controllers/ProductController");
const { roleAuth } = require("../middlwares/RoleMiddlware");
const { requireAuth } = require("../middlwares/AuthMiddlware");
const { Router } = require("express");

// Validators
const CreatePostValidation = require("../common/validation/CreatePostValidation");
const UpdatePostValidation = require("../common/validation/UpdatePostValidation");
const { roles } = require('../common/roles');

const productController = new ProductController();
const router = Router();

router.post(
  "/create",
  roleAuth(roles.superAdmin),
  // CreatePostValidation,
  productController.createProduct.bind(productController)
);

router.get("/:id",
  roleAuth(roles.superAdmin),
  productController.getOneProduct.bind(productController)
);

router.get("/",
  roleAuth(roles.superAdmin),
  productController.getAllProducts.bind(productController)
);

router.put("/",
  roleAuth(roles.superAdmin, roles.productAdmin),
  // UpdatePostValidation,
  productController.updateProduct.bind(productController)
);

router.delete(
  "/:id",
  roleAuth(roles.superAdmin),
  productController.deleteProduct.bind(productController)
);

module.exports = router;
