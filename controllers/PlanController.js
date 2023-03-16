const PlanService = require("../services/PlanService");

class PlanController {
  constructor() {
    this.planService = new PlanService();
  }

  async createPlan(req, res) {
    const data = await this.planService.createPlan(req);
    res.status(data.statusCode).json(data);
  }

  async createPlanFeature(req, res) {
    const data = await this.planService.createPlanFeature(req);
    res.status(data.statusCode).json(data);
  }

  async getOnePlan(req, res) {
    const data = await this.planService.getOnePlan(req);
    res.status(data.statusCode).json(data);
  }

  async getAllPlans(req, res) {
    const data = await this.planService.getAllPlans(req);
    res.status(data.statusCode).json(data);
  }

  async updatePlan(req, res) {
    const data = await this.planService.updatePlan(req);
    res.status(data.statusCode).json(data);
  }

  async updatePlanFeature(req, res) {
    const data = await this.planService.updatePlanFeature(req);
    res.status(data.statusCode).json(data);
  }

  async deletePlan(req, res) {
    const data = await this.planService.deletePlan(req);
    res.status(data.statusCode).json(data);
  }
}

module.exports = PlanController;
