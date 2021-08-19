import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import { productRoutes } from "src/routes/productRoutes"
const app = express()

async function initServer(options) {
  if (!options) {
    console.log("initServer - Configs is not available ", options)
    return false
  }

  const { PORT } = options

  await mongoose.connect("mongodb://localhost:27017/products", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(bodyParser.json())

  productRoutes(app)

  // app.get("/*", async (req, res) => {
  //   await getPageData({ req, res, ...options })
  // })

  app.listen(PORT, () => {
    console.log(`server is listening on PORT - ${PORT}`)
  })
}

function initI18n(options) {}

async function getPageData(options) {
  const { req, res } = options

  res.send("hello world !!!")
}

export { initServer, app }
