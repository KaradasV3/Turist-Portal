import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  try {
    if (!req.headers.authorization) throw new Error("Not authorized");

    const token = req.headers.authorization.split(" ")[1];
    const privateKey = process.env.PRIVATE_KEY_FOR_TOKENS;

    jwt.verify(token, privateKey, err => {
      if (err) throw new Error("Not authorized");
      return next();
    });
  } catch (ex) {
    next(ex);
  }
};

export default authenticate;