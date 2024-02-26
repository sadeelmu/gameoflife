//The game of life is a simple system of discrete states

//Each generation, we have to evalute each cell and get a new state based on the previous state and its neighbours.
//The neighbourhood is the 8 cells around the cell, 3x3. 

//The rules, on how we move from one generation to another resembles biological proccesses. 
//1. If the cell is surrounded by neighbours that aren't alive cannot stay alive
//2. If the cell is surrounded by neighbours that are alive can stay alive or become alive
//3. If the cell is surrounded by too many alive neighbours, it cannot stay alive due to overpopulation 

/*
At each step in time, the following transitions occur:
Any live cell with fewer than two live neighbors dies, as if by underpopulation.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by overpopulation.
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
*/

//A data structure to store the grid of states: 2DArray that stores a random collection of zeros and ones


function make2DArray(cols, rows){
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++){
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let cols;
let rows; 
let resolution = 20;

function setup(){
    createCanvas(5000,780);
    cols = width/resolution;
    rows = height/resolution;
    grid = make2DArray(cols,rows);
    for (let i = 0; i<cols; i++){
        for (let j = 0; j<rows; j++){
            grid[i][j] = floor(random(2)); //fills the grid with a random number of 0 or 1
        }
    }
}

function draw(){
    background(0);

    for (let i = 0; i<cols; i++){
        for (let j = 0; j<rows; j++){
            let x = i*resolution;
            let y = j*resolution;
            if(grid[i][j]==1){
                fill(255);
                stroke(0);
                rect(x,y,resolution-1,resolution-1);
            }
        }
    }

    //create new geeneration 
    let next  = make2DArray(cols, rows);

    //Compute next generation based on grid 
    for (let i = 0; i<cols; i++){
        for (let j = 0; j<rows; j++){
            let state = grid[i][j];

           //Count live neighbours
           let neighbors = countNeighbours(grid, i, j);

           //Implement rules
           //1. Reproduction
           //2. Underpopulation and overpopulation
           //3. Next generation

           if(state == 0 && neighbors == 3){
            next[i][j] = 1;
           }else if(state == 1 && (neighbors < 2 || neighbors > 3)){
            next[i][j] = 0;
           }else{
            next[i][j] = state;
           }
        }
    }

    grid = next;

}

function countNeighbours(grid, x, y){
    let sum = 0;
    for(let i = -1; i < 2; i++){
        for (let j = -1; j < 2; j++){
            //Wraparound edges
            let newcol = (x + i + cols) % cols;
            let newrow = (y + j + rows) % rows;
            sum +=grid[newcol][newrow];
            
        }
    }
    sum -= grid[x][y];
    return sum;
}