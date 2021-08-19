import mongoose from "mongoose"

const Schema = mongoose.Schema

export const ProductSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  regularPrice: {
    type: Number,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
})
