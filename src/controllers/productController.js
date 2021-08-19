import mongoose from "mongoose"
import { ProductSchema } from "src/schema/productSchema"

const Product = mongoose.model("Product", ProductSchema)
const MAX_LIMIT = 50
const OFF_SET = 10

export const addNewProduct = async (req, res) => {
  try {
    let newProduct = new Product(req.body)

    const doc = await newProduct.save()
    res.send(doc)
  } catch (e) {
    res.end("Something went wrong!!", e)
  }
}

export const getAllProducts = async (req, res) => {
  try {
    const { offset, limit } = req.query || {}

    const doc = await Product.find()
      .sort("id")
      .skip(+offset ?? OFF_SET)
      .limit(+limit ?? MAX_LIMIT)
    res.send(doc)
  } catch (e) {
    res.send(`Something went wrong!! ${e}`)
  }
}

export const updateProductById = async (req, res) => {
  try {
    const requestId = req?.params?.productId
    const filter = { id: requestId }
    const options = {
      new: true,
      upsert: true,
    }
    const document = req.body
    document["id"] = requestId

    const doc = await Product.findOneAndUpdate(filter, req.body, options)
    res.send(doc)
  } catch (e) {
    res.end("something went wrong !! ", e)
  }
}

export const getProductById = async (req, res) => {
  try {
    const filter = { id: req?.params?.productId }
    const doc = await Product.findOne(filter)
    if (doc) {
      res.send(doc)
    } else {
      res.json({
        status: "success",
        message: "No products found",
      })
    }
  } catch (e) {
    res.end("something went wrong !!")
  }
}

export const deleteProductById = async (req, res) => {
  try {
    const filter = { id: req?.params?.productId }

    const doc = await Product.deleteOne(filter)
    if (doc?.deletedCount == 0) {
      res.json({
        status: "failure",
        message: "Product not found",
      })
    } else {
      res.json({
        status: "success",
        message: "Product deleted successfully",
      })
    }
  } catch (e) {
    res.end("something went wrong !!")
  }
}

export const runProductFeed = (req, res) => {
  const { productFixture } = require("src/fixtures/product/fixture")

  const newProductDocuments = productFixture.map((item) => {
    const upsertDoc = {
      updateOne: {
        filter: { id: item.id },
        update: { $set: item },
        upsert: true,
      },
    }
    return upsertDoc
  })

  Product.collection
    .bulkWrite(newProductDocuments)
    .then((bulkWriteOpResult) => {
      res.json({
        status: "success",
        message: "All the fields updated successfully",
      })
    })
    .catch((err) => {
      res.json({
        status: "failure",
        message: err,
      })
    })
}
