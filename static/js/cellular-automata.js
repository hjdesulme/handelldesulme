class CellularAutomata {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.initGrid();

    this.cellImage = new Image();
    this.cellImage.src = '/images/forCells.jpg';
    this.cellImage.onload = () => {
      console.log('Cell image loaded successfully');
      this.render();
    };
    this.cellImage.onerror = () => {
      console.error('Failed to load cell image');
    };

    this.canvas.addEventListener('click', (e) => this.handleClick(e));
    window.addEventListener('resize', () => this.handleResize());

    // Start updating only after the image has loaded
    this.cellImage.onload = () => {
      console.log('Cell image loaded successfully');
      this.render();
      setInterval(() => this.update(), 100);
    };
  }

  resizeCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.cellSize = Math.max(5, Math.min(15, Math.floor(Math.min(this.canvas.width, this.canvas.height) / 40)));
    this.cols = Math.ceil(this.canvas.width / this.cellSize);
    this.rows = Math.ceil(this.canvas.height / this.cellSize);
  }

  initGrid() {
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => Math.random() > 0.7 ? 1 : 0)
    );
  }

  countNeighbors(x, y) {
    let count = 0;
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) continue;
        const newX = (x + i + this.rows) % this.rows;
        const newY = (y + j + this.cols) % this.cols;
        count += this.grid[newX][newY];
      }
    }
    return count;
  }

  update() {
    const newGrid = this.grid.map((row, x) =>
      row.map((cell, y) => {
        const neighbors = this.countNeighbors(x, y);
        if (cell === 1 && (neighbors < 2 || neighbors > 3)) return 0;
        if (cell === 0 && neighbors === 3) return 1;
        return cell;
      })
    );
    this.grid = newGrid;
    this.render();
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.cellImage || !this.cellImage.complete) {
      console.log('Cell image not yet loaded');
      return;
    }
    this.grid.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell) {
          if (this.isPartOfBlock(x, y)) {
            this.ctx.drawImage(this.cellImage, y * this.cellSize * 2, x * this.cellSize * 2, this.cellSize * 2, this.cellSize * 2);
          } else {
            this.ctx.drawImage(this.cellImage, y * this.cellSize, x * this.cellSize, this.cellSize, this.cellSize);
          }
        }
      });
    });
  }

  isPartOfBlock(x, y) {
    if (x < this.rows - 1 && y < this.cols - 1) {
      return this.grid[x][y] && this.grid[x+1][y] && this.grid[x][y+1] && this.grid[x+1][y+1];
    }
    return false;
  }

  handleClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = Math.floor((e.clientY - rect.top) / this.cellSize);
    const y = Math.floor((e.clientX - rect.left) / this.cellSize);
    if (x >= 0 && x < this.rows && y >= 0 && y < this.cols) {
      this.grid[x][y] = 1 - this.grid[x][y];
      this.render();
    }
  }

  handleResize() {
    this.resizeCanvas();
    this.initGrid();
    this.render();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new CellularAutomata('cellular-automata');
});