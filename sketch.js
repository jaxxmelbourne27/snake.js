var px, py, pd, pl, fx, fy;
var grid;

function initiate2DArray(x, y) {
  for(var a = 0; a < y; a++) {
    x[a] = new Array(y);
  }
}

function randomFood() {
  fx = ceil(random(0, 24)) - 1;
  fy = ceil(random(0, 24)) - 1;
}

function preload() {
  pd = 1;
  px = 5;
  py = 5;
  pl = 1;
}

function setup() {
  background(0);
  grid = new Array(24);
  randomFood();
  initiate2DArray(grid, 24);
  for(var a = 0; a < 24; a++) {
    for(var b = 0; b < 24; b++) {
      grid[b][a] = 0;
    }
  }
  createCanvas(window.innerWidth, window.innerHeight);
  window.setInterval(function(){
    movePlayer();
}, 115);
}

function movePlayer() {
  grid[px][py] = pl;
  for(var y = 0; y < 24; y++) {
    for(var x = 0; x < 24; x++) {
      if(grid[x][y] > 0) {
        grid[x][y] -= 1;
      }
    }
  }
  if(pd == 0 && py != 0) {
    py = py - 1;
  } else if(pd == 1 && px != 23) {
    px = px + 1;
  } else if(pd == 2 && py != 23) {
    py = py + 1;
  } else if(pd == 3 && px != 0) {
    px = px - 1;
  } else {
    preload();
    lose();
  }
}

function lose() {
  for(var a = 0; a < 24; a++) {
    for(var b = 0; b < 24; b++) {
      grid[b][a] = 0;
    }
  }
}

function keyPressed() {
  if(keyCode == 87) {
    // Up
    pd = 0;
  } else if(keyCode == 83) {
    // Down
    pd = 2;
  } else if(keyCode == 65) {
    // Left
    pd = 3;
  } else if(keyCode == 68) {
    // Right
    pd = 1;
  }
}

function draw() {
  stroke(255, 17);
  for(y = 0; y < 24; y++) {
    for(x = 0; x < 24; x++) {
      rect(x * 24, y * 24, 24, 24);
    }
  }
  fill(255);
  for(var y = 0; y < 24; y++) {
    for(var x = 0; x < 24; x++) {
      if(grid[x][y] > 0) {
        rect(x * 24, y * 24, 24, 24);
        if(x == px && y == py) {
          preload();
          lose();
        }
      }
    }
  }
  rect(px * 24, py * 24, 24, 24);
  if(fx == px && fy == py) {
    pl = pl + 1;
    randomFood();
  }
  fill(255, 0, 0);
  rect(fx * 24, fy * 24, 24, 24);
  fill(0);
  document.getElementById("score").innerHTML = pl;
}
