export default function generateTriangle(ctx, arr, delta, canvasHeight) {
  for (const coords of arr) {
    // сортируем по убыванию по Y
    const sorted = coords.sort((a, b) => b[1] - a[1]);

    if (sorted[0][1] + delta.y < 100) {
      continue;
    }
    if (sorted[0][1] + delta.y > canvasHeight) {
      ctx.beginPath();
      ctx.moveTo(sorted[0][0] + delta.x, canvasHeight);
      ctx.lineTo(
        sorted[1][0] + delta.x,
        canvasHeight - Math.abs(sorted[0][1] - sorted[1][1])
      );
      ctx.lineTo(
        sorted[2][0] + delta.x,
        canvasHeight - Math.abs(sorted[0][1] - sorted[2][1])
      );
      ctx.closePath();
    }

    if (sorted[0][1] + delta.y < canvasHeight) {
      ctx.beginPath();
      ctx.moveTo(sorted[0][0] + delta.x, sorted[0][1] + delta.y);
      ctx.lineTo(sorted[1][0] + delta.x, sorted[1][1] + delta.y);
      ctx.lineTo(sorted[2][0] + delta.x, sorted[2][1] + delta.y);
      ctx.closePath();
    }
    ctx.stroke();
  }
}
