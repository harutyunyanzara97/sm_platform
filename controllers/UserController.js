const UserService = require("../services/UserService");

class AuthenticationController {

  constructor() {
    this.userService = new UserService()
  }

  async createProductUser(req, res) {
    const data = await this.userService.createProductUser(req);
    res.status(data.statusCode).json(data);
  }

  async signIn(req, res) {
    const data = await this.userService.signIn(req);
    res.status(data.statusCode).json(data);
  }

  async getOne(req, res) {
    const data = await this.userService.getOne(req);
    res.status(data.statusCode).json(data);
  }

  async getAll(req, res) {
    const data = await this.userService.getAll(req);
    res.status(data.statusCode).json(data);
  }

  async update(req, res) {
    const data = await this.userService.update(req);
    res.status(data.statusCode).json(data);
  }

  async delete(req, res) {
    const data = await this.userService.delete(req);
    res.status(data.statusCode).json(data);
  }

  async requestVerifyEmail(req, res) {
    const data = await this.authService.requestVerifyEmail(req);
    res.status(data.statusCode).json(data);
  }

  async verifyEmail(req, res) {
    const data = await this.authService.verifyEmail(req);
    res.status(data.statusCode).json(data);
  }

  async resendVerificationToken(req, res) {
    const data = await this.authService.resendVerificationToken(req);
    res.status(data.statusCode).json(data);
  }

  async verifyEmailOnResetPassword(req, res) {
    const data = await this.authService.verifyEmailOnResetPassword(req);
    res.status(data.statusCode).json(data);
  }

  async resetPassword(req, res) {
    const data = await this.authService.resetPassword(req);
    res.status(data.statusCode).json(data);
  }
}

module.exports = AuthenticationController;
