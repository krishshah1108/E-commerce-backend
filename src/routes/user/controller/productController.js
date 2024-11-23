import response from "../../../utils/response_util";
import models from "../../../models/zindex";
import _ from 'lodash'

const viewAllProducts = async (req, res) => {
    try {
        const allProducts = await models.Product.find({});
        if(_.isEmpty(allProducts)){
            return response.success("No products found", allProducts, res);
        }
        return response.success("Products fetched successfully", allProducts, res);
    } catch (error) {
        console.error(error);
        return response.failure(error, res);
    }
}



const productController = {
    viewAllProducts
}

export default productController;