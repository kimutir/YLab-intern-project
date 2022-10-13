export default function generateTriangle(ctx, arr, deltaX, deltaY, bottom) {
  for (const coords of arr) {
    ctx.beginPath();
    coords.forEach((i, index) => {
      let one;
      let two;
      let three;
      // if (index === 0) {
      //   ctx.moveTo(i[0] + deltaX, i[1] + deltaY);
      // }
      // if (index === 1) {
      //   ctx.lineTo(i[0] + deltaX, i[1] + deltaY);
      // }
      // if (index === 2) {
      //   ctx.lineTo(i[0] + deltaX, i[1] + deltaY);
      // }

      if (index === 0) {
        if (i[1] + deltaY < bottom) {
          ctx.moveTo(i[0] + deltaX, i[1] + deltaY);
          ctx.lineTo(coords[1][0] + deltaX, coords[1][1] + deltaY);
          ctx.lineTo(coords[2][0] + deltaX, coords[2][1] + deltaY);
        } else {
          ctx.moveTo(i[0] + deltaX, bottom);
          ctx.lineTo(coords[1][0] + deltaX, bottom - coords[1][1]);
          ctx.lineTo(coords[2][0] + deltaX, bottom - coords[2][1]);
        }
      }
      if (index === 1) {
        if (i[1] + deltaY < bottom) {
          ctx.moveTo(coords[0][0] + deltaX, coords[0][1] + deltaY);
          ctx.lineTo(i[0] + deltaX, i[1] + deltaY);
          ctx.lineTo(coords[2][0] + deltaX, coords[2][1] + deltaY);
        } else {
          ctx.moveTo(coords[0][0] + deltaX, bottom - coords[0][1]);
          ctx.lineTo(i[0] + deltaX, bottom);
          ctx.lineTo(coords[2][0] + deltaX, bottom - coords[2][1]);
        }
      }
      if (index === 2) {
        if (i[1] + deltaY < bottom) {
          ctx.moveTo(coords[0][0] + deltaX, coords[0][1] + deltaY);
          ctx.lineTo(coords[1][0] + deltaX, coords[1][1] + deltaY);
          ctx.lineTo(i[0] + deltaX, i[1] + deltaY);
        } else {
          ctx.moveTo(coords[0][0] + deltaX, bottom - coords[0][1]);
          ctx.lineTo(coords[1][0] + deltaX, bottom - coords[1][1]);
          ctx.lineTo(i[0] + deltaX, bottom);
        }
      }
    });
    ctx.closePath();
    ctx.stroke();
  }
}
