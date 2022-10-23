import isVisible from "./isVisible";

export default function draw({ ctx, figures, scroll, scale, cursor, view }) {
  for (const figure in figures) {
    if (
      isVisible({
        figure: figures[figure],
        border: {
          x1: scroll.x / scale,
          x2: (view.width + scroll.x) / scale,
          y1: scroll.y / scale,
          y2: (view.height + scroll.y) / scale,
        },
      })
    ) {
      if (figures[figure].type === "circle")
        drawCircle({ figure: figures[figure], ctx });
    }
  }
}

function drawCircle({ ctx, figure }) {
  const [x, y, r] = figure.coordinates;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
}

function drawDots() {}
