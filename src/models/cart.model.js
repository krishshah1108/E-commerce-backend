import mongoose from "mongoose";

const productAddedToCart = new mongoose.Schema({
    productId : { type: mongoose.Schema.Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
},{_id: false ,versionKey: false});

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
    products: { type: [productAddedToCart],required: true, default: [] },
    totalAmount: { type: Number, required: true },
    isCheckedOut: { type: Boolean, required: true, default: false }
});

const Cart = mongoose.model("carts", cartSchema);

export default Cart