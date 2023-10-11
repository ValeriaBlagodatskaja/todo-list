import "./style.css";

import {
  getAllProjects,
  addProject,
  addTask,
  Todo,
  getTodaysTasks,
  getWeeksTasks,
  removeProject,
  removeTask,
  updateTaskInLocalStorage,
} from "./localStorage/projects";
import { showElement, hideElement } from "../utils/hideElement";

import project from "./views/project";
import task from "./views/task";

let currentProject = "";
let isTaskFormInitialized = false;

const showAddProjectFormBtn = document.getElementById("showAddProjectForm");
const projectForm = document.getElementById("projectForm");
const cancelProjectButton = document.getElementById("cancelProjectButton");
const mainArea = document.getElementById("mainArea");
const todayButton = document.getElementById("todayButton");
const weekButton = document.getElementById("weekButton");

const taskDialog = document.getElementById("taskDialog");
const closeModalButton = document.getElementById("closeModal");
const taskName = document.getElementById("taskName");
const taskForm = document.getElementById("taskForm");
const taskDescription = document.getElementById("taskDescription");
const taskDueDate = document.getElementById("taskDueDate");
const taskPriority = document.getElementById("taskPriority");

function displayProjectList() {
  const projects = getAllProjects();
  const projectList = document.getElementById("projectList");
  projectList.innerHTML = "";

  projects.forEach(({ name }) => {
    const li = document.createElement("li");
    const projectButton = document.createElement("button");
    projectButton.textContent = name;

    projectButton.addEventListener("click", () => {
      currentProject = name;
      displayInMainArea(name);
      displayAddTaskButton();
    });

    li.appendChild(projectButton);
    projectList.appendChild(li);
  });
}

let editingTodoIndex = null;

function displayAddTaskButton() {
  const addTaskBtn = document.createElement("button");
  addTaskBtn.id = "addTaskBtnMain";
  addTaskBtn.textContent = "+ Add Task";

  mainArea.appendChild(addTaskBtn);

  addTaskBtn.addEventListener("click", () => {
    taskName.value = "";
    showElement(taskDialog);
  });

  closeModalButton.addEventListener("click", () => {
    hideElement(taskDialog);
  });

  if (!isTaskFormInitialized) {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const taskValue = taskName.value;
      const taskDesc = taskDescription.value;
      const taskDue = taskDueDate.value;
      const taskPrio = taskPriority.value;

      let newTask = new Todo(taskValue, taskDesc, taskDue, taskPrio);
      if (editingTodoIndex !== null) {
        // Edit the existing todo
        const projects = getAllProjects();
        const currentProjectObj = projects.find(
          (p) => p.name === currentProject
        );
        currentProjectObj.todos[editingTodoIndex] = newTask;

        // Save it
        localStorage.setItem("projects", JSON.stringify(projects));
        editingTodoIndex = null; // Reset the editing index
      } else {
        // Create a new task
        addTask(currentProject, newTask);
      }

      hideElement(taskDialog);
      displayInMainArea(currentProject);
      displayAddTaskButton();
    });
    isTaskFormInitialized = true;
  }
}

function handleEditTask(editingTodo) {
  taskName.value = editingTodo.title;
  taskDescription.value = editingTodo.description;
  taskDueDate.value = editingTodo.dueDate;
  Date(editingTodo.value).toString("d-MMM-yyyy");
  taskPriority.value = editingTodo.priority;

  const projects = getAllProjects();
  const currentProjectObj = projects.find((p) => p.name === currentProject);
  editingTodoIndex = currentProjectObj.todos.findIndex(
    (t) =>
      t.title === editingTodo.title && t.description === editingTodo.description
  );
  // Show the modal
  showElement(taskDialog);
}

function displayInMainArea(projectName) {
  mainArea.innerHTML = "";
  const projectContainer = project(projectName);
  mainArea.appendChild(projectContainer);

  const selectedProject = getAllProjects().find(
    (proj) => proj.name === projectName
  );

  if (selectedProject && selectedProject.todos.length) {
    selectedProject.todos.forEach((todo) => {
      const taskItem = task(todo, handleEditTask);
      mainArea.appendChild(taskItem);
    });
  }
}
document.addEventListener("DOMContentLoaded", displayProjectList);

showAddProjectFormBtn.addEventListener("click", () => {
  hideElement(showAddProjectFormBtn);
  showElement(projectForm);
});

cancelProjectButton.addEventListener("click", () => {
  hideElement(projectForm);
  showElement(showAddProjectFormBtn);
});

projectForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const projectName = document.getElementById("projectName").value;
  console.log("Project Name:", projectName);
  console.log("Task Name:", taskName.value);

  if (projectName && projectName.trim() !== "") {
    addProject({ name: projectName, todos: [] });
    currentProject = projectName;
    displayProjectList();
    displayInMainArea(projectName);
    displayAddTaskButton();

    projectForm.reset();
    hideElement(projectForm);
    showElement(showAddProjectFormBtn);
  }
});

todayButton.addEventListener("click", () => {
  const tasksForToday = getTodaysTasks();
  mainArea.innerHTML = ""; // clear the main area
  tasksForToday.forEach((todoItem) => {
    const taskElement = task(todoItem);
    mainArea.appendChild(taskElement);
  });
});

weekButton.addEventListener("click", () => {
  const tasksForWeek = getWeeksTasks();
  mainArea.innerHTML = "";
  tasksForWeek.forEach((todoItem) => {
    const taskElement = task(todoItem);
    mainArea.appendChild(taskElement);
  });
});
