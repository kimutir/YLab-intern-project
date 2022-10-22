export default function draw({ ctx, figures, scroll, scale, cursor }) {
  for (const figure in figures) {
    if (figures[figure].type === "circle")
      drawCircle({ params: figures[figure], scale, scroll, ctx });
  }
}

function drawCircle({ ctx, params, scale, scroll }) {
  const [x, y, r] = params.coordinates;
  console.log("scroll:", scroll);
  ctx.save();
  ctx.translate(scroll.x, scroll.y);
  ctx.beginPath();
  ctx.scale(scale, scale);
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawDots() {}