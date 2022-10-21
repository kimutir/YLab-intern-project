export default function generateCircle(
  ctx,
  delta,
  canvasHeight,
  canvasWidth,
  scale,
  cursor,
  circles,
  selected,
  lastClick,
  //prev
  resetLastClick,
  fallDistance,
  setRadius
) {
  for (const circle in circles) {
    const [x, y, r] = circles[circle].coordinates;
    console.log(delta.x);
    const time = circles[circle].date;
    const estimatedX = x * scale;
    const estimatedY =
      y * scale +
      (circles[circle].fallDistance ||
        (time && estimateDrop(Date.now() - time)));

    if (estimatedY < 0 || estimatedX < 0 || estimatedX > canvasWidth) {
      continue;
    }
    if (estimatedY + r * scale > canvasHeight) {
      draw(ctx, estimatedX, canvasHeight - r * scale, r * scale, delta);
      continue;
    }
    // if (
    //   lastClick.x > estimatedX - r * scale &&
    //   lastClick.x < estimatedX + r * scale &&
    //   lastClick.y > estimatedY - r * scale + 50 &&
    //   lastClick.y < estimatedY + r * scale + 50
    // ) {
    //   selected(circles[circle].date);
    //   fallDistance(
    //     circles[circle].date,
    //     time && estimateDrop(Date.now() - time)
    //   );
    //   setRadius(r);
    //   resetLastClick({ x: 0, y: 0 });
    // }
    if (circles[circle].selected) {
      draw(
        ctx,
        estimatedX,
        cursor.y -
          50 +
          (y - cursor.y) * scale +
          delta.y +
          circles[circle].fallDistance,
        r * scale,
        delta
      );
    } else {
      draw(ctx, estimatedX, estimatedY, r * scale, delta);
    }
  }
}

function draw(ctx, x, y, r, delta) {
  ctx.save();
  // ctx.strokeStyle = color;
  ctx.translate(delta.x, delta.y);
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function estimateDrop(time) {
  if (!time) return 0;
  return Math.pow(time * 0.001, 2) * 20;
}
