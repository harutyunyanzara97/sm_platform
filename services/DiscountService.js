const { Discount } = require('../models/index');
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

      const discount = await Discount.create({
        id: UUIDV4(),
        ...req.body
      });

      return this.response({
        statusCode: 201,
        data: {
          discount
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
        const discount = await Discount.findByPk(id);

        if (!discount) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Discount doesn't found"
          });
        }

        return this.response({
          data: {
            discount
          }
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'Discount ID is required'
      });
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async getAll(req) {
    try {

      const discount = await Discount.findAll();

      if (!discount) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Discounts doesn't found"
          });
        }

        return this.response({
          data: {
            discount
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
          message: 'Discount ID is required'
        });
      }

      const discount = await Discount.findByPk(id);

      if (!discount) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "Discount doesn't found"
        });
      }

      await Discount.update({
        ...req.body
      }, {
        where: { id }
      });

      return this.response({
        data: await discount.reload(),
        message: 'Discount updated successfully'
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

        const discount = await Discount.findByPk(id);

        if (!discount) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Discount doesn't found"
          });
        }

        await discount.destroy();

        return this.response({
          status: false,
          message: 'Deleted'
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'Discount ID is required'
      });
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }
};
