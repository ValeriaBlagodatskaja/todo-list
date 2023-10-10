import "./style.css";

import {
  getAllProjects,
  addProject,
  addTask,
  Todo,
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

const taskDialog = document.getElementById("taskDialog");
const closeModalButton = document.getElementById("closeModal");
const taskName = document.getElementById("taskName");
const taskForm = document.getElementById("taskForm");

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
      const taskDescription = document.getElementById("taskDescription").value;
      const taskDueDate = document.getElementById("taskDueDate").value;
      const taskPriority = document.getElementById("taskPriority").value;

      let newTask = new Todo(
        taskValue,
        taskDescription,
        taskDueDate,
        taskPriority
      );
      if (taskValue) {
        hideElement(taskDialog);
        addTask(currentProject, newTask);
        const taskContainer = task(newTask);
        mainArea.appendChild(taskContainer);
      }
    });
    isTaskFormInitialized = true;
  }
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
      const taskItem = task(todo);
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
