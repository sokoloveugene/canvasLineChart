const data = [2, 2, 6, 6, 10, 10, 10, 4, 12];

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

const form = document.getElementById("form");

const fieldWidth = canvas.offsetWidth;
const fieldHeight = canvas.offsetHeight;

const paint = () => {
  ctx.clearRect(0, 0, fieldWidth, fieldHeight);

  const max = Math.max(...data);
  const min = Math.min(...data);

  getHeight = (num) => {
    return fieldHeight - (num * fieldHeight * 0.9) / max;
  };

  const stepWidth = fieldWidth / (data.length + 2);

  getWidthCoord = (idx) => {
    return stepWidth * (idx + 1);
  };

  getNumByYCoord = (coord) => {
    return ((fieldHeight - coord) * max) / (fieldHeight * 0.9);
  };

  ctx.font = "20px Arial";
  ctx.fillStyle = "#000000";
  ctx.fillText(max.toString(), 3, getHeight(max));
  ctx.fillText(min.toString(), 3, getHeight(min));

  data.forEach((num, idx, arr) => {
    ctx.lineCap = "square";
    ctx.fillStyle = "#f96d6d";
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 3;

    ctx.moveTo(getWidthCoord(idx), fieldHeight);
    ctx.lineTo(getWidthCoord(idx), getHeight(num));
    ctx.stroke();

    ctx.lineTo(getWidthCoord(idx + 1), getHeight(arr[idx + 1]));
    ctx.stroke();

    ctx.lineTo(getWidthCoord(idx + 1), fieldHeight);
    ctx.stroke();
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 1;
    ctx.moveTo(getWidthCoord(idx), 0);
    ctx.lineTo(getWidthCoord(idx), fieldHeight);
    ctx.stroke();

    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.arc(getWidthCoord(idx), getHeight(num), 3, 0, 2 * Math.PI);
    ctx.fill();
  });

  ctx.strokeStyle = "#cccccc";

  ctx.beginPath();
  ctx.moveTo(0, getHeight(min));
  ctx.lineTo(fieldWidth, getHeight(min));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, getHeight(max));
  ctx.lineTo(fieldWidth, getHeight(max));
  ctx.stroke();
};

paint();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { elements } = e.currentTarget;

  const enteredNumber = elements.num.value;

  if (enteredNumber.trim()) {
    data.push(Number(enteredNumber));
    paint();
  }

  e.currentTarget.reset();
});
