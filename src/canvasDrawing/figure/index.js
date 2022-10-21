class Figure {
  constructor(params) {
    this.canvasWidth = params.canvasWidth;
    this.canvasHeight = params.canvasHeight;
    this.scale = params.scale;
    this.delta = params.delta;
    this.cursor = params.cursor;
    this.ctx = params.ctx;
  }
}

export default Figure;
