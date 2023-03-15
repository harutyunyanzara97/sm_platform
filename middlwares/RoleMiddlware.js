const jwt = require("jsonwebtoken");
const { Users } = require("../models/index");

const roleAuth = (...roles) => {
  return async (req, res, next) => {
    const token =
      req?.cookies?.accessToken ||
      req?.headers?.authorization?.split(" ")[1] ||
      null;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET, {
          algorithms: ["HS256"],
        });
        
        const user = await Users.findByPk(payload.id);
        
        if (!roles.includes(user.type)) {
          return res.status(403).send("Unauthorized");
        }

        next();
      } catch (err) {
        console.log(err);
        res.status(401).send("Unauthorized");
      }
    } else {
      res.status(401).send("Unauthorized");
    }
  };
};

module.exports = { roleAuth };
