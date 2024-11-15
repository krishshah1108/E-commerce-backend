import models from "../../../models/zindex.js";
import response from "../../../utils/response_util.js";

const userRegistration = async (req, res) => {
    try {
        const {name,mobileNo,address } = req.body;
        if(!name || !mobileNo || !address){
            return response.validationErr("All fields are required", res);
        }
        const newUser = new models.User({
            name,
            mobileNo,
            address
        });
        await newUser.save();
        return response.success("User registered successfully", newUser, res);
    }catch(error){
        return response.failure(error, res);
    }
}

const auhtController = {
    userRegistration
}

export default auhtController