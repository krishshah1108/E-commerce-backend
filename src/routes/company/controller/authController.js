import models from "../../../models/zindex.js";
import response from "../../../utils/response_util.js";
import bcrypt from "bcryptjs";

const companyRegistration = async (req, res) => {
    try {
        const {name,email,mobileNo,address,password,registrationNumber,GSTIN } = req.body;
        if(!name || !email || !mobileNo || !address || !password || !registrationNumber || !GSTIN){
            return response.validationErr("All fields are required", res);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newCompany = new models.Company({
            name,
            email,
            mobileNo,
            address,
            password : hashedPassword,
            registrationNumber,
            GSTIN
        });
        await newCompany.save();
        return response.success("Company registered successfully", newCompany, res);
    } catch (error) {
        return response.failure(error, res);
    }
}

const companyLogin = async (req, res) => {
    try {
        const {userField,password} = req.body;
        if(!userField || !password){
            return response.validationErr("All fields are required", res);
        }
        const companyFound = await models.Company.findOne({$or:[{email:userField},{mobileNo:userField}]});
        if(!companyFound){
            return response.badRequest('Invalid credentials',res);
        }
        const passwordMatch = await bcrypt.compare(password, companyFound.password);
        if(!passwordMatch){
            return response.badRequest('Invalid credentials',res);
        }
        return response.success("Company login successful", companyFound, res);
        
    } catch (error) {
        return response.failure(error, res);
    }
}

const authController = {
    companyRegistration,
    companyLogin
}

export default authController