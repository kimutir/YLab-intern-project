export default function generateRectangle(
  ctx,
  arr,
  delta,
  canvasHeight,
  canvasWidth,
  scale,
  animationLifeTime
) {
  ctx.lineWidth = 10;
  for (const [x, y, width, height, params] of arr) {
    if (
      y +
        delta.y +
        height +
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
      if (scale + width < 1 || scale + height < 1) {
        // можно доработать уменьшение
        ctx.strokeRect(x + delta.x, y + delta.y, 1, 1);
      } else {
        ctx.strokeRect(
          x + delta.x - scale / 2,
          y +
            delta.y -
            scale / 2 +
            estimateDrop(animationLifeTime - params.timeDifference),
          width + scale,
          height + scale
        );
      }
    } else {
      ctx.strokeRect(
        x + delta.x - scale / 2,
        canvasHeight - height - scale / 2,
        width + scale,
        height + scale / 2
      );
    }
  }
}

function estimateDrop(time) {
  if (!time) return 0;
  return Math.pow(time * 0.001, 2) * 20;
}
