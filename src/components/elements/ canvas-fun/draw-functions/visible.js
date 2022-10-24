export default function visible({ figure, border }) {
  if (figure.type === "circle") {
    const [x, y, r] = figure.coordinates;
    return (
      // нужно пересчитать границы
      x + r < border.x2 &&
      x - r > border.x1 &&
      y + r < border.y2 + 100 &&
      y - r > border.y1
    );
  }
}
