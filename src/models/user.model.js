import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    street: {type: String,required: true},
    pinCode: {type: String,required: true},
    city: {type: String,required: true},
    state: {type: String,required: true},
},{_id: false , timestamps: false , versionKey: false});

const userSchema = new mongoose.Schema({
  name: {type: String,required: true},
  mobileNo: {type: String,required: true,unique: true},
  address: {type: addressSchema,required: true},
  isDeleted: {type: Boolean,required: true,default: false}
},{timestamps: true, versionKey: false});

const User = mongoose.model('users', userSchema);

export default User
