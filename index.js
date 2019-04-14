var params = {
  lines: [{
    background: 'green',
    updateTime: 1000,
    elements: [
      {
        background: 'transparent',
        width: 25,
      },
      {
        background: 'transparent',
        width: 25,
      },
      {
        background: 'transparent',
        width: 25,
      },
    ]
  },
  {
    background: 'red',
    updateTime: 2000,
    elements: [
      {
        background: 'transparent',
        width: 25,
      },
      {
        background: 'transparent',
        width: 25,
      },
      {
        background: 'transparent',
        width: 25,
      },
    ]
  },
  {
    background: 'blue',
    updateTime: 4000,
    elements: [
      {
        background: 'transparent',
        width: 33,
      },
      {
        background: 'transparent',
        width: 20,
      },
      {
        background: 'transparent',
        width: 15,
      },
    ]
  },
  {
    background: 'yellow',
    updateTime: 3000,
    elements: [
      {
        background: 'transparent',
        width: 10,
      },
      {
        background: 'transparent',
        width: 10,
      },
      {
        background: 'transparent',
        width: 5,
      },
    ]
  },
  ]
};

const getRandomColor = () => "#" + (0x1000000 + (Math.random()) * 0xffffff).toString(16).substr(1, 6);

class Block {
  constructor(color, className, container) {
    this._element = null;
    this._bgColor = color;
    this._container = container ? container : document.querySelector(".container");
    this._className = className ? className : "element";
  }

  get element() {
    if (this._element === null) {
      this._element = this.render();
    }
    return this._element;
  }

  changeColor(color) {
    this.element.style.background = color;
  }

  render() {
    const el = document.createElement("div");
    el.classList.add(this._className);
    el.style.background = this._bgColor;
    return el;
  }

  append() {
    this._element = this._container.appendChild(this.element);
  }
};


const renderLines = (lines) => {
  for (l of lines) {
    const line = new Block(l.background, "line");
    line.append();
    setInterval(() => {
      line.changeColor(getRandomColor());
    }, l.updateTime);

    for (item of l.elements) {
      const child = new Block(item.background, "element", line.element);
      child.element.style.width = item.width + "%";
      setInterval(() => {
        child.changeColor(getRandomColor());
      }, l.updateTime);
      child.append();
    }
  }
}

renderLines(params.lines);
