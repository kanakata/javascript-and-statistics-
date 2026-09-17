class Plt {
  #canvas;
  #canvas_height;
  #canvas_width;
  #context;
  #padding;
  #data;
  #axis_padding;
  #y_scale;
  #chart_type;
  #data_labels;
  #object;

  constructor(canvas, object) {
    canvas.width = canvas.parentElement.clientWidth - 20;
    canvas.height = canvas.parentElement.clientHeight - 20;
    this.#canvas = canvas;
    this.#chart_type = object.type;
    this.#canvas_width = canvas.width;
    this.#canvas_height = canvas.height;
    this.#context = this.#canvas.getContext('2d');
    this.#data = object.data;
    this.#padding = 20;
    this.#axis_padding = 40;
    this.#y_scale = object.yScale < 5 ? 10 : object.yScale ?? 10;
    this.#data_labels = object.data_labels;
    this.#object = object;
    this.#plot();
  }

  #plot() {
    switch (String(this.#chart_type).toLocaleLowerCase()) {
      case 'bar':
        this.#barChart();
        break;
      case 'pie':
        this.#pieChart();
        break;
      default:
        this.#barChart();
    }
  }

  #barChart() {
    if (this.#object.grid) {
      this.#grids();
    }
    this.#yAxis();
    this.#xAxis();
  }

  #pieChart() {
    this.#pie();
  }

  #pie() {
    const radius = this.#canvas_width / 4;
    this.#context.beginPath();
    this.#context.arc(
      this.#canvas_width / 2,
      this.#canvas_height / 2,
      radius,
      0,
      360 / 57.27
    );
    this.#context.closePath();
    this.#context.stroke();

    // wedge
    let sum = 0;
    for (let i = 0; i < this.#data.length; i++) {
      sum += this.#data[i];
    }

    const colors = [
      'red',
      'green',
      'orange',
      'lightblue',
      'orange',
      'pink',
      'lightgreen',
      'orangered',
    ];

    let starting_angle = 0;
    const circle_midpoint_x = this.#canvas_width / 2;
    const circle_midpoint_y = this.#canvas_height / 2;

    let text_x = this.#canvas_width / 2 + radius / 2;
    let text_y = this.#canvas_height / 2;

    for (let i = 0; i < this.#data.length; i++) {
      let radians = (this.#data[i] * 360) / sum / (180 / Math.PI);
      this.#context.beginPath();
      this.#context.moveTo(circle_midpoint_x, circle_midpoint_y);
      this.#context.arc(
        circle_midpoint_x,
        circle_midpoint_y,
        radius,
        starting_angle,
        radians
      );
      this.#context.stroke();

      // draw the label
      this.#context.fillText(this.#data_labels[i], text_x, text_y);

      starting_angle += radians;
    }
  }

  #util() {
    const YMax = Math.max(...this.#data);
    const YHeight = this.#canvas_height - this.#padding * 2;
    const YSegments = Math.ceil(YMax / this.#y_scale) + 1;
    const YOffset = YHeight / YSegments;

    const XSegments = this.#data.length;
    const XWidth = this.#canvas_width - this.#axis_padding - this.#padding;
    const XOffset = XWidth / XSegments;

    return {
      y_max: YMax,
      y_height: YHeight,
      y_segments: YSegments,
      y_offset: YOffset,
      // x
      x_width: XWidth,
      x_segments: XSegments,
      x_offset: XOffset,
    };
  }

  #yAxis() {
    this.#context.lineWidth = 0.5;
    this.#context.moveTo(this.#axis_padding, this.#padding);
    this.#context.lineTo(
      this.#axis_padding,
      this.#canvas_height - this.#padding
    );
    this.#context.stroke();
    // segment the y-axis.
    this.#segmentYAxis();
    this.#labelYAxis();
  }

  #labelYAxis() {
    let scale = this.#util().y_offset;
    let label = this.#y_scale;
    for (let i = 0; i < this.#util().y_segments; i++) {
      // this.#context.font = "italic 20px"
      this.#context.textAlign = 'right';
      this.#context.textBaseline = 'middle';
      this.#context.fillText(
        label,
        this.#axis_padding - 10,
        this.#canvas_height - this.#padding - scale
      );
      // this.#context.fill();
      scale += this.#util().y_offset;
      label += this.#y_scale;
    }
  }

  #segmentYAxis() {
    let scale = this.#util().y_offset;
    this.#context.lineWidth = 0.5;
    for (let i = 0; i < this.#util().y_segments; i++) {
      this.#context.moveTo(
        this.#axis_padding - 5,
        this.#canvas_height - this.#padding - scale
      );
      this.#context.lineTo(
        this.#axis_padding + 5,
        this.#canvas_height - this.#padding - scale
      );
      scale += this.#util().y_offset;
    }
  }

  #xAxis() {
    this.#context.lineWidth = 1;
    this.#context.lineCap = 1;
    this.#context.moveTo(
      this.#axis_padding,
      this.#canvas_height - this.#padding
    );
    this.#context.lineTo(
      this.#canvas_width - this.#padding,
      this.#canvas_height - this.#padding
    );
    this.#context.stroke();

    let color_count =
      this.#object.bar_colors != undefined ? this.#object.bar_colors.length : 0;
    let scale = this.#util().x_offset;
    for (let i = 0; i < this.#util().x_segments; i++) {
      let data = this.#data[i];
      let height_equivalent = (data * this.#util().y_offset) / this.#y_scale;
      this.#context.strokeStyle = 'black';

      this.#context.beginPath();
      this.#context.lineWidth = 0.5;
      this.#context.moveTo(
        this.#axis_padding + scale - 10,
        this.#canvas_height - this.#padding
      );
      this.#context.lineTo(
        this.#axis_padding + scale - 10,
        this.#canvas_height - this.#padding - height_equivalent
      );
      this.#context.lineTo(
        this.#axis_padding + scale - this.#util().x_offset + 10,
        this.#canvas_height - this.#padding - height_equivalent
      );
      this.#context.lineTo(
        this.#axis_padding + scale - this.#util().x_offset + 10,
        this.#canvas_height - this.#padding
      );
      this.#context.stroke();
  
      if (
        this.#object.bar_colors !== null ||
        this.#object.bar_colors !== undefined
      ) {
        if (color_count == this.#util().x_segments) {
          this.#context.fillStyle = this.#object.bar_colors[i];
        } else {
          this.#context.fillStyle = 'lightblue';
        }
      } else {
        this.#context.fillStyle = 'lightblue';
      }
      this.#context.fill();
      scale += this.#util().x_offset;
    }

    this.#labelXAxis();
  }

  #labelXAxis() {
    let x = this.#util().x_offset / 2;
    for (let i = 0; i < this.#util().x_segments; i++) {
      this.#context.lineWidth = 0.5;
      this.#context.fillStyle = 'black';
      this.#context.font = '12px calibri';
      this.#context.textAlign = 'center';
      this.#context.fillText(
        this.#data_labels[i],
        this.#axis_padding + x,
        this.#canvas_height - this.#padding / 2
      );
      x += this.#util().x_offset;
    }
  }

  #grids() {
    let y_offset = this.#util().y_offset;
    let x_offset = this.#util().x_offset;

    // this.#context.beginPath()
    this.#context.lineWidth = 0.2;
    for (let i = 0; i < this.#util().y_segments; i++) {
      this.#context.moveTo(
        this.#axis_padding,
        this.#canvas_height - this.#padding - y_offset
      );

      this.#context.lineTo(
        this.#canvas_width - this.#padding,
        this.#canvas_height - this.#padding - y_offset
      );

      this.#context.lineWidth = 0.2;
      this.#context.moveTo(
        this.#axis_padding + x_offset,
        this.#canvas_height - this.#padding
      );
      this.#context.lineTo(this.#axis_padding + x_offset, this.#padding);
      this.#context.stroke();

      x_offset += this.#util().x_offset;
      y_offset += this.#util().y_offset;
    }
  }
}

/**
 * usage
 * const canvas = document.getElementById('canvas');
      const plt = new Plt(canvas, {
        type: 'pie',
        // data: [97, 80, 91, 87, 86, 93, 84, 81],
        // data_labels: ['math', 'kis', 'phy', 'eng', 'bus', 'chem', 'geo', 'bio'],
        data: [97, 80, 91],
        data_labels: ['math', 'kis', 'phy'],
        yScale: 13,
        // grid: true
      });
 */
