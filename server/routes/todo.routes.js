const { Router } = require("express");
const {
  fetchTodos,
  getTaskById,
  addTask,
  editTaskById,
  markTaskAsDone,
  markTaskAsNotDone,
  removeTodo,
  clearTodos,
} = require("../controller/todos.controller");
const todoRouter = Router();

todoRouter.get("/", fetchTodos);
todoRouter.get("/:id", getTaskById);
todoRouter.post("/", addTask);
todoRouter.put("/task/:id", editTaskById);
todoRouter.put("/:id", markTaskAsDone);
todoRouter.patch("/:id", markTaskAsNotDone);
todoRouter.delete("/", clearTodos);
todoRouter.delete("/:id", removeTodo);

module.exports = todoRouter;
