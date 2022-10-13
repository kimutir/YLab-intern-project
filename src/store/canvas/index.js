import StateModule from "@src/store/module";

/**
 * Состояние корзины
 */
class CanvasState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      rectangles: [],
      triangles: [],
      circles: [],
    };
  }

  addCoordinates(type, coordinates) {
    this.setState({
      ...this.getState(),
      [type]: [...this.getState()[type], coordinates],
    });
  }
}

export default CanvasState;
