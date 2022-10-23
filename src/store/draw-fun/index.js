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
      selected: 0,
      scroll: { x: 0, y: 0 },
      scale: 1,
      cursor: {},
    };
  }

  // добавление фигуры
  addFigure({ type, coordinates, date }) {
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
    if (e.shiftKey) {
      const value = e.deltaY > 0 ? 1.1 : 0.9;

      // находим старый относительный центр
      const cursorPrev = {
        x: e.offsetX + this.getState().scroll.x,
        y: e.offsetY + this.getState().scroll.y,
      };

      // // масштабируем его
      const center = {
        x: cursorPrev.x / this.getState().scale,
        y: cursorPrev.y / this.getState().scale,
      };

      this.setState({
        ...this.getState(),
        scale: Math.max(0.2, (this.getState().scale *= value)),
      });

      const centerCur = {
        x: center.x * this.getState().scale,
        y: center.y * this.getState().scale,
      };

      this.setState({
        ...this.getState(),
        scroll: { x: centerCur.x - e.offsetX, y: centerCur.y - e.offsetY },
      });
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
        x: (this.getState().scroll.x -= e.movementX),
        y: (this.getState().scroll.y -= e.movementY),
      },
    });
  }

  // нажатие на ЛКМ
  setIsMouseDown(e) {
    const cursor = { x: e.offsetX, y: e.offsetY };
    const figures = this.getState().figures;
    let lastSelected = 0;
    const prevSelected = this.getState().selected;
    console.log("prevSelected:", prevSelected);

    for (const key in figures) {
      const [x, y, r] = figures[key].coordinates;
      if (
        cursor.x > x - r &&
        cursor.x < x + r &&
        cursor.y < y + r &&
        cursor.y > y - r
      ) {
        if (key > lastSelected) {
          lastSelected = key;
        }
      }
    }

    this.setState({
      ...this.getState(),
      selected: lastSelected,
      figures: lastSelected
        ? {
            ...this.getState().figures,
            [lastSelected]: {
              ...this.getState().figures[lastSelected],
              date: 0,
            },
          }
        : {
            ...this.getState().figures,
            [prevSelected]: {
              ...this.getState().figures[prevSelected],
              date: performance.now(),
            },
          },
    });

    // this.setState({
    //   ...this.getState(),
    //   isMouseDown: !this.getState().isMouseDown,
    // });
  }

  // отслеживание позиции курсора
  setCursor(cursor) {
    this.setState({
      ...this.getState(),
      cursor,
    });
  }

  // падение
  fall({ height }) {
    const figures = this.getState().figures;
    for (const figure in figures) {
      let [x, y, r] = figures[figure].coordinates;

      // if (y + r < height) {
      if (y + r < height && figures[figure].date) {
        y +=
          3 * Math.pow((performance.now() - figures[figure].date) / 10000, 2);
        this.setState({
          ...this.getState(),
          figures: {
            ...this.getState().figures,
            [figure]: {
              ...this.getState().figures[figure],
              coordinates: [x, y, r],
            },
          },
        });
      }
    }
  }

  resetStore() {
    this.setState({
      ...this.initState(),
    });
  }
}

export default DrawFun;
