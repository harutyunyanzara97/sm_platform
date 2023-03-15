const ProductService = require("../services/ProductService");

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  async createProduct(req, res) {
    const data = await this.productService.createProduct(req);
    res.status(data.statusCode).json(data);
  }

  async getOneProduct(req, res) {
    const data = await this.productService.getOneProduct(req);
    res.status(data.statusCode).json(data);
  }

  async getAllProducts(req, res) {
    const data = await this.productService.getAllProducts(req);
    res.status(data.statusCode).json(data);
  }

  async updateProduct(req, res) {
    const data = await this.productService.updateProduct(req);
    res.status(data.statusCode).json(data);
  }

  async deleteProduct(req, res) {
    const data = await this.productService.deleteProduct(req);
    res.status(data.statusCode).json(data);
  }
}

module.exports = ProductController;
