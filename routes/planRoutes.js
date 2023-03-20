const PlanController = require("../controllers/PlanController");
const { roleAuth } = require("../middlwares/RoleMiddlware");
const { requireAuth } = require("../middlwares/AuthMiddlware");
const { apiKeyAuth } = require("../middlwares/ApiKeyMiddleware");
const { Router } = require("express");

// Validators
const CreatePostValidation = require("../common/validation/CreatePostValidation");
const UpdatePostValidation = require("../common/validation/UpdatePostValidation");
const { roles } = require('../common/roles');

const planController = new PlanController();
const router = Router();

router.post(
  "/create",
  roleAuth(roles.productAdmin),
  // CreatePostValidation,
  planController.createPlan.bind(planController)
);

router.post(
  "/feature/create",
  roleAuth(roles.productAdmin),
  // CreatePostValidation,
  planController.createPlanFeature.bind(planController)
);

router.post(
  "/pricing/create",
  roleAuth(roles.productAdmin),
  // CreatePostValidation,
  planController.createPlanPricing.bind(planController)
);

router.get("/:id",
  roleAuth(roles.productAdmin),
  apiKeyAuth,
  planController.getOnePlan.bind(planController)
);

router.get("/",
  roleAuth(roles.productAdmin),
  planController.getAllPlans.bind(planController)
);

router.put("/",
  roleAuth(roles.productAdmin),
  // UpdatePostValidation,
  planController.updatePlan.bind(planController)
);

router.put("/feature",
  roleAuth(roles.productAdmin),
  // UpdatePostValidation,
  planController.updatePlanFeature.bind(planController)
);

router.put("/pricing",
  roleAuth(roles.productAdmin),
  // UpdatePostValidation,
  planController.updatePlanPricing.bind(planController)
);

router.delete(
  "/:id",
  roleAuth(roles.productAdmin),
  planController.deletePlan.bind(planController)
);

module.exports = router;
