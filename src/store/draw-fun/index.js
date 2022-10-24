import clicked from "@src/components/elements/ canvas-fun/draw-functions/clicked";
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
      deltaMouse: 0,
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
    const cursor = { x: e.offsetX, y: e.offsetY };
    const figures = this.getState().figures;
    const selected = this.getState().selected;
    const scroll = this.getState().scroll;

    for (const key in figures) {
      const [x, y, r] = figures[key].coordinates;
      if (
        cursor.x + scroll.x > x - r &&
        cursor.x + scroll.x < x + r &&
        cursor.y + scroll.y < y + r &&
        cursor.y + scroll.y > y - r
      ) {
        if (key === selected && this.getState().isMouseDown) {
          this.setState({
            ...this.getState(),
            figures: {
              ...this.getState().figures,
              [key]: {
                ...this.getState().figures[key],
                coordinates: [
                  cursor.x + scroll.x - this.getState().deltaMouse.x,
                  cursor.y + scroll.y - this.getState().deltaMouse.y,
                  r,
                ],
              },
            },
          });
        }
      } else {
        this.getState().isMouseDown &&
          !selected &&
          this.setState({
            ...this.getState(),
            scroll: {
              x: (this.getState().scroll.x -= e.movementX),
              y: (this.getState().scroll.y -= e.movementY),
            },
          });
      }
    }
  }

  // нажатие на ЛКМ
  onMouseDown(e) {
    const cursor = { x: e.offsetX, y: e.offsetY };
    const figures = this.getState().figures;
    let lastSelected = 0;
    const prevSelected = this.getState().selected;
    const scroll = this.getState().scroll;

    for (const key in figures) {
      const [x, y, r] = figures[key].coordinates;
      if (
        clicked({ figure: figures[key], cursor, scroll })
        // cursor.x + scroll.x > x - r &&
        // cursor.x + scroll.x < x + r &&
        // cursor.y + scroll.y < y + r &&
        // cursor.y + scroll.y > y - r
      ) {
        if (key > lastSelected) {
          lastSelected = key;
        }

        this.setState({
          ...this.getState(),
          deltaMouse: { x: cursor.x - x, y: cursor.y - y },
        });
      } else {
      }
    }

    if (prevSelected) {
      this.setState({
        ...this.getState(),
        selected: 0,
        figures: {
          ...this.getState().figures,
          [prevSelected]: {
            ...this.getState().figures[prevSelected],
            date: performance.now(),
          },
        },
      });
    }

    if (lastSelected) {
      this.setState({
        ...this.getState(),
        selected: lastSelected,
        figures: {
          ...this.getState().figures,
          [lastSelected]: {
            ...this.getState().figures[lastSelected],
            date: 0,
          },
        },
      });
    }

    this.setState({
      ...this.getState(),
      isMouseDown: true,
    });
  }

  onMouseUp() {
    this.setState({
      ...this.getState(),
      isMouseDown: false,
      deltaMouse: 0,
    });
  }

  // отслеживание позиции курсора
  setCursor(cursor) {
    this.setState({
      ...this.getState(),
      cursor,
    });
  }

  // падение
  onFall({ height }) {
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

  // изменение параметров
  onSubmitChanges(coordinates) {
    const selected = this.getState().selected;

    this.setState({
      ...this.getState(),
      figures: {
        ...this.getState().figures,
        [selected]: {
          ...this.getState().figures[selected],
          coordinates,
          date: performance.now(),
        },
      },
    });
  }

  resetStore() {
    this.setState({
      ...this.initState(),
    });
  }
}

export default DrawFun;
