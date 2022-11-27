import clicked from "@src/components/elements/ canvas-fun/draw-functions/clicked";
import { leaves } from "@src/components/elements/ canvas-fun/leaves";
import StateModule from "@src/store/module";
import IDraw from "./type";

/**
 * Состояние корзины
 */
class DrawFunState extends StateModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState(): IDraw {
    return {
      isMouseDown: false,
      figures: {},
      total: 0,
      selected: 0,
      scroll: { x: 0, y: 0 },
      scale: 1,
    };
  }

  // добавление фигуры
  addFigure({
    type,
    coordinates,
    date,
    animation,
  }: {
    type: string;
    coordinates: number[] | number[][];
    date: number;
    animation?: any;
  }) {
    this.setState({
      ...this.getState(),
      total: this.getState().total + 1,
    });
    if (type === "leaf") {
      const img = new Image();
      img.src = leaves[`leaf${Math.floor(Math.random() * 5 + 1)}`];

      img.onload = () => {
        this.setState({
          ...this.getState(),
          figures: {
            ...this.getState().figures,
            [this.getState().total]: {
              type,
              coordinates,
              date,
              selected: false,
              img,
              animation,
            },
          },
        });
      };
    } else {
      this.setState({
        ...this.getState(),
        figures: {
          ...this.getState().figures,
          [this.getState().total]: {
            type,
            coordinates,
            date,
            selected: false,
          },
        },
      });
    }
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
    const scale = this.getState().scale;

    for (const key in figures) {
      if (clicked({ figure: figures[key], cursor, scroll, scale })) {
        if (key === selected && this.getState().isMouseDown) {
          if (figures[key].type === "circle") {
            this.#moveCircle({ figures, key, scale, e });
          }
          if (figures[key].type === "triangle") {
            this.#moveTriangle({ figures, key, scale, e });
          }
          if (figures[key].type === "leaf") {
            this.#moveLeaf({ figures, key, scale, e });
          }
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

  #moveCircle({ figures, key, scale, e }) {
    let [x, y, r] = figures[key].coordinates;
    this.setState({
      ...this.getState(),
      figures: {
        ...this.getState().figures,
        [key]: {
          ...this.getState().figures[key],
          coordinates: [
            (x += (e.movementX / scale) * 1.43),
            (y += (e.movementY / scale) * 1.43),
            r,
          ],
        },
      },
    });
  }
  #moveLeaf({ figures, key, scale, e }) {
    let [x, y, width] = figures[key].coordinates;
    this.setState({
      ...this.getState(),
      figures: {
        ...this.getState().figures,
        [key]: {
          ...this.getState().figures[key],
          coordinates: [
            (x += (e.movementX / scale) * 1.43),
            (y += (e.movementY / scale) * 1.43),
            width,
          ],
        },
      },
    });
  }
  #moveTriangle({ figures, key, scale, e }) {
    const coordinates = figures[key].coordinates;
    coordinates.forEach((i) => {
      i[0] += (e.movementX / scale) * 1.43;
      i[1] += (e.movementY / scale) * 1.43;
    });
    this.setState({
      ...this.getState(),
      figures: {
        ...this.getState().figures,
        [key]: {
          ...this.getState().figures[key],
          coordinates: coordinates,
        },
      },
    });
  }

  // нажатие на ЛКМ
  onMouseDown(e) {
    const cursor = { x: e.offsetX, y: e.offsetY };
    const figures = this.getState().figures;
    let lastSelected = 0;
    const prevSelected = this.getState().selected;
    const scroll = this.getState().scroll;
    const scale = this.getState().scale;

    for (const key in figures) {
      const [x, y, r] = figures[key].coordinates;
      if (clicked({ figure: figures[key], cursor, scroll, scale })) {
        if (Number(key) > lastSelected) {
          lastSelected = Number(key);
        }
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
    const selected = this.getState().selected;

    if (selected) {
      this.setState({
        ...this.getState(),
        isMouseDown: false,
        figures: {
          ...this.getState().figures,
          [selected]: {
            ...this.getState().figures[selected],
            date: performance.now(),
          },
        },
      });
    }

    if (!selected) {
      this.setState({ ...this.getState(), isMouseDown: false });
    }
  }

  // падение
  onFall({ height }) {
    const figures = this.getState().figures;
    for (const key in figures) {
      if (figures[key].type === "circle") {
        this.#fallCircle({ key, figures, height });
      }
      if (figures[key].type === "triangle") {
        this.#fallTriangle({ key, figures, height });
      }
      if (figures[key].type === "leaf") {
        this.#fallLeaf({ key, figures, height });
      }
    }
  }
  #fallCircle({ key, figures, height }) {
    let [x, y, r] = figures[key].coordinates;

    if (y + r < height && figures[key].date) {
      y += 3 * Math.pow((performance.now() - figures[key].date) / 10000, 2);
      this.setState({
        ...this.getState(),
        figures: {
          ...this.getState().figures,
          [key]: {
            ...this.getState().figures[key],
            coordinates: [x, y, r],
          },
        },
      });
    }
  }
  #fallLeaf({ key, figures, height }) {
    function test(time, duraction) {
      if ((performance.now() - time) / 1000 <= duraction / 2) {
        return Math.pow((performance.now() - time) / 4000, 2);
      }
      return Math.pow(1 / (performance.now() - time), 2);
    }

    let [x, y, width] = figures[key].coordinates;
    const startOffset = figures[key].animation.offset.start;
    const duraction = figures[key].animation.offset.duraction;
    const directionOffset = figures[key].animation.offset.direction;
    const directionAngle = figures[key].animation.rotation.direction;
    let angle = figures[key].animation.rotation.angle;
    if (performance.now() - startOffset > duraction * 1000) {
      this.#changeLeafAnimation({ key });
    }
    if (y < height && figures[key].date) {
      y +=
        Math.random() * 0.5 +
        4 * Math.pow((performance.now() - figures[key].date) / 10000, 2);

      // x +=
      //   // directionOffset === 1
      //   //   ? Math.random() * x
      //   //   : -(Math.random() * x) +
      //   Math.random() * 2 * directionOffset;
      // // 0.5 * directionOffset;
      x +=
        directionOffset === 1
          ? Math.random() * 0.6
          : -(Math.random() * 0.6) +
            4 *
              Math.pow((performance.now() - startOffset) / 10000, 6) *
              directionOffset;

      // y -= 2 * Math.pow((performance.now() - startOffset) / 10000, 5);

      angle +=
        directionAngle === 1
          ? Math.random() * 2 + 1
          : -(Math.random() * 2 + 1) +
            4 * test(startOffset, duraction) * directionAngle;
      // angle +=
      //   directionAngle === 1
      //     ? Math.random() * 2 + 1
      //     : -(Math.random() * 2 + 1) +
      //       4 *
      //         Math.pow((performance.now() - startOffset) / 10000, 2) *
      //         directionAngle;

      this.setState({
        ...this.getState(),
        figures: {
          ...this.getState().figures,
          [key]: {
            ...this.getState().figures[key],
            coordinates: [x, y, width],
            animation: {
              ...this.getState().figures[key].animation,
              rotation: { angle, direction: directionAngle },
            },
          },
        },
      });
    }
  }

  #changeLeafAnimation({ key }) {
    const directionOffset =
      this.getState().figures[key].animation.offset.direction;
    const directionAngle =
      this.getState().figures[key].animation.rotation.direction;

    this.setState({
      ...this.getState(),
      figures: {
        ...this.getState().figures,
        [key]: {
          ...this.getState().figures[key],
          animation: {
            ...this.getState().figures[key].animation,
            offset: {
              ...this.getState().figures[key].animation.offset,
              duraction: Math.random() * 5 + 3,
              direction: directionOffset === 1 ? -1 : 1,
              start: performance.now(),
            },
            rotation: {
              ...this.getState().figures[key].animation.rotation,
              direction: directionAngle === 1 ? -1 : 1,
            },
          },
        },
      },
    });
  }

  #fallTriangle({ key, figures, height }) {
    const y: number[] = [];
    const coordinates: any[] = figures[key].coordinates;
    coordinates.forEach((i) => y.push(i[1]));
    let yMax = Math.max(...y);

    if (yMax < height && figures[key].date) {
      coordinates.forEach((i) => {
        i[1] +=
          3 * Math.pow((performance.now() - figures[key].date) / 10000, 2);
      });

      this.setState({
        ...this.getState(),
        figures: {
          ...this.getState().figures,
          [key]: {
            ...this.getState().figures[key],
            coordinates: coordinates,
          },
        },
      });
    }
  }
  // изменение параметров
  onSubmitChanges(coordinates: number[] | number[][]) {
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

  // сброс стора
  reset() {
    this.setState({
      ...this.initState(),
    });
  }
}

export default DrawFunState;
