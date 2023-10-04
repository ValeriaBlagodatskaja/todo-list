const STORAGE_KEY = "projects";

export const getAllProjects = () => {
  const projects = localStorage.getItem(STORAGE_KEY);
  console.log(projects);
  if (projects) {
    console.log(JSON.parse(projects));
    return JSON.parse(projects);
  }
  return [];
};

export const addProject = (project) => {
  const projects = getAllProjects();
  console.log("projects", projects);
  console.log("project", project);
  projects.push(project);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const removeProject = (projectName) => {
  const projects = localStorage.getItem(STORAGE_KEY);
  const filteredProjects = projects.filter(
    (project) => project.name === projectName
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProjects));
};
