export default function generateCircle(
  ctx,
  arr,
  delta,
  canvasHeight,
  canvasWidth,
  scale,
  animationLifeTime
) {
  for (const [x, y, r, params] of arr) {
    if (
      y +
        delta.y +
        r +
        estimateDrop(animationLifeTime - params.timeDifference) <
      canvasHeight
    ) {
      if (
        y + delta.y + estimateDrop(animationLifeTime - params.timeDifference) <
          50 ||
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
          y + estimateDrop(animationLifeTime - params.timeDifference) + delta.y,
          r + scale
        );
      }
    } else {
      draw(ctx, x + delta.x, canvasHeight - r - scale, r + scale);
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
