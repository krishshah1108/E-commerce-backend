import mongoose from "mongoose";

const varientSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      enum: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
    },
    color: { type: String, required: true },
    stock: { type: Number, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: true },
    images: { type: [String], required: true },
    material: { type: String, required: true, default: null },
  },
  { timestamps: false, versionKey: false }
);

const productSchema = new mongoose.Schema(
  {
    companyId: { type: String, required: true, ref: "companies" },
    productCode: { type: String, required: true },
    name: { type: String, required: true },
    brandName: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    type: {
      type: String,
      enum: ["Men", "Women", "Unisex", "Kids"],
      required: true,
    },
    varient: { type: [varientSchema], required: true, default: [] },
    extraDetails: { type: mongoose.Schema.Types.Mixed, required: true, default: {} },
    isHidden : { type: Boolean, required: true, default: false },
    inStock: { type: Boolean, required: true, default: true },
    isDeleted: { type: Boolean, required: true, default: false },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("products", productSchema);
