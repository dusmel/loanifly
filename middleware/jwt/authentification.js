import jwt from "jsonwebtoken";
import keys from "./keys";

const token = {
  generate(payload) {
    return `bearer ${jwt.sign(payload, keys.secret, { expiresIn: "1h" })}`;
  },
  verify(userToken, res) {
    try {
      const user = jwt.verify(userToken, keys.secret);
      return {
        status: true,
        data: user
      };
    } catch (error) {
      return {
        status: false,
        message: "Authentification failed."
      };
    }
  }
};

export default token;
