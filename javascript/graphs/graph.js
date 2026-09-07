class Graph {
  #canvas;
  #canvas_height;
  #canvas_width;
  #context;
  #object;

  constructor(canvas, object) {
    canvas.width = canvas.parentElement.clientWidth - 20;
    canvas.height = canvas.parentElement.clientHeight - 20;
    this.#canvas = canvas;
    this.#canvas_width = canvas.width;
    this.#canvas_height = canvas.height;
    this.#context = this.#canvas.getContext('2d');
    this.#object = object;
    this.#plot();
  }

  #plot() {
    this.#xAxis();
    this.#yAxis();
  }
  #xAxis() {
    this.#context.beginPath();
    this.#context.lineWidth = 1;
    this.#context.moveTo(this.#canvas_width / 2, 0);
    this.#context.lineTo(this.#canvas_width / 2, this.#canvas_height);
    this.#context.stroke();
  }
  #yAxis() {
    this.#context.beginPath();
    this.#context.lineWidth = 1;
    this.#context.moveTo(0, this.#canvas_height / 2);
    this.#context.lineTo(this.#canvas_width, this.#canvas_height / 2);
    this.#context.stroke();
  }
  #grid() {}
}
