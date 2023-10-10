const STORAGE_KEY = "projects";

export class Todo {
  constructor(title, description, dueDate, priority, checklist = []) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.checklist = checklist;
  }

  displayTodo() {
    console.log(`${this.title} - ${this.description} - Due: ${this.dueDate}`);
  }
}

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
  console.log("Added project:", project);
  console.log("All projects after adding:", projects);
};

export const addTask = (projectName, todo) => {
  const projects = getAllProjects();
  const project = projects.find((proj) => proj.name === projectName);
  console.log("All projects:", projects);
  console.log("Current project:", project);

  if (project && Array.isArray(project.todos)) {
    project.todos.push(todo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    console.log(`Task '${todo.title}' added to project '${projectName}'.`);
  } else {
    console.log(`Project '${projectName}' not found.`);
  }
};

export const removeProject = (projectName) => {
  const projects = getAllProjects();
  const filteredProjects = projects.filter((proj) => proj.name !== projectName);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProjects));
};

export const removeTask = (projectName, taskName) => {
  const projects = getAllProjects();
  const project = projects.find((proj) => proj.name === projectName);
  if (project) {
    project.todos = project.todos.filter((task) => task !== taskName);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};
