const { Plans, Plan_Features, Plan_Pricing } = require('../models/index');
const BaseService = require('./BaseService');
const { v4: UUIDV4 } = require('uuid');

module.exports = class extends BaseService {
  constructor() {
    super();
  }

  async createPlan(req) {
    try {
      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const { name, description, product_id } = req.body;

      const plan = await Plans.create({
        id: UUIDV4(),
        name,
        description,
        product_id
      });

      return this.response({
        statusCode: 201,
        data: {
          plan
        }
      });

    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async createPlanFeature(req) {
    try {
      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const { param_name, param_type, param_description, param_limit, param_alert_level, param_flag, plan_id } = req.body;

      const planFeature = await Plan_Features.create({
        id: UUIDV4(),
        param_name,
        param_type,
        param_description,
        param_limit,
        param_alert_level,
        param_flag,
        plan_id
      });

      return this.response({
        statusCode: 201,
        data: {
          planFeature
        }
      });

    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async createPlan(req) {
    try {
      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const { name, description, product_id } = req.body;

      const plan = await Plans.create({
        id: UUIDV4(),
        name,
        description,
        product_id
      });

      return this.response({
        statusCode: 201,
        data: {
          plan
        }
      });

    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async createPlanPricing(req) {
    try {
      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const planPricing = await Plan_Pricing.create({
        id: UUIDV4(),
        ...req.body
      });

      return this.response({
        statusCode: 201,
        data: {
          planPricing
        }
      });

    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async getOnePlan(req) {
    try {
      const { id } = req.params;

      if (id) {
        const plan = await Plans.findByPk(id);

        if (!plan) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Plan doesn't found"
          });
        }

        return this.response({
          data: {
            plan
          }
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'Plan ID is required'
      });
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async getAllPlans(req) {
    try {

      const plans = await Plans.findAll();

      if (!plans) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Plans doesn't found"
          });
        }

        return this.response({
          data: {
            plans
          }
        });

    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async updatePlan(req) {
    try {

      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const { name, description, product_id, id } = req.body;

      if (!id) {
        return this.response({
          status: false,
          statusCode: 400,
          message: 'Plan ID is required'
        });
      }

      const plan = await Plans.findByPk(id);

      if (!plan) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "Plan doesn't found"
        });
      }

      await Plans.update({
        name,
        description,
        product_id
      }, {
        where: { id }
      });

      return this.response({
        message: 'Plan updated successfully'
      });

    } catch (error) {
      console.log(error.message);
      return this.serverErrorResponse(error);
    }
  }

  async updatePlanFeature(req) {
    try {

      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const { id } = req.body;

      if (!id) {
        return this.response({
          status: false,
          statusCode: 400,
          message: 'PlanFeature ID is required'
        });
      }

      const planFeature = await Plan_Features.findByPk(id);

      if (!planFeature) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "PlanFeature doesn't found"
        });
      }

      await Plan_Features.update(req.body, {
        where: { id }
      });

      return this.response({
        message: 'PlanFeature updated successfully'
      });

    } catch (error) {
      console.log(error.message);
      return this.serverErrorResponse(error);
    }
  }

  async updatePlanPricing(req) {
    try {

      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const { id } = req.body;

      if (!id) {
        return this.response({
          status: false,
          statusCode: 400,
          message: 'PlanPricing ID is required'
        });
      }

      const planPricing = await Plan_Pricing.findAll({ order: [['createdAt', 'DESC']] });

      const prevDataId = planPricing[0].dataValues.id;

      const prevData = await Plan_Pricing.findByPk(prevDataId);

      prevData.active = false;

      await prevData.save();

      if (!planPricing) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "PlanPricing doesn't found"
        });
      }

      await Plan_Pricing.create({
        ...req.body,
        id: UUIDV4(),
      });

      return this.response({
        message: 'PlanPricing updated successfully'
      });

    } catch (error) {
      console.log(error.message);
      return this.serverErrorResponse(error);
    }
  }

  async deletePlan(req) {
    try {
      const { id } = req.params;

      if (id) {

        const plan = await Plans.findByPk(id);

        if (!plan) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Plan doesn't found"
          });
        }

        await plan.destroy();

        return this.response({
          status: false,
          message: 'Deleted'
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'Plan ID is required'
      });
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }
};
