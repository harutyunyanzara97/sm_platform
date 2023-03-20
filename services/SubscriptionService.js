const { Subscription } = require('../models/index');
const BaseService = require('./BaseService');
const { v4: UUIDV4 } = require('uuid');

module.exports = class extends BaseService {
  constructor() {
    super();
  }

  async create(req) {
    try {
      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const subscription = await Subscription.create({
        id: UUIDV4(),
        ...req.body
      });

      return this.response({
        statusCode: 201,
        data: {
          subscription
        }
      });

    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async getOne(req) {
    try {
      const { id } = req.params;

      if (id) {
        const subscription = await Subscription.findByPk(id);

        if (!subscription) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Subscription doesn't found"
          });
        }

        return this.response({
          data: {
            subscription
          }
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'Subscription ID is required'
      });
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async getAll(req) {
    try {

      const subscription = await Subscription.findAll();

      if (!subscription) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Subscriptions doesn't found"
          });
        }

        return this.response({
          data: {
            subscription
          }
        });

    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async update(req) {
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
          message: 'Subscriptions ID is required'
        });
      }

      const subscription = await Subscription.findByPk(id);

      if (!subscription) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "Subscription doesn't found"
        });
      }

      await Subscription.update({
        ...req.body
      }, {
        where: { id }
      });

      return this.response({
        data: await subscription.reload(),
        message: 'Subscription updated successfully'
      });

    } catch (error) {
      console.log(error);
      return this.serverErrorResponse(error);
    }
  }

  async delete(req) {
    try {
      const { id } = req.params;

      if (id) {

        const subscription = await Subscription.findByPk(id);

        if (!subscription) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Subscription doesn't found"
          });
        }

        await subscription.destroy();

        return this.response({
          status: false,
          message: 'Deleted'
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'Subscription ID is required'
      });
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }
};
