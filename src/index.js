import "./style.css";

import { getAllProjects, addProject } from "./localStorage/projects";
import { showElement, hideElement } from "../utils/hideElement";

import project from "./views/project";

const showAddProjectFormBtn = document.getElementById("showAddProjectForm");
const projectForm = document.getElementById("projectForm");
const cancelProjectButton = document.getElementById("cancelProjectButton");
const mainArea = document.getElementById("mainArea");

const taskModal = document.getElementById("taskModal");
const addTask = document.getElementById("addTask");
const closeModalButton = document.getElementById("closeModal");

function displayProjectList() {
  const projects = getAllProjects();
  const projectList = document.getElementById("projectList");
  projectList.innerHTML = "";

  projects.forEach(({ name }) => {
    const li = document.createElement("li");
    const projectButton = document.createElement("button");
    projectButton.textContent = name;

    projectButton.addEventListener("click", () => {
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
}

function displayInMainArea(projectName) {
  mainArea.innerHTML = "";
  const projectContainer = project(projectName);
  mainArea.appendChild(projectContainer);
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

  if (projectName) {
    addProject({ name: projectName, todos: [] });
    displayProjectList();
    displayInMainArea(projectName);
    displayAddTaskButton();

    projectForm.reset();
    hideElement(projectForm);
    showElement(showAddProjectFormBtn);
  }
});
