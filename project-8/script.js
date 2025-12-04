

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const strokeColor = document.getElementById("strokeColor");
const fillColor = document.getElementById("fillColor");
const brushRange = document.getElementById("brushRange");
const brushValueDisplay = document.getElementById("brushValue");
const penBtn = document.getElementById("pen");
const eraserBtn = document.getElementById("eraser");
const shapeSelect = document.getElementById("shapeSelect");
const undoBtn = document.getElementById("undo");
const redoBtn = document.getElementById("redo");
const cleanupBtn = document.getElementById("cleanup");
const downloadBtn = document.getElementById("downloadImage");

let currentTool = "pen";
let isDrawing = false;
let startX = 0;
let startY = 0;

let undoStack = [];
let redoStack = [];
let previewImg = null;

function saveState() {
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  redoStack = [];
  if (undoStack.length > 50) undoStack.shift();
}

penBtn.onclick = () => { currentTool = "pen"; activate(penBtn); }
eraserBtn.onclick = () => { currentTool = "eraser"; activate(eraserBtn); }
shapeSelect.onchange = () => { currentTool = shapeSelect.value || "pen"; activate(shapeSelect); }

brushRange.oninput = () => { brushValueDisplay.textContent = brushRange.value + " px"; }

undoBtn.onclick = () => {
  if (!undoStack.length) return;
  redoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  const img = undoStack.pop();
  ctx.putImageData(img, 0, 0);
}

redoBtn.onclick = () => {
  if (!redoStack.length) return;
  undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  const img = redoStack.pop();
  ctx.putImageData(img, 0, 0);
}

cleanupBtn.onclick = () => {
  saveState();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

downloadBtn.onclick = () => {
  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = "Drawing.png";
  link.click();
}

function activate(btn) {
  document.querySelectorAll(".activeBtn").forEach(b => b.classList.remove("activeBtn"));
  btn.classList.add("activeBtn");
}

// MOUSE EVENTS
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const rect = canvas.getBoundingClientRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;
  if (currentTool === "pen" || currentTool === "eraser") {
    saveState();
    ctx.beginPath();
    ctx.moveTo(startX, startY);
  } else {
    previewImg = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (!isDrawing) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  if (currentTool === "pen" || currentTool === "eraser") {
    ctx.lineWidth = brushRange.value;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = currentTool === "eraser" ? "#ffffff" : strokeColor.value;
    ctx.lineTo(x, y);
    ctx.stroke();
    return;
  }

  // Shapes preview
  if (previewImg) ctx.putImageData(previewImg, 0, 0);
  drawShape(ctx, currentTool, startX, startY, x, y, true);
});

canvas.addEventListener("mouseup", finishDraw);
canvas.addEventListener("mouseleave", finishDraw);

function finishDraw(e) {
  if (!isDrawing) return;
  isDrawing = false;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  if (currentTool !== "pen" && currentTool !== "eraser") {
    saveState();
    drawShape(ctx, currentTool, startX, startY, x, y, false);
  }
}
function parseColor(color, alpha = 1) {
  // If already in rgba, keep alpha and override
  if (color.startsWith("rgba")) {
    // Extract original r,g,b
    const parts = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
    if (!parts) return color;
    const r = parts[1], g = parts[2], b = parts[3];
    return `rgba(${r},${g},${b},${alpha})`;
  }

  // If hex (#RGB or #RRGGBB)
  color = color.replace("#", "");
  if (color.length === 3) color = color.split("").map(h => h + h).join("");
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}


// SHAPE DRAWING
function drawShape(ctx, tool, x1, y1, x2, y2, isPreview) {
  const w = x2 - x1;
  const h = y2 - y1;

  ctx.beginPath();
  switch (tool) {
    case "rect": ctx.rect(x1, y1, w, h); break;
    case "square":
      let s = Math.min(Math.abs(w), Math.abs(h));
      ctx.rect(x1, y1, w < 0 ? -s : s, h < 0 ? -s : s);
      break;
    case "circle":
      const radius = Math.sqrt(w * w + h * h);
      ctx.arc(x1, y1, radius, 0, Math.PI * 2);
      break;
    case "ellipse":
      ctx.ellipse(x1, y1, Math.abs(w), Math.abs(h), 0, 0, Math.PI * 2);
      break;
    case "triangle":
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x1 - (x2 - x1), y2);
      ctx.closePath();
      break;
    case "pentagon": drawPolygon(ctx, x1, y1, x2, y2, 5); return;
    case "hexagon": drawPolygon(ctx, x1, y1, x2, y2, 6); return;
    case "parallelogram":
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2 + 50, y1);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x1 - 50, y2);
      ctx.closePath();
      break;
    case "rhombus":
      ctx.moveTo(x1, y1 - h);
      ctx.lineTo(x1 + w, y1);
      ctx.lineTo(x1, y1 + h);
      ctx.lineTo(x1 - w, y1);
      ctx.closePath();
      break;
  }

  // Fill semi-transparent, stroke fully visible
  ctx.fillStyle = parseColor(fillColor.value, 0.5);
  ctx.strokeStyle = parseColor(strokeColor.value, 1);
  ctx.lineWidth = brushRange.value;
  ctx.fill();
  ctx.stroke();
}

// POLYGON DRAWING
function drawPolygon(ctx, x1, y1, x2, y2, sides) {
  const r = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = i * 2 * Math.PI / sides - Math.PI / 2;
    const px = x1 + r * Math.cos(angle);
    const py = y1 + r * Math.sin(angle);
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();

  ctx.fillStyle = parseColor(fillColor.value, 0.5); // semi-transparent fill
  ctx.strokeStyle = parseColor(strokeColor.value, 1); // solid stroke
  ctx.lineWidth = brushRange.value;
  ctx.fill();
  ctx.stroke();
}

