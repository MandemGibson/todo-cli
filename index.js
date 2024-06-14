const { program } = require("commander");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "todo.json");

const readToDos = () => {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const data = fs.readFileSync(filePath);

  return JSON.parse(data);
};

const writeToDos = (todos) => {
  fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
};

program
  .command("add <tasks>")
  .description("Add new task")
  .action((task) => {
    const todos = readToDos();

    todos.push({ task, done: false });
    writeToDos(todos);
    console.log(`Added task: "${task}"`);
  });

program
  .command("list")
  .description("List all todos")
  .action(() => {
    const todos = readToDos();
    if (todos.length === 0) {
      console.log("No tasks found");
      return;
    }
    todos.forEach((todo, index) =>
      console.log(`${index + 1}. [${todo.done ? "x" : ""}] ${todo.task}`)
    );
  });

program
  .command("done <index>")
  .description("Mark a task as done")
  .action((index) => {
    const todos = readToDos();
    if (index > todos.length || index < 1) {
      console.log("Invalid task number");
      return;
    }
    todos[index - 1].done = true;
    writeToDos(todos);
    console.log(`Task ${index} marked as done`);
  });

program
  .command("remove <index>")
  .description("Remove task")
  .action((index) => {
    const todos = readToDos();
    if (index > todos.length || index < 1) {
      console.log("Invalid task number");
      return;
    }
    todos.splice(index - 1, 1);
    writeToDos(todos);
    console.log(`Task ${index} has been removed`);
  });

program
  .command("clear")
  .description("Remove all tasks")
  .action(() => {
    const todos = readToDos();
    todos.length = 0;
    writeToDos(todos);
    console.log("All tasks have been removed");
  });

program.parse(process.argv);
