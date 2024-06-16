const {Router} = require("express")
const apiRouter = Router()

const todoRouter = require("./todo.routes")

apiRouter.use("/todos", todoRouter)

module.exports = apiRouter