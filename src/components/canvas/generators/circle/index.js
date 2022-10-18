export default function generateCircle(
  ctx,
  arr,
  delta,
  canvasHeight,
  canvasWidth,
  scale
) {
  for (const [x, y, r, params] of arr) {
    console.log("params:", params);
    console.log(Date.now() - params.timeDifference);
    if (
      y + delta.y + r + estimateDrop(Date.now() - params.timeDifference) <
      canvasHeight
    ) {
      if (
        y + delta.y + estimateDrop(Date.now() - params.timeDifference) < 50 ||
        x + delta.x < 50 ||
        x + delta.x > canvasWidth - 50
      ) {
        continue;
      }
      if (r + scale < 1) {
        draw(ctx, x + delta.x, y + delta.y, 1);
      } else {
        draw(
          ctx,
          x + delta.x,
          y + estimateDrop(Date.now() - params.timeDifference) + delta.y,
          r + scale
        );
      }
    } else {
      draw(
        ctx,
        x + delta.x,
        canvasHeight - r - scale,
        r + scale < 1 ? 1 : r + scale
      );
    }
  }
}

function draw(ctx, x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
}

function estimateDrop(time) {
  if (!time) return 0;
  return Math.pow(time * 0.001, 2) * 20;
}

function xOffset(time) {
  if (time < 3000) return -1;
  if (time < 6000) return 1;
}
