import { IDraw, IPrimitive, IField } from "../type";
import visible from "./visible";

export default function draw({
  ctx,
  figures,
  scroll,
  scale,
  view,
  selected,
}: IDraw) {
  // рисуем - очищаем поле
  drawField({ ctx, scroll, view });

  // рисуем примитивы
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
      if (figures[key].type === "leaf") {
        drawLeaf({
          figure: figures[key],
          ctx,
          scale,
        });
      }
      if (figures[key].type === "circle") {
        drawCircle({
          figure: figures[key],
          ctx,
          selected: Number(key) === selected,
          scale,
        });
      }
      if (figures[key].type === "triangle") {
        drawTriangle({
          figure: figures[key],
          ctx,
          selected: Number(key) === selected,
          scale,
        });
      }
    }
  }
}

function drawCircle({ ctx, figure, selected, scale }: IPrimitive) {
  const [x, y, r] = figure.coordinates;
  ctx.strokeStyle = selected ? "red" : "black";
  ctx.beginPath();
  ctx.arc(x * scale, y * scale, r * scale, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
}

function drawTriangle({ ctx, figure, selected, scale }: IPrimitive) {
  const [a, b, c] = figure.coordinates;
  ctx.strokeStyle = selected ? "red" : "black";
  ctx.beginPath();
  ctx.moveTo(a[0] * scale, a[1] * scale);
  ctx.lineTo(b[0] * scale, b[1] * scale);
  ctx.lineTo(c[0] * scale, c[1] * scale);
  ctx.closePath();
  ctx.stroke();
}

function drawLeaf({ ctx, figure, scale }: IPrimitive) {
  const [x, y, width] = figure.coordinates;
  const angle = figure.animation.rotation.angle;
  if (y > 210) {
    ctx.globalAlpha = 210 / y;
  }
  ctx.save();

  ctx.translate(x * scale + width / 2, y * scale + width / 2);
  ctx.rotate((angle * Math.PI) / 180);
  ctx.translate(-x * scale - width / 2, -y * scale - width / 2);

  ctx.drawImage(figure.img, x * scale, y * scale, width, width);
  ctx.restore();
}

function drawField({ ctx, scroll, view }: IField) {
  ctx.fillStyle = "aliceblue";
  ctx.fillRect(0, 0, view.width, view.height);
  ctx.translate(-scroll.x, -scroll.y);
}
