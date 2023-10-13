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
    console.log(`${this.title} - ${this.description} - ${this.dueDate}`);
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

  if (project && Array.isArray(project.todos)) {
    project.todos.push(todo);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } else {
    console.log(`Project '${projectName}' not found.`);
  }
};

export function getTodaysTasks() {
  const allProjects = getAllProjects();
  const today = Date.today().toString("yyyy-MM-dd");
  let todaysTasks = [];

  allProjects.forEach((project) => {
    const projectTodaysTasks = project.todos.filter(
      (task) => task.dueDate === today
    );
    todaysTasks = todaysTasks.concat(projectTodaysTasks);
  });

  return todaysTasks;
}

function stripTimeFromDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getStartOfWeek(date) {
  const startOfWeek = new Date(date);
  const dayOfWeek = startOfWeek.getDay();
  const difference = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // if it's Sunday, subtract 6 days, otherwise adjust to Monday
  startOfWeek.setDate(date.getDate() + difference);
  return stripTimeFromDate(startOfWeek);
}

function getEndOfWeek(date) {
  const endOfWeek = new Date(date);
  endOfWeek.setDate(endOfWeek.getDate() + 6);
  return stripTimeFromDate(endOfWeek);
}

export function getWeeksTasks() {
  const allProjects = getAllProjects();
  const today = new Date();
  const startOfWeek = getStartOfWeek(today);
  const endOfWeek = getEndOfWeek(startOfWeek);

  let weeksTasks = [];

  allProjects.forEach((project) => {
    const projectWeeksTasks = project.todos.filter((task) => {
      const taskDate = stripTimeFromDate(new Date(task.dueDate));
      return taskDate >= startOfWeek && taskDate <= endOfWeek;
    });
    weeksTasks = weeksTasks.concat(projectWeeksTasks);
  });
  return weeksTasks;
}
export const removeProject = (projectName) => {
  const projects = getAllProjects();
  const filteredProjects = projects.filter((proj) => proj.name !== projectName);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredProjects));
};

export const removeTask = (projectName, taskName) => {
  const projects = getAllProjects();
  const project = projects.find((proj) => proj.name === projectName);
  if (project) {
    console.log("Before removing:", project.todos);
    project.todos = project.todos.filter((task) => task.title !== taskName);
    console.log("After removing:", project.todos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    console.log("Updated Projects:", JSON.stringify(projects));
  }
};

export function updateTaskInLocalStorage(originalTitle, updatedTitle) {
  const projects = getAllProjects();

  for (let project of projects) {
    for (let i = 0; i < project.todos.length; i++) {
      if (project.todos[i].title === originalTitle) {
        project.todos[i].title = updatedTitle;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
        return;
      }
    }
  }
}
