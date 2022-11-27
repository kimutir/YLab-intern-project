export default interface IDraw {
  isMouseDown: boolean;
  figures: any;
  total: number;
  selected: number;
  scroll: { x: number; y: number };
  scale: number;
}
