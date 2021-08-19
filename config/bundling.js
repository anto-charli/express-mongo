import webpack from "webpack"
import webpackDevConfig from "./webpack.dev.js"
import { initServer, app } from "src/App/App"

const PORT = process.env.PORT || 5000

function compileDevServer(options) {
  const { compiler } = options
  const webpackDevMiddleware = require("webpack-dev-middleware")

  app.use(
    webpackDevMiddleware(compiler, {
      stats: "errors-warnings",
      publicPath: "/dist/client",
      // writeToDisk(filePath) {
      //   return true
      // },
    })
  )

  initServer(options)
}

function compileWebPackDevServer() {
  const compiler = webpack(webpackDevConfig)
  compileDevServer({
    compiler,
    PORT,
  })
}

compileWebPackDevServer()
