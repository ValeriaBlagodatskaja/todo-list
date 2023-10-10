function task(todo) {
  const taskContainer = document.createElement("div");
  taskContainer.textContent = `${todo.title} - ${todo.description} - Due: ${todo.dueDate} - Priority: ${todo.priority}`;

  const taskButtonContainer = document.createElement("div");
  taskButtonContainer.className = "taskButtonContainer";

  const taskEditButton = document.createElement("button");
  taskEditButton.textContent = "Edit";

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
