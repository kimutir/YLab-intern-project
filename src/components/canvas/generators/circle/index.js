export default function generateCircle(
  ctx,
  arr,
  delta,
  bottom,
  scale,
  dropStep
) {
  for (const [x, y, r, params] of arr) {
    console.log("params:", params);
    if (y + delta.y + r + dropStep[params.index] < bottom) {
      if (r + scale < 1) {
        ctx.beginPath();
        ctx.arc(x + delta.x, y + delta.y, 1, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(
          x + delta.x,
          y + dropStep[params.index] + delta.y,
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
