const { Router } = require("express");
const apiRouter = Router();

const todoRouter = require("./todo.routes");
const authRouter = require("./auth.routes")

apiRouter.use("/", authRouter)
apiRouter.use("/todos", todoRouter);

module.exports = apiRouter;
