import Figure from "../figure";

class Circle extends Figure {
  constructor(params) {
    super(params);
    this.name = params.name;
  }
}

export default Circle;
