export default function generateCircle(
  ctx,
  arr,
  delta,
  bottom,
  scale,
  animationLifeTime
) {
  for (const [x, y, r, params] of arr) {
    if (
      y +
        delta.y +
        r +
        estimateDrop(animationLifeTime - params.timeDifference) <
      bottom
    ) {
      if (r + scale < 1) {
        ctx.beginPath();
        ctx.arc(x + delta.x, y + delta.y, 1, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(
          x + delta.x,
          y + estimateDrop(animationLifeTime - params.timeDifference) + delta.y,
          r + scale,
          0,
          2 * Math.PI
        );
        ctx.closePath();
        ctx.stroke();
      }
    } else {
      ctx.beginPath();
      ctx.arc(x + delta.x, bottom - r, r, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }
}

function estimateDrop(time) {
  if (!time) return 0;
  return Math.pow(time * 0.001, 2) * 20;
}
