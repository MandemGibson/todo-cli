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

// todoRouter.get("/", fetchTodos);
// todoRouter.get("/:id", getTaskById);
// todoRouter.post("/", addTask);
// todoRouter.put("/task/:id", editTaskById);
// todoRouter.put("/:id", markTaskAsDone);
// todoRouter.patch("/:id", markTaskAsNotDone);
// todoRouter.delete("/", clearTodos);
// todoRouter.delete("/:id", removeTodo);

todoRouter.route("/").get(fetchTodos).post(addTask).delete(clearTodos);
todoRouter.route("/task/:id").put(editTaskById);
todoRouter
  .route("/:id")
  .get(getTaskById)
  .put(markTaskAsDone)
  .patch(markTaskAsNotDone)
  .delete(removeTodo);

module.exports = todoRouter;
