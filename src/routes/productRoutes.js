import {
  addNewProduct,
  getAllProducts,
  runProductFeed,
  getProductById,
  deleteProductById,
  updateProductById,
} from "src/controllers/productController"

export const productRoutes = (app) => {
  app
    .route("/product")
    // Add new item
    .post(addNewProduct)
    // get all items
    .get(getAllProducts)

  app
    .route("/productfeed")
    // To run the feed to store all the products
    .get(runProductFeed)

  app
    // to get particular item
    .route("/product/:productId")
    .get(getProductById)
    .delete(deleteProductById)
    .post(updateProductById)
}
