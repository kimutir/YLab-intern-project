export default function generateCircle(
  ctx,
  arr,
  deltaX,
  deltaY,
  bottom,
  scale
) {
  for (const [x, y, r] of arr) {
    if (y + deltaY + r < bottom) {
      if (r + scale < 1) {
        ctx.beginPath();
        ctx.arc(x + deltaX, y + deltaY, 1, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(x + deltaX, y + deltaY, r + scale, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.stroke();
      }
    } else {
      ctx.beginPath();
      ctx.arc(x + deltaX, bottom - r, r, 0, 2 * Math.PI);
      ctx.closePath();
      ctx.stroke();
    }
  }
}
