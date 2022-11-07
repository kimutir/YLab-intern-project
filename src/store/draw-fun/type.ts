export default interface IDraw {
  isMouseDown: boolean;
  // описать фигуру
  figures: any;
  total: number;
  selected: number;
  scroll: { x: number; y: number };
  scale: number;
}
