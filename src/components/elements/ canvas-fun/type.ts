export interface IDraw {
  ctx: CanvasRenderingContext2D;
  figures:
    | {}
    | {
        [key: number]: IFigure;
      };
  scroll: { x: number; y: number };
  scale: number;
  view: { width: number; height: number };
  selected: number;
}

export interface IFigure {
  type: string;
  selected: boolean;
  coordinates: number[] | number[][];
  date: number;
}

export interface IPrimitive {
  ctx: CanvasRenderingContext2D;
  figure: any;
  selected?: boolean;
  scale: number;
}

export interface IField {
  ctx: CanvasRenderingContext2D;
  scroll: { x: number; y: number };
  view: { width: number; height: number };
}

export interface IClicked {
  cursor: { x: number; y: number };
  scroll: { x: number; y: number };
  scale: number;
  figure: IFigure;
}

export interface IPrimitiveClicked {
  coordinates: any[];
  cursor: { x: number; y: number };
  scroll: { x: number; y: number };
  scale: number;
}

export interface IVisible {
  figure: IFigure;
  border: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
  };
}
