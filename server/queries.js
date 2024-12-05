const getTodos = "SELECT * FROM todo";
const getTodoById = "SELECT * FROM todo WHERE id = $1";
const createTodo = "INSERT INTO todo (task) VALUES ($1) RETURNING *";
const markTodoAsDone =
  "UPDATE todo SET done = true, updatedAt = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *";
const markTodoAsNotDone =
  "UPDATE todo SET done = false, updatedAt = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *";
const deleteTodo = "DELETE FROM todo WHERE id = $1 RETURNING *";
const clearAllTodos = [
  "BEGIN",
  "DELETE FROM todo",
  "ALTER SEQUENCE todo_id_seq RESTART WITH 1",
  "COMMIT",
];
const updateTaskById = "UPDATE todo SET task = $1 WHERE id = $2 RETURNING *"

module.exports = {
  getTodos,
  getTodoById,
  createTodo,
  markTodoAsDone,
  markTodoAsNotDone,
  deleteTodo,
  clearAllTodos,
  updateTaskById
};
