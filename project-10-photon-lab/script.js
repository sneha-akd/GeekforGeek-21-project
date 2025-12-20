const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasContainer = document.getElementById("canvasContainer");
const fileInput = document.getElementById("fileInput");
const canvasMessage = document.getElementById("canvasMessage");

const brightnessInput = document.getElementById("brightness-input");
const contrastInput = document.getElementById("contrast-input");
const saturationInput = document.getElementById("saturation-input");
const blurInput = document.getElementById("blur-input");
const grayScaleButton = document.getElementById("grayscale-btn");
const sepiaButton = document.getElementById("sepia-btn");
const resetButton = document.getElementById("reset-btn");
const downloadButton = document.querySelector(".downloadImgBtn");

let image = new Image();
let sepia = false;

// 👈 Open file chooser when clicking container
canvasContainer.addEventListener("click", () => {
  fileInput.click();
});

// 👈 Handle file selection
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  canvasMessage.style.display = "none"; // hide text

  const reader = new FileReader();
  reader.onload = () => {
    image.src = reader.result;
  };
  reader.readAsDataURL(file);
});

// 👈 Draw image when loaded
image.onload = () => {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0);
};

// 👈 Filters
function applyFilters() {
  if (!image.src) return;

  ctx.filter = `
    brightness(${brightnessInput.value}%)
    contrast(${contrastInput.value}%)
    saturate(${saturationInput.value}%)
    blur(${blurInput.value}px)
    sepia(${sepia ? 100 : 0}%)
  `;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(image, 0, 0);
}

function applyGrayScale() {
  saturationInput.value = 0;
  applyFilters();
}

function applySepiaEffect() {
  sepia = !sepia;
  applyFilters();
}

function resetCanvas() {
  brightnessInput.value = 100;
  contrastInput.value = 100;
  saturationInput.value = 100;
  blurInput.value = 0;
  sepia = false;
  applyFilters();
}

function downloadCanvasImage() {
  const link = document.createElement("a");
  link.download = "photon-lab.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}

// 👈 Events
brightnessInput.addEventListener("input", applyFilters);
contrastInput.addEventListener("input", applyFilters);
saturationInput.addEventListener("input", applyFilters);
blurInput.addEventListener("input", applyFilters);
grayScaleButton.addEventListener("click", applyGrayScale);
sepiaButton.addEventListener("click", applySepiaEffect);
resetButton.addEventListener("click", resetCanvas);
downloadButton.addEventListener("click", downloadCanvasImage);
