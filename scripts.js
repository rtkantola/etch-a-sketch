const container = document.querySelector("#container");
const btn = document.querySelectorAll("#btn");
const put = document.getElementById("scroller");
const sidebar = document.querySelector("#sidebar");
const gridSize = document.querySelector("#grid-size");
const apply = document.querySelector("#apply");
gridSize.textContent = "16 x 16";
let size = 16;
const rainbowColours = [
  "#E81416",
  "#FFA500",
  "#FAEB36",
  "#79C314",
  "#487DE7",
  "#4B369D",
  "#70369D",
];
let black = false;
let rainbow = false;

let createGrid = (size) => {
  for (let i = 0; i < size; i++) {
    const column = document.createElement("div");

    column.className = "column";
    container.appendChild(column);
    for (let j = 0; j < size; j++) {
      const row = document.createElement("div");
      row.style.heigth = 480 / size + "px";
      row.style.width = 480 / size + "px";
      row.id = `row-${i}`;
      row.className = "row";
      row.textContent = "";
      row.style.background = "white";

      container.appendChild(row);
    }
  }
};


let changeToBlack = (cell) => {
  cell.style.background = "black";
};
let changeToRainbow = (cell) => {
  cell.style.background = getRandomColour();
  cell.style.opacity = "1";
};
let getRandomColour = () => {
  const random = Math.floor(Math.random() * rainbowColours.length);
  return random, rainbowColours[random];
};

// eventhandlers
put.addEventListener("input", function (e) {
  gridSize.textContent = e.target.value + " x " + e.target.value;
  size = e.target.value;
});

let deleteGrid = () => {
  while (container.firstChild) {
    container.removeChild(container.lastChild);
  }
};
apply.addEventListener("click", () => {
  deleteGrid();
  createGrid(size);
  createListeners();
});
let createListeners = () => {
  container.childNodes.forEach((cell) => {
    cell.addEventListener("mouseover", () => {
      if (black == true) {
        changeToBlack(cell);
      }
      if (rainbow == true) {
        changeToRainbow(cell);
      }
    });
  });
  btn.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.name == "black") {
          black = true;
          rainbow = false;
      } else if (button.name == "rainbow") {
          black = false;
          rainbow = true;
      } else {
          container.childNodes.forEach((cell) => {
          cell.style.background = "white";
          black = false;
          rainbow = false;
        });
      }
    });
  });
};
createGrid(size);
createListeners();

