import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true, ref: "products" },
  userId: { type: String, required: true, ref: "users" },
  ratingStar: { type: Number, required: true, default: 0, min: 0, max: 5 },
  comment: { type: String, required: true },
});

const Review = mongoose.model("reviews", reviewSchema);

export default Review;
