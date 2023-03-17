const { Products, Product_Activation_History } = require('../models/index');
const BaseService = require('./BaseService');
const { v4: UUIDV4 } = require('uuid');

module.exports = class extends BaseService {
  constructor() {
    super();
  }

  async createProduct(req) {
    try {
      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const { name, description, active_flag } = req.body;

      const product = await Products.create({
        id: UUIDV4(),
        name,
        description,
        active_flag
      });

      await Product_Activation_History.create({
        id: UUIDV4(),
        action_performed: "created",
        update_description: `Product with id ${product.id} created`,
        product_id: product.id
      });

      return this.response({
        statusCode: 201,
        data: {
          product
        }
      });

    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async getOneProduct(req) {
    try {
      const { id } = req.params;

      if (id) {
        const product = await Products.findByPk(id);

        if (!product) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Product doesn't found"
          });
        }

        return this.response({
          data: {
            product
          }
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'Product ID is required'
      });
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async getAllProducts(req) {
    try {

      const products = await Products.findAll();

      if (!products) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Products doesn't found"
          });
        }

        return this.response({
          data: {
            products
          }
        });

    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async updateProduct(req) {
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
          message: 'Product ID is required'
        });
      }
      
      let product = await Products.findByPk(id);
     
      if (!product) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "Product doesn't found"
        });
      }
   
      await Products.update(req.body, {
        where: { id }
      });

      await product.reload();

      const action_performed = req.body.active_flag ? "reactivated" : "deactivated";
      

      await Product_Activation_History.create({
        id: UUIDV4(),
        action_performed,
        update_description: `Product with id ${product.id} updated, flag set to ${action_performed}`,
        product_id: product.id
      });
     
      return this.response({
        data: {
          product
        },
        message: 'Product updated successfully'
      });

    } catch (error) {
      console.log(error.message);
      return this.serverErrorResponse(error);
    }
  }

  async deleteProduct(req) {
    try {
      const { id } = req.params;

      if (id) {

        const product = await Products.findByPk(id);

        if (!product) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "Product doesn't found"
          });
        }

        await product.destroy();

        return this.response({
          status: false,
          message: 'Deleted'
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'Product ID is required'
      });
    } catch (error) {
      console.log(error.message);
      return this.serverErrorResponse(error);
    }
  }
};
