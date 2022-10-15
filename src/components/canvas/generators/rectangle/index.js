export default function generateRectangle(
  ctx,
  arr,
  deltaX,
  deltaY,
  bottom,
  scale,
  dropStep
) {
  for (const [x, y, width, height] of arr) {
    if (y + deltaY + height + dropStep < bottom) {
      if (scale + width < 1 || scale + height < 1) {
        // можно доработать уменьшение
        ctx.strokeRect(x + deltaX, y + deltaY, 1, 1);
      } else {
        ctx.strokeRect(
          x + deltaX,
          y + deltaY + dropStep,
          width + scale,
          height + scale
        );
      }
    } else {
      ctx.strokeRect(
        x + deltaX,
        bottom - height,
        width + scale,
        height + scale
      );
    }
  }
}
