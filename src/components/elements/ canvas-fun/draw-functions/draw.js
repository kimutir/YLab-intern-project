export default function draw({ ctx, figures, scroll, scale, cursor }) {
  for (const figure in figures) {
    if (figures[figure].type === "circle")
      drawCircle({ params: figures[figure], scale, scroll, ctx });
  }
}

function drawCircle({ ctx, params }) {
  const [x, y, r] = params.coordinates;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
}

function drawDots() {}
