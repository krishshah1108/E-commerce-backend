import jwt from "jsonwebtoken";
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: `${process.env.JWT_EXPIRY}d`,
  });
};

const extractPublicIdForCloudImages = (dbImageUrl) => {
  const regex = /(?<=\/upload\/v\d+\/)([^\/]+)(?=\.)/;
  const matches = dbImageUrl.match(regex);
  return matches ? matches[0] : null;  // Return the public ID if match found, else null
};



const helperUtil = {
  generateToken,
  extractPublicIdForCloudImages,
};

export default helperUtil;
