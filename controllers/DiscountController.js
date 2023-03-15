const DiscountService = require("../services/DiscountService");

class DiscountController {
  constructor() {
    this.discountService = new DiscountService();
  }

  async create(req, res) {
    const data = await this.discountService.create(req);
    res.status(data.statusCode).json(data);
  }

  async getOne(req, res) {
    const data = await this.discountService.getOne(req);
    res.status(data.statusCode).json(data);
  }

  async getAll(req, res) {
    const data = await this.discountService.getAll(req);
    res.status(data.statusCode).json(data);
  }

  async update(req, res) {
    const data = await this.discountService.update(req);
    res.status(data.statusCode).json(data);
  }

  async delete(req, res) {
    const data = await this.discountService.delete(req);
    res.status(data.statusCode).json(data);
  }
}

module.exports = DiscountController;
