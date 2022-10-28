import visible from "./visible";

export default function draw({ ctx, figures, scroll, scale, view, selected }) {
  for (const key in figures) {
    if (figures[key].type === "leave") {
      drawLeave({
        figure: figures[key],
        ctx,
      });
    }
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
      if (figures[key].type === "circle") {
        drawCircle({
          figure: figures[key],
          ctx,
          selected: key === selected,
          scale,
        });
      }
      if (figures[key].type === "triangle") {
        drawTriangle({
          figure: figures[key],
          ctx,
          selected: key === selected,
          scale,
        });
      }
    }
  }
}

function drawCircle({ ctx, figure, selected, scale }) {
  const [x, y, r] = figure.coordinates;
  ctx.strokeStyle = selected ? "red" : "black";
  ctx.beginPath();
  ctx.arc(x * scale, y * scale, r * scale, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
}

function drawTriangle({ ctx, figure, selected, scale }) {
  const [a, b, c] = figure.coordinates;
  ctx.strokeStyle = selected ? "red" : "black";
  ctx.beginPath();
  ctx.moveTo(a[0] * scale, a[1] * scale);
  ctx.lineTo(b[0] * scale, b[1] * scale);
  ctx.lineTo(c[0] * scale, c[1] * scale);
  ctx.closePath();
  ctx.stroke();
}

function drawLeave({ ctx, figure }) {
  const [x, y, width] = figure.coordinates;
  const angle = figure.animation.rotation.angle;

  ctx.save();
  ctx.translate(x + width / 2, y + width / 2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.translate(-x - width / 2, -y - width / 2);

  ctx.drawImage(figure.img, x, y, width, width);
  ctx.restore();
}
