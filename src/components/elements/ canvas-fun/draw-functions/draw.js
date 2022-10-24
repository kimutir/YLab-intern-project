import visible from "./visible";

export default function draw({ ctx, figures, scroll, scale, view, selected }) {
  for (const key in figures) {
    if (
      visible({
        figure: figures[key],
        border: {
          x1: scroll.x / scale,
          x2: (view.width + scroll.x) / scale,
          y1: scroll.y / scale,
          y2: (view.height + scroll.y) / scale,
        },
      })
    ) {
      if (figures[key].type === "circle")
        drawCircle({
          figure: figures[key],
          ctx,
          selected: key === selected,
        });
    }
  }
}

function drawCircle({ ctx, figure, selected }) {
  const [x, y, r] = figure.coordinates;
  ctx.strokeStyle = selected ? "red" : "black";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
}

function drawDots() {}
