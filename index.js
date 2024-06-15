const { program } = require("commander");
const path = require("path");
const {
  addTodo,
  client,
  fetchTodos,
  markTaskAsDone,
  removeTodo,
  clearTodos,
  markTaskANotsDone,
} = require("./db");

program
  .command("add <tasks>")
  .description("Add new task")
  .action((task) => {
    addTodo(task);
  });

program
  .command("list")
  .description("List all todos")
  .action(() => {
    fetchTodos();
  });

program
  .command("done <index>")
  .description("Mark a task as done")
  .action((index) => {
    const todos = markTaskAsDone(index);
    if (index > todos.length || index < 1) {
      console.log("Invalid task number");
      return;
    }
  });

program
  .command("undone <index>")
  .description("Mark a task as not done")
  .action((index) => {
    const todos = markTaskANotsDone(index);
    if (index > todos.length || index < 1) {
      console.log("Invalid task number");
      return;
    }
  });

program
  .command("remove <index>")
  .description("Remove task")
  .action((index) => {
    const todos = removeTodo(index);
    if (index > todos.length || index < 1) {
      console.log("Invalid task number");
      return;
    }
  });

program
  .command("clear")
  .description("Remove all tasks")
  .action(() => {
    clearTodos();
  });

program.parse(process.argv);
