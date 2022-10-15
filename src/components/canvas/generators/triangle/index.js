export default function generateTriangle(ctx, arr, deltaX, deltaY, bottom) {
  for (const coords of arr) {
    ctx.beginPath();

    if (
      coords[0][1] + deltaY < bottom &&
      coords[1][1] + deltaY < bottom &&
      coords[2][1] + deltaY < bottom
    ) {
      ctx.moveTo(coords[0][0] + deltaX, coords[0][1] + deltaY);
      ctx.lineTo(coords[1][0] + deltaX, coords[1][1] + deltaY);
      ctx.lineTo(coords[2][0] + deltaX, coords[2][1] + deltaY);
    } else {
      if (!(coords[2][1] + deltaY < bottom)) {
        console.log("3");
        return () => {
          console.log("from 3");
          ctx.beginPath();
          ctx.moveTo(
            coords[0][0] + deltaX,
            bottom - Math.abs(coords[2][1] - coords[0][1])
          );
          ctx.lineTo(
            coords[1][0] + deltaX,
            bottom - Math.abs(coords[2][1] - coords[1][1])
          );
          ctx.lineTo(coords[2][0] + deltaX, bottom);
          ctx.closePath();
          ctx.stroke();
        };
      }
      if (!(coords[0][1] + deltaY < bottom)) {
        console.log("1");
        return () => {
          console.log("from 1");
          ctx.beginPath();
          ctx.moveTo(coords[0][0] + deltaX, bottom);
          ctx.lineTo(
            coords[1][0] + deltaX,
            bottom - Math.abs(coords[0][1] - coords[1][1])
          );
          ctx.lineTo(
            coords[2][0] + deltaX,
            bottom - Math.abs(coords[0][1] - coords[2][1])
          );
          ctx.closePath();
          ctx.stroke();
        };
      }
      if (!(coords[1][1] + deltaY < bottom)) {
        console.log("2");
        return () => {
          console.log(" from 2");
          ctx.beginPath();

          ctx.moveTo(
            coords[0][0] + deltaX,
            bottom - Math.abs(coords[1][1] - coords[0][1])
          );
          ctx.lineTo(coords[1][0] + deltaX, bottom);
          ctx.lineTo(
            coords[2][0] + deltaX,
            bottom - Math.abs(coords[1][1] - coords[2][1])
          );
          ctx.closePath();
          ctx.stroke();
        };
      }
    }
    ctx.closePath();
    ctx.stroke();
  }
}
