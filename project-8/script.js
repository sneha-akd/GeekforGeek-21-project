const colorInput = document.getElementById("strokeColor");
const brushSizeInput = document.getElementById("brushSize");
const penBtn = document.getElementById("pen");
const eraserBtn = document.getElementById("eraser");
const squareBtn = document.getElementById("square");
const rectBtn = document.getElementById("rect");
const circleBtn = document.getElementById("circle");
const triangleBtn = document.getElementById("triangle");
const hexBtn = document.getElementById("hexagon");
const cleanUpBtn = document.getElementById("cleanup");
const downloadImageBtn = document.getElementById("downloadImage");

const canvas = document.getElementById("canvas");
canvas.height = 400;
canvas.width = 800;

const ctx = canvas.getContext("2d");

let currentTool = "pen";
ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "#000000";

let isdrawing = false;
let startX = 0;
let startY = 0;

function startDraw(e) {
  isdrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;

  if (
    currentTool === "rect" ||
    currentTool === "circle" ||
    currentTool === "triangle" ||
    currentTool === "hexagon" ||
    currentTool === "square"
  ) {
    return;
  }

  ctx.beginPath();
  ctx.moveTo(startX, startY);
}

function draw(e) {
  if (!isdrawing) return;
  if (
    currentTool === "rect" ||
    currentTool === "circle" ||
    currentTool === "triangle" ||
    currentTool === "hexagon" ||
    currentTool === "square"
  )
    return;

  ctx.strokeStyle = currentTool === "eraser" ? "#ffffff" : colorInput.value;
  ctx.lineWidth = brushSizeInput.value;

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
}

function stopDraw(e) {
  if (!isdrawing) return;

  let endX = e.offsetX;
  let endY = e.offsetY;
  let width = endX - startX;
  let height = endY - startY;

  ctx.strokeStyle = colorInput.value;
  ctx.lineWidth = brushSizeInput.value;

  // SQUARE
  if (currentTool === "square") {
    let side = Math.min(Math.abs(width), Math.abs(height));
    ctx.strokeRect(startX, startY, width < 0 ? -side : side, height < 0 ? -side : side);
  }

  // RECTANGLE
  if (currentTool === "rect") {
    ctx.strokeRect(startX, startY, width, height);
  }

  // CIRCLE
  if (currentTool === "circle") {
    let radius = Math.sqrt(width * width + height * height);
    ctx.beginPath();
    ctx.arc(startX, startY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }

  // TRIANGLE
  if (currentTool === "triangle") {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.lineTo(startX - (endX - startX), endY);
    ctx.closePath();
    ctx.stroke();
  }

  // HEXAGON
  if (currentTool === "hexagon") {
    let radius = Math.sqrt(width * width + height * height);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      let angle = (Math.PI / 3) * i;
      let x = startX + radius * Math.cos(angle);
      let y = startY + radius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  isdrawing = false;
}

/* ---------------- BUTTON EVENTS ---------------- */

function activateTool(tool, btn) {
  currentTool = tool;
  document.querySelectorAll(".activeBtn").forEach(b => b.classList.remove("activeBtn"));
  btn.classList.add("activeBtn");
}

penBtn.onclick = () => activateTool("pen", penBtn);
eraserBtn.onclick = () => activateTool("eraser", eraserBtn);
squareBtn.onclick = () => activateTool("square", squareBtn);
rectBtn.onclick = () => activateTool("rect", rectBtn);
circleBtn.onclick = () => activateTool("circle", circleBtn);
triangleBtn.onclick = () => activateTool("triangle", triangleBtn);
hexBtn.onclick = () => activateTool("hexagon", hexBtn);

cleanUpBtn.onclick = () => ctx.clearRect(0, 0, canvas.width, canvas.height);

downloadImageBtn.onclick = () => {
  const link = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = link;
  a.download = "Drawing.png";
  a.click();
};

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseleave", stopDraw);
