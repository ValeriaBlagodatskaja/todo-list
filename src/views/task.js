import "datejs";

function task(todo, onEdit) {
  const taskContainer = document.createElement("div");
  let formattedDate = todo.dueDate
    ? Date.parse(todo.dueDate).toString("dd-MMM-yyyy")
    : "No due date";
  taskContainer.textContent = `${todo.title} - ${todo.description} - ${formattedDate} - Priority: ${todo.priority}`;

  const taskButtonContainer = document.createElement("div");
  taskButtonContainer.className = "taskButtonContainer";

  const taskEditButton = document.createElement("button");
  taskEditButton.textContent = "Edit";
  taskEditButton.addEventListener("click", () => {
    if (typeof onEdit === "function") {
      onEdit(todo);
    }
  });

  const taskDeleteButton = document.createElement("button");
  taskDeleteButton.textContent = "Delete";
  taskDeleteButton.addEventListener("click", () => {
    taskContainer.innerHTML = "";
  });

  taskButtonContainer.appendChild(taskEditButton);
  taskButtonContainer.appendChild(taskDeleteButton);
  taskContainer.appendChild(taskButtonContainer);

  return taskContainer;
}
export default task;
