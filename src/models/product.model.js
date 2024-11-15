import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
    userId: {type: String,required: true,ref: 'users'},
    rate: {type: Number,required: true},
    comment: {type: String,required: true},
},{_id: false , timestamps: false , versionKey: false});

const productSchema = new mongoose.Schema({
    name: {type: String,required: true},
    description: {type: String,required: true},
    category: {type: String,required: true},
    price: {type: Number,required: true},
    stock: {type: Number,required: true},
    image: {type: String,required: true},
    reviews: {type: reviewSchema,required: true,default: []},
    isDeleted: {type: Boolean,required: true,default: false}
},{timestamps: true , versionKey: false});