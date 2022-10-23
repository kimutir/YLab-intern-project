export default function isVisible({ figure, border }) {
  if (figure.type === "circle") {
    const [x, y, r] = figure.coordinates;
    return (
      x + r < border.x2 &&
      x - r > border.x1 &&
      y + r < border.y2 &&
      y - r > border.y1
    );
  }
}
