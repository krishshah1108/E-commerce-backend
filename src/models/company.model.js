import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: {type: String,required: true},
    pinCode: {type: String,required: true},
    city: {type: String,required: true},
    state: {type: String,required: true},
},{_id: false , timestamps: false , versionKey: false});

const companySchema = new mongoose.Schema({
    name: {type: String,required: true},
    email: {type: String,required: true,unique: true},
    mobileNo: {type: String,required: true,unique: true},
    address :{type: addressSchema,required: true},
    password: {type: String,required: true},
    registrationNumber : {type: String,required: true},
    GSTIN: {type: String,required: true,unique: true},
    status:{type: String,enum: ['approved', 'rejected','pending','inactive'],required: true,default: 'pending'},
    isApproved: {type: Boolean,required: true,default: false},
    isDeleted: {type: Boolean,required: true,default: false}
},{timestamps: true, versionKey: false});

const Company = mongoose.model('companies', companySchema);

export default Company