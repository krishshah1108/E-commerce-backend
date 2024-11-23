import models from "../../../models/zindex.js";
import response from "../../../utils/response_util.js";
import encryptorUtil from "../../../utils/encryptor_util.js";
import helperUtil from "../../../utils/helper_util.js";

const companyRegistration = async (req, res) => {
    try {
        const {name,email,mobileNo,address,password,registrationNumber,GSTIN } = req.body;
        if(!name || !email || !mobileNo || !address || !password || !registrationNumber || !GSTIN){
            return response.validationErr("All fields are required", res);
        }
        const hashedPassword = encryptorUtil.encrypt(password);
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
        const token = helperUtil.generateToken({companyId : newCompany._id});
        const encryptedToken = encryptorUtil.encrypt(token);    
        return response.success("Company registered successfully", encryptedToken, res);
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
        const passwordMatch = encryptorUtil.decrypt(companyFound.password) === password;
        if(!passwordMatch){
            return response.badRequest('Invalid credentials',res);
        }
        const token = helperUtil.generateToken({companyId : companyFound._id});
        const encryptedToken = encryptorUtil.encrypt(token);    
        return response.success("Company login successful", encryptedToken, res);
        
    } catch (error) {
        return response.failure(error, res);
    }
}

const authController = {
    companyRegistration,
    companyLogin
}

export default authController