function project(projectName) {
  const projectContainer = document.createElement("div");
  projectContainer.textContent = projectName;
  return projectContainer;
}

export default project;
