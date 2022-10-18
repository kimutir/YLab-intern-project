export default function generateTriangle(ctx, arr, delta, canvasHeight) {
  const onBottoArr = [];

  for (const coords of arr) {
    const onBottom = false;

    if (coords[0][1] + delta.y > canvasHeight) {
      console.log("1");

      ctx.beginPath();
      ctx.moveTo(coords[0][0] + delta.x, canvasHeight);
      ctx.lineTo(
        coords[1][0] + delta.x,
        canvasHeight - Math.abs(coords[0][1] - coords[1][1])
      );
      ctx.lineTo(
        coords[2][0] + delta.x,
        canvasHeight - Math.abs(coords[0][1] - coords[2][1])
      );
      ctx.closePath();
      ctx.stroke();
      continue;
    }
    if (coords[1][1] + delta.y > canvasHeight) {
      console.log("2");

      ctx.beginPath();

      ctx.moveTo(
        coords[0][0] + delta.x,
        canvasHeight - Math.abs(coords[1][1] - coords[0][1])
      );
      ctx.lineTo(coords[1][0] + delta.x, canvasHeight);
      ctx.lineTo(
        coords[2][0] + delta.x,
        canvasHeight - Math.abs(coords[1][1] - coords[2][1])
      );
      ctx.closePath();
      ctx.stroke();
      continue;
    }

    if (coords[2][1] + delta.y > canvasHeight) {
      console.log("3");
      ctx.beginPath();
      ctx.moveTo(
        coords[0][0] + delta.x,
        canvasHeight - Math.abs(coords[2][1] - coords[0][1])
      );
      ctx.lineTo(
        coords[1][0] + delta.x,
        canvasHeight - Math.abs(coords[2][1] - coords[1][1])
      );
      ctx.lineTo(coords[2][0] + delta.x, canvasHeight);
      ctx.closePath();
      ctx.stroke();
      continue;
    }

    if (
      coords[0][1] + delta.y < canvasHeight &&
      coords[1][1] + delta.y < canvasHeight &&
      coords[2][1] + delta.y < canvasHeight
    ) {
      ctx.beginPath();
      ctx.moveTo(coords[0][0] + delta.x, coords[0][1] + delta.y);
      ctx.lineTo(coords[1][0] + delta.x, coords[1][1] + delta.y);
      ctx.lineTo(coords[2][0] + delta.x, coords[2][1] + delta.y);
      ctx.closePath();
    }
    ctx.stroke();
  }
}

// if (!(coords[2][1] + delta.y < canvasHeight)) {
//   console.log("3");
//   return () => {
//     console.log("from 3");
//     ctx.beginPath();
//     ctx.moveTo(
//       coords[0][0] + delta.x,
//       canvasHeight - Math.abs(coords[2][1] - coords[0][1])
//     );
//     ctx.lineTo(
//       coords[1][0] + delta.x,
//       canvasHeight - Math.abs(coords[2][1] - coords[1][1])
//     );
//     ctx.lineTo(coords[2][0] + delta.x, canvasHeight);
//     ctx.closePath();
//     ctx.stroke();
//   };
// }
// if (!(coords[0][1] + delta.y < canvasHeight)) {
//   console.log("1");
//   return () => {
//     console.log("from 1");
//     ctx.beginPath();
//     ctx.moveTo(coords[0][0] + delta.x, canvasHeight);
//     ctx.lineTo(
//       coords[1][0] + delta.x,
//       canvasHeight - Math.abs(coords[0][1] - coords[1][1])
//     );
//     ctx.lineTo(
//       coords[2][0] + delta.x,
//       canvasHeight - Math.abs(coords[0][1] - coords[2][1])
//     );
//     ctx.closePath();
//     ctx.stroke();
//   };
// }
// if (!(coords[1][1] + delta.y < canvasHeight)) {
//   console.log("2");
//   return () => {
//     console.log(" from 2");
//     ctx.beginPath();

//     ctx.moveTo(
//       coords[0][0] + delta.x,
//       canvasHeight - Math.abs(coords[1][1] - coords[0][1])
//     );
//     ctx.lineTo(coords[1][0] + delta.x, canvasHeight);
//     ctx.lineTo(
//       coords[2][0] + delta.x,
//       canvasHeight - Math.abs(coords[1][1] - coords[2][1])
//     );
//     ctx.closePath();
//     ctx.stroke();
//   };
// }
