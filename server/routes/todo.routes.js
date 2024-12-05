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

todoRouter
.route('/')
.get(fetchTodos)
.post(addTask)
.delete(clearTodos);

todoRouter
.route('/:id')
.get(getTaskById);
.put(markTaskAsDone);
.patch(markTaskAsNotDone);
.delete(removeTodo);

todoRouter.put("/task/:id", editTaskById);

module.exports = todoRouter;
