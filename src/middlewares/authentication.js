import jwt from "jsonwebtoken";
import response from "../utils/response_util.js";
import encryptorUtil from "../utils/encryptor_util.js";

const isCompanyAuthenticated = async (req, res, next) => {
  try {
    const beaerHeader = req.headers.authorization;
    if (beaerHeader) {
      const bearerToken = beaerHeader.split(" ")[1];
      const decryptedToken = encryptorUtil.decrypt(bearerToken);
      jwt.verify(decryptedToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return response.unAuthorized(res);
        } else {
          req.companyId = decoded.companyId;
          next();
        }
      });
    } else {
      return response.unAuthorized(res);
    }
  } catch (error) {
    console.log(error);
    return response.failure(error, res);
  }
};

const authentication = {
  isCompanyAuthenticated,
};

export default authentication;
