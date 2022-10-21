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
      delta: { x: 0, y: 0 },
      scale: 1,
      rectangles: [],
      triangles: [],
      circles: {},
      animationLifeTime: 0,
      cursor: { x: 0, y: 0 },
    };
  }

  addCoordinates(type, coordinates, date, selected, fallDistance) {
    this.setState({
      ...this.getState(),
      [type]: {
        ...this.getState()[type],
        [date]: { coordinates, date, selected, fallDistance },
      },
    });
  }

  changeRadius(r) {
    const circles = { ...this.getState().circles };
    let newCircle;

    for (const circle in circles) {
      if (circles[circle].selected) {
        newCircle = circles[circle];
        newCircle.coordinates.pop();
        newCircle.coordinates.push(r);
      }
    }

    this.setState({
      ...this.getState(),
      circles: { ...this.getState().circles, newCircle },
    });
  }

  changeSelected(date) {
    this.setState({
      ...this.getState(),
      circles: {
        ...this.getState().circles,
        [date]: {
          ...this.getState().circles[date],
          selected: !this.getState().circles[date].selected,
        },
      },
    });
  }

  changeFallDistance(date, fallDistance) {
    this.setState({
      ...this.getState(),
      circles: {
        ...this.getState().circles,
        [date]: { ...this.getState().circles[date], fallDistance },
      },
    });
  }

  changeDelta(x, y) {
    this.setState({
      ...this.getState(),
      delta: { x: this.getState().delta.x + x, y: this.getState().delta.y + y },
    });
  }

  changeScale({ mult, cursor }) {
    const delta = this.getState().delta;
    const scale = this.getState().scale;
    const cursorPrev = {
      x: cursor.x + delta.x,
      y: cursor.y + delta.y,
    };

    const center = {
      x: cursorPrev.x / scale,
      y: cursorPrev.y / scale,
    };

    console.log("before", this.getState().scale * mult);

    this.setState({
      ...this.getState(),
      scale: this.getState().scale * mult,
    });

    console.log("after", this.getState().scale * mult);

    const centerCur = {
      x: center.x * scale,
      y: center.y * scale,
    };

    this.setState({
      ...this.getState(),
      delta: { x: centerCur.x - cursor.x, y: centerCur.y - cursor.y },
    });
  }

  changeCursorPosition(x, y) {
    this.setState({
      ...this.getState(),
      cursor: { x, y },
    });
  }

  resetStore() {
    this.setState({
      ...this.initState(),
    });
  }
}

export default CanvasState;
