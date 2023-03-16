const { Users, User_Update_History, Products } = require('../models/index');
const bcrypt = require('bcrypt');
const BaseService = require('./BaseService');
const { createToken, verifyToken } = require('../common/token');
const { v4: UUIDV4 } = require('uuid');
const { roles } = require("../common/roles");
const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');
const MailService = require('./mailService');
const mailService = new MailService();

module.exports = class AuthService extends BaseService {

  constructor() {
    super();
  }

  async signIn(req) {
    try {
      const err = this.handleErrors(req);
      if (err.hasErrors) {
        return err.body;
      }

      const { email, password } = req.body;

      const user = await Users.findOne({ where: { email } });

      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          const token = createToken({
            payload: {
              id: user.id
            },
            options: {
              expiresIn: '1h'
            }
          });

          user.password = undefined;

          return this.response({
            data: {
              token,
              user
            }
          });
        }
      }

      return this.response({
        statusCode: 400,
        status: false,
        message: 'Incorrect email and/or password'
      });

    } catch (error) {
      console.log(error);
      return this.serverErrorResponse(error);
    }
  }

  async createProductUser(req) {
    try {

      const { email, password, product_id } = req.body;

      const err = this.handleErrors(req);
      if(err.hasErrors) {
        return err.body;
      }

      const count = await Users.count({ where: { product_id } });
      
      if (count >= 5) {
        return this.response({
          status: false,
          statusCode: 409,
          message: "You can create max 5 Product Admins per product"
        });
      }

      const user = await Users.findOne({ where: { email } });

      if(user) {
        return this.response({
          status: false,
          statusCode: 409,
          message: 'User already exists'
        });
      }

      const passwordHashed = await bcrypt.hash(password, 10);

      function generateSecretHash(key) {
        const salt = randomBytes(8).toString('hex');
        const buffer = scryptSync(key, salt, 64);
        return `${buffer.toString('hex')}.${salt}`;
      }

      const apiKey = generateSecretHash(process.env.API_KEY_SECRET);

      const createUser = await Users.create({
        id: UUIDV4(),
        email,
        type: roles.productAdmin,
        password: passwordHashed,
        active_flag: 1,
        product_id,
        apiKey
      });

      if(createUser) {

        const token = createToken({
          payload: {
            id: createUser.id
          }
        });

        await User_Update_History.create({
          id: UUIDV4(),
          action_performed: "created",
          update_note: `User with id ${createUser.id} created`,
          user_id: createUser.id
        });

        const html = `Api_Key: ${apiKey}, <br> email: ${email}, <br> password: ${password}`

        mailService.sendMail(
          email,
          'User credentials',
          html
        );

        return this.response({
          data: {
            token
          },
          statusCode: 201,
          message: 'Product User Created',
        });
      }
    } catch (error) {
      console.log(error.message);
      return this.serverErrorResponse(error);
    }
  }

  async getOne(req) {
    try {
      const { id } = req.params;

      if (id) {
        const user = await Users.scope('withoutPassword').findByPk(id);

        if (!user) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "User doesn't found"
          });
        }

        return this.response({
          data: {
            user
          }
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'User ID is required'
      });
    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async getAll(req) {
    try {

      const users = await Users.scope('withoutPassword').findAll({
        include: {
        model: Products
      }});

      if (!users) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "Users doesn't found"
        });
      }

      return this.response({
        data: {
          users
        }
      });

    } catch (error) {
      console.log(error.message);
      return this.serverErrorResponse(error);
    }
  }

  async update(req) {
    try {

      const errors = this.handleErrors(req);

      if (errors.hasErrors) {
        return errors.body;
      }

      const { email, type, deactivated, deactivation_reason, active_flag, product_id, id } = req.body;

      if (!id) {
        return this.response({
          status: false,
          statusCode: 400,
          message: 'User ID is required'
        });
      }

      const user = await Users.findByPk(id);

      if (!user) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "User doesn't found"
        });
      }
      
      if (user.type === roles.superAdmin) {
        return this.response({
          status: false,
          statusCode: 400,
          message: "You are not allowed to manage this User"
        });
      }

      const action_performed = active_flag ? "reactivated" : "deactivated";

      await User_Update_History.create({
        id: UUIDV4(),
        action_performed,
        update_note: `User with id ${user.id} updated, flag set to ${action_performed}`,
        user_id: user.id
      });

      await Users.update({
        email,
        type,
        deactivated: !active_flag ? Date.now(): null,
        deactivation_reason,
        active_flag,
        product_id
      }, {
        where: { id }
      });

      return this.response({
        data: {
          user
        },
        message: 'User updated successfully'
      });

    } catch (error) {
      return this.serverErrorResponse(error);
    }
  }

  async delete(req) {
    try {
      const { id } = req.params;

      if (id) {

        const user = await Users.findByPk(id);

        if (!user) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "User doesn't found"
          });
        }

        if (user.type === roles.superAdmin) {
          return this.response({
            status: false,
            statusCode: 400,
            message: "You are not allowed to delete this User"
          });
        }

        await user.destroy();

        return this.response({
          status: true,
          message: 'Deleted'
        });
      }

      return this.response({
        status: false,
        statusCode: 400,
        message: 'User ID is required'
      });
    } catch (error) {
      console.log(error.message);
      return this.serverErrorResponse(error);
    }
  }

  async requestVerifyEmail(req) {
    try {
      const { email } = req.body;

      const user = await userModel.findOne({ email }).exec();

      if(!user) {
        return this.response({
          statusCode: 400,
          status: false,
          message: 'Invalid Email'
        });
      }

      const confirmationToken = createToken({
        payload: {
          email
        },
        secret: process.env.JWT_EMAIL_SECRET,
        options: {
          expiresIn: '2m'
        }
      });

      await userModel.updateOne({
        email,
        confirmationToken
      });

      const url = `verify-email?email=${email}&token=${confirmationToken}`;

      mailService.sendMail(
        email,
        url,
        'Email verification',
        'Please click to verify your email'
      );

      return this.response({
        message: 'Token was sent to email'
      });

    } catch(error) {
      return this.serverErrorResponse(error);
    }
  }

  async verifyEmail(req) {
    try {
      const { email, token } = req.body;
      if(
        token &&
        verifyToken({ token, secret: process.env.JWT_EMAIL_SECRET })
      ) {
        const isValidUser = await userModel.findOne({ email }).exec();

        if(!isValidUser) {
          return this.response({
            statusCode: 404,
            status: false,
            message: 'User does not  found'
          });
        }

        if(isValidUser.isVerified) {
          return this.response({
            message: 'User has already verified'
          });
        }

        const user = await userModel
          .findOne({
            email,
            confirmationToken: token
          })
          .exec();

        await userModel.updateOne({
          _id: user._id,
          isVerified: true,
          confirmationToken: null
        });

        return this.response({
          message: 'Email successfully confirmed'
        });

      } else {
        return this.response({
          status: false,
          statusCode: 401,
          message: 'Invalid or expire token'
        });
      }
    } catch(error) {
      return this.serverErrorResponse(error);
    }
  }

  async resendVerificationToken(req) {
    try {
      const { email } = req.body;

      const user = await userModel.findOne({ email }).exec();

      if(user) {
        const confirmationToken = createToken({
          payload: {
            email
          },
          secret: process.env.JWT_EMAIL_SECRET,
          options: {
            expiresIn: '2m'
          }
        });

        const url = `verify-email?email=${email}&token=${confirmationToken}`;

        await userModel.updateOne({
          email,
          confirmationToken
        });

        mailService.sendMail(
          email,
          url,
          'Email verification',
          'Please click to verify your email'
        );

        return this.response({
          message: 'Token was sent to email'
        });

      } else {
        return this.response({
          status: false,
          statusCode: 404,
          message: 'User does not found'
        });
      }
    } catch(error) {
      return this.serverErrorResponse(error);
    }
  }

  async verifyEmailOnResetPassword(req) {
    try {
      const { email } = req.body;
      const user = await userModel.findOne({ email }).exec();

      if(!user) {
        return this.response({
          status: false,
          statusCode: 404,
          message: 'User does not found'
        });
      }

      const confirmationToken = createToken({
        payload: {
          email
        },
        secret: process.env.JWT_PASSOWRD_RESET_SECRET,
        options: {
          expiresIn: '10m'
        }
      });

      const updateUserConfirmationToken = await userModel.updateOne({
        email,
        confirmationToken
      });

      if(updateUserConfirmationToken) {
        const url = `reset-password?email=${email}&token=${confirmationToken}`;

        mailService.sendMail(
          email,
          url,
          'Reset Password',
          'Please click to reset your password'
        );
      }

      return this.response({
        status: false,
        message: "Token was sent to email"
      });
    } catch(error) {
      return this.serverErrorResponse(error);
    }
  }

  async resetPassword(req) {
    try {
      const validationError = this.handleErrors(req);
      if(validationError.hasErrors) {
        return validationError.body;
      }

      const { password } = req.body;

      const token = req?.headers?.authorization?.split(' ')[1] || null;
      const isTokenValid = verifyToken({
        token,
        secret: process.env.JWT_PASSOWRD_RESET_SECRET
      });

      if(isTokenValid) {
        const { email } = isTokenValid;
        const user = await userModel.findOne({ email });

        if(!user) {
          return this.response({
            status: false,
            statusCode: 404,
            message: "User does not found"
          });
        }

        const resetUserPassword = await userModel.updateOne({
          email,
          password,
          confirmationToken: null
        });

        if(resetUserPassword) {
          return this.response({
            status: false,
            statusCode: 200,
            message: "Password reset successfully"
          });
        }
      } else {
        return this.response({
          status: false,
          statusCode: 401,
          message: "Invalid token"
        });
      }
    } catch(error) {
      return this.serverErrorResponse(error)
    }
  }
};
