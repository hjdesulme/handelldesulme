class BMLTrafficModel {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    this.initGrid();

    this.cellImage1 = new Image();
    this.cellImage1.src = '/images/forCells.jpg';
    this.cellImage2 = new Image();
    this.cellImage2.src = '/images/forCells-inverted.jpg';

    Promise.all([
      new Promise(resolve => this.cellImage1.onload = resolve),
      new Promise(resolve => this.cellImage2.onload = resolve)
    ]).then(() => {
      this.render();
      this.startAnimation();
    });

    window.addEventListener('resize', () => this.handleResize());
  }

  resizeCanvas() {
    const container = document.querySelector('.container.centered');
    if (container) {
      this.canvas.width = container.offsetWidth;
      this.canvas.height = container.offsetHeight;
    } else {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
    this.cellSize = Math.max(5, Math.min(15, Math.floor(Math.min(this.canvas.width, this.canvas.height) / 40)));
    this.cols = Math.ceil(this.canvas.width / this.cellSize);
    this.rows = Math.ceil(this.canvas.height / this.cellSize);
  }

  initGrid() {
    this.grid = new Uint8Array(this.rows * this.cols);
    for (let i = 0; i < this.grid.length; i++) {
      const rand = Math.random();
      if (rand < 0.45) this.grid[i] = 1; // Right-moving car
      else if (rand < 0.9) this.grid[i] = 2; // Down-moving car
    }
  }

  update() {
    const phase = Math.random() < 0.5 ? 1 : 2;
    const newGrid = new Uint8Array(this.grid);

    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        const i = x * this.cols + y;
        if (this.grid[i] === phase) {
          const nextX = (x + (phase === 2 ? 1 : 0)) % this.rows;
          const nextY = (y + (phase === 1 ? 1 : 0)) % this.cols;
          const nextI = nextX * this.cols + nextY;
          if (this.grid[nextI] === 0) {
            newGrid[nextI] = phase;
            newGrid[i] = 0;
          }
        }
      }
    }

    this.grid = newGrid;
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    if (!this.cellImage1.complete || !this.cellImage2.complete) return;

    for (let x = 0; x < this.rows; x += 2) {
      for (let y = 0; y < this.cols; y += 2) {
        if (this.isPartOfBlock(x, y)) {
          // Use cellImage1 (forCells.jpg) for 4x4 blocks
          this.ctx.drawImage(this.cellImage1, y * this.cellSize, x * this.cellSize, this.cellSize * 2, this.cellSize * 2);
        } else {
          for (let dx = 0; dx < 2; dx++) {
            for (let dy = 0; dy < 2; dy++) {
              const cell = this.grid[(x+dx) * this.cols + (y+dy)];
              if (cell !== 0) {
                // Use cellImage1 (forCells.jpg) for right-moving cells (1)
                // Use cellImage2 (forCells-inverted.jpg) for down-moving cells (2)
                const image = cell === 1 ? this.cellImage1 : this.cellImage2;
                this.ctx.drawImage(image, (y+dy) * this.cellSize, (x+dx) * this.cellSize, this.cellSize, this.cellSize);
              }
            }
          }
        }
      }
    }
  }

  isPartOfBlock(x, y) {
    if (x % 2 === 0 && y % 2 === 0 && x < this.rows - 1 && y < this.cols - 1) {
      const cell = this.grid[x * this.cols + y];
      return cell !== 0 &&
             this.grid[(x+1) * this.cols + y] !== 0 &&
             this.grid[x * this.cols + (y+1)] !== 0 &&
             this.grid[(x+1) * this.cols + (y+1)] !== 0;
    }
    return false;
  }

  handleResize() {
    this.resizeCanvas();
    this.initGrid();
    this.render();
  }

  startAnimation() {
    const animate = () => {
      this.update();
      this.render();
      requestAnimationFrame(animate);
    };
    animate();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new BMLTrafficModel('bml-traffic-model');
});
