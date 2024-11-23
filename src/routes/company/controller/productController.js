import models from "../../../models/zindex.js";
import response from "../../../utils/response_util.js";
import cloudinaryConfig from "../../../core/cloudinaryConfig.js";
import cloudinary from "cloudinary";
import fs from "fs";
import helperUtil from "../../../utils/helper_util.js";
import _ from 'lodash'

const addProduct = async (req, res) => {
  try {
    cloudinaryConfig();
    const {productCode, name, brandName,description, category, type, varient } = req.body;
    if (!productCode || !name || !description || !brandName || !category || !type || !varient) {
      return response.validationErr("All fields are required", res);
    }

    return response.success("Product added successfully", 1, res);
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    return response.failure(error, res);
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.body.productId;
    const existingProduct = await models.Product.findById(productId);

    if (!existingProduct || existingProduct.isDeleted === true) {
      return response.notFound(res);
    }

    const deleteProduct = await models.Product.findByIdAndUpdate(productId, { isDeleted: true }, { new: true });
    const publicId = helperUtil.extractPublicIdForCloudImages(deleteProduct.image);
    // console.log(publicId);
    
    await cloudinary.uploader.destroy(publicId);
    return response.success("Product deleted successfully", 1, res);

  } catch (error) {
    return response.failure(error, res);
  }
};

const viewOwnProducts = async (req, res) => {
  try {
    const companyId = req.companyId;
    const companyProducts = await models.Product.find({ companyId });
    if(_.isEmpty(companyProducts)){
      return response.success("No products found", companyProducts, res);
    }
    return response.success("Products fetched successfully", companyProducts, res);
    
  } catch (error) {
    console.error(error);
    return response.failure(error, res); 
  }
}




const productController = {
  addProduct,
  deleteProductById,
  viewOwnProducts
};

export default productController;
