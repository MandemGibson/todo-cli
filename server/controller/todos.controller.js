const client = require("../db");
const {
  getTodos,
  getTodoById,
  createTodo,
  markTodoAsDone,
  markTodoAsNotDone,
  deleteTodo,
  clearAllTodos,
  updateTaskById,
} = require("../queries");

async function fetchTodos(req, res) {
  try {
    const result = await client.query(getTodos);

    result.rowCount === 0 &&
      res.status(200).json({ message: "No tasks found" });

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
}

async function getTaskById(req, res) {
  try {
    const { id } = req.params;
    const result = await client.query(getTodoById, [id]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching tasks" });
  }
}

async function addTask(req, res) {
  try {
    const { task } = req.body;
    const result = await client.query(createTodo, [task]);

    res
      .status(200)
      .json({ message: `'${result.rows[0].task}' has been added` });
  } catch (error) {
    res.status(500).json({ error: "An error occured while creating task" });
  }
}

async function editTaskById(req, res) {
  try {
    const { id } = req.params;
    const { task } = req.body;

    const result = await client.query(
      updateTaskById,
      [task, id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while editing task" });
  }
}

async function markTaskAsDone(req, res) {
  try {
    const { id } = req.params;
    const result = await client.query(markTodoAsDone, [id]);

    result.rows.length === 0
      ? res.status(404).json({
          message: `No task with id ${id} found.`,
        })
      : res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while marking task as done" });
  }
}

async function markTaskAsNotDone(req, res) {
  try {
    const { id } = req.params;
    const result = await client.query(markTodoAsNotDone, [id]);

    result.rows.length === 0
      ? res.status(404).json({
          message: `No task with id ${id} found.`,
        })
      : res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occured while marking task as done" });
  }
}

async function removeTodo(req, res) {
  try {
    const { id } = req.params;
    const result = await client.query(deleteTodo, [id]);

    result.rows.length === 0
      ? res.status(404).json({
          message: `No task with id ${id} found.`,
        })
      : res
          .status(200)
          .json({ message: `Deleted task '${result.rows[0].task}'` });
  } catch (error) {
    res.status(500).json({ error: "An error occured while deleting task" });
  }
}

async function clearTodos(req, res) {
  try {
    await client.query(clearAllTodos[0]);
    await client.query(clearAllTodos[1]);
    await client.query(clearAllTodos[2]);
    await client.query(clearAllTodos[3]);
    res.status(200).send({ message: "Deleted all tasks" });
  } catch (error) {
    console.error(error.stack);
    res.status(500).json({ error: "An error occured while deleting task" });
  }
}

module.exports = {
  fetchTodos,
  getTaskById,
  addTask,
  editTaskById,
  markTaskAsDone,
  markTaskAsNotDone,
  removeTodo,
  clearTodos,
};
