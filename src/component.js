export default (text = "I Hate Webpack!") => {
  const element = document.createElement("h1");

  element.innerHTML = text;

  return element;
};
