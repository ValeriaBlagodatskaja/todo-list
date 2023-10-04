export const showElement = (element) => {
  element.classList.add("show");
  element.classList.remove("hide");
};

export const hideElement = (element) => {
  element.classList.add("hide");
  element.classList.remove("show");
};
