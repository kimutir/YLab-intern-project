import StateModule from "@src/store/module";

/**
 * Состояние корзины
 */
class DrawFun extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      isMouseDown: false,
      figures: {},
      total: 0,
      scroll: { x: 0, y: 0 },
      scale: 1,
      cursor: {},
    };
  }

  // добавление фигуры
  addFigure(type, coordinates, date) {
    this.setState({
      ...this.getState(),
      total: this.getState().total + 1,
    });

    this.setState({
      ...this.getState(),
      figures: {
        ...this.getState().figures,
        [this.getState().total]: { type, coordinates, date, selected: false },
      },
    });
  }

  // событие на колесо
  onMouseWheel(e) {
    // console.log("e:", e);
    if (e.shiftKey) {
      const value = e.deltaY > 0 ? 1.03 : 0.95;
      const scroll = this.getState().scroll;
      const scale = this.getState().scale;
      // const cursor = this.getState().cursor;
      // находим старый относительный центр
      const cursorPrev = {
        x: e.offsetX + scroll.x,
        y: e.offsetY + scroll.y,
      };
      console.log("cursorPrev:", cursorPrev);

      // // масштабируем его
      // const center = {
      //   x: cursorPrev.x / scale,
      //   y: cursorPrev.y / scale,
      // };

      // console.log(center);

      this.setState({
        ...this.getState(),
        scale: Math.max(0.2, (this.getState().scale *= value)),
      });

      // const centerCur = {
      //   x: center.x * scale,
      //   y: center.y * scale,
      // };
      // console.log(centerCur);
      // this.setState({
      //   ...this.getState(),
      //   scroll: { x: centerCur.x - e.offsetX, y: centerCur.y - e.offsetY },
      // });
    } else {
      this.setState({
        ...this.getState(),
        scroll: {
          x: this.getState().scroll.x,
          y: (this.getState().scroll.y += e.deltaY > 0 ? -10 : 10),
        },
      });
    }
  }

  // перемещение курсором
  onMouseMove(e) {
    this.setState({
      ...this.getState(),
      scroll: {
        x: (this.getState().scroll.x += e.movementX),
        y: (this.getState().scroll.y += e.movementY),
      },
    });
  }

  // нажатие на ЛКМ
  setIsMouseDown() {
    this.setState({
      ...this.getState(),
      isMouseDown: !this.getState().isMouseDown,
    });
  }

  // отслеживание позиции курсора
  setCursor(cursor) {
    this.setState({
      ...this.getState(),
      cursor,
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

  resetStore() {
    this.setState({
      ...this.initState(),
    });
  }
}

export default DrawFun;
