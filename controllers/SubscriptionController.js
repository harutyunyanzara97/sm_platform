const SubscriptionService = require("../services/SubscriptionService");

class SubscriptionController {
  constructor() {
    this.subscriptionService = new SubscriptionService();
  }

  async create(req, res) {
    const data = await this.subscriptionService.create(req);
    res.status(data.statusCode).json(data);
  }

  async getOne(req, res) {
    const data = await this.subscriptionService.getOne(req);
    res.status(data.statusCode).json(data);
  }

  async getAll(req, res) {
    const data = await this.subscriptionService.getAll(req);
    res.status(data.statusCode).json(data);
  }

  async update(req, res) {
    const data = await this.subscriptionService.update(req);
    res.status(data.statusCode).json(data);
  }

  async delete(req, res) {
    const data = await this.subscriptionService.delete(req);
    res.status(data.statusCode).json(data);
  }
}

module.exports = SubscriptionController;
