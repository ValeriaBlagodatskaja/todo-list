import image from "./image.png";

export default () => {
  const img = document.createElement("img");
  img.src = image;
  return img;
};
