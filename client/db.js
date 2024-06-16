require("dotenv").config();
const { Client } = require("pg");

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

client
  .connect()
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Error connecting to database: ", err.stack));

async function closeConnection() {
  try {
    client.end();
    console.log("Connection ended");
  } catch (error) {
    console.error("Error closing connection: ", err.stack);
  }
}

async function fetchTodos() {
  try {
    res = await client.query("SELECT * FROM todo");
    if (res.rowCount === 0) {
      console.log("No tasks found");
      return;
    }

    const taskArray = res.rows.map(
      (row) => `${row.id}. ${row.task} [${row.done ? "x" : ""}]`
    );

    taskArray.forEach((task) => {
      console.log(task);
    });
  } catch (error) {
    console.error("Error fetching todos: ", error.stack);
  } finally {
    closeConnection();
  }
}

async function addTodo(values) {
  try {
    res = await client.query("INSERT INTO todo(task) VALUES($1) RETURNING *", [
      values,
    ]);
    console.log(`Added new task: "${res.rows[0].task}"`);
  } catch (error) {
    console.error(error);
  } finally {
    closeConnection();
  }
}

async function markTaskAsDone(id) {
  try {
    res = await client.query(
      "UPDATE todo SET done = true, updatedAt = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
      [id]
    );

    res.rows.length === 0
      ? console.log(
          `No task with id ${id} found.\nRun list to know the available tasks`
        )
      : console.log(`Marked "${res.rows[0].task}" as done`);
  } catch (error) {
    console.error("Error marking task as done: ", error.stack);
  } finally {
    closeConnection();
  }
}

async function markTaskANotsDone(id) {
  try {
    res = await client.query(
      "UPDATE todo SET done = false, updatedAt = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *",
      [id]
    );

    res.rows.length === 0
      ? console.log(
          `No task with id ${id} found.\nRun list to know the available tasks`
        )
      : console.log(`Marked "${res.rows[0].task}" as not done`);
  } catch (error) {
    console.error("Error marking task as done: ", error.stack);
  } finally {
    closeConnection();
  }
}

async function removeTodo(id) {
  try {
    res = await client.query("DELETE FROM todo WHERE id = $1 RETURNING *", [
      id,
    ]);

    res.rows.length === 0
      ? console.log(
          `No task with id ${id} found.\nRun list to know the available tasks`
        )
      : console.log(`Deleted task "${res.rows[0].task}"`);
  } catch (error) {
    console.error("Error deleting task: ", error.stack);
  } finally {
    closeConnection();
  }
}

async function clearTodos() {
  try {
    await client.query("DELETE FROM todo");
    await client.query("ALTER SEQUENCE todo_id_seq RESTART WITH 1");
    console.log("Cleared all tasks");
  } catch (error) {
    console.error("Error clearing todos: ", error.stack);
  } finally {
    closeConnection();
  }
}

module.exports = {
  client,
  addTodo,
  fetchTodos,
  markTaskAsDone,
  markTaskANotsDone,
  removeTodo,
  clearTodos,
};
