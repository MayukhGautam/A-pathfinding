/*
      MAYUKH MIKE YASIR
      
      Version 1.1
      
      ADDED NON OBJECT ORIENTED OBSTACLES

*/
function removeFromArray(arr, elt){
  
  for (var i = arr.length-1; i >= 0 ; i--){
    
    if(arr[i] == elt){
      
      arr.splice(i,1);
      
    } 
  }
}

function heuristic(a,b){
  
  return ( abs( a.i - b.i ) + abs( a.j - b.j ) );
  
}
  



const squares = 100;

let openSet = [];
let closedSet = [];
let start;
let end;
let current;
let w, h;
let path = [];

var grid = new Array(squares);

function Spot(i,j){
  
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.pass = true;
  this.previous = undefined;
  this.neighbors = [];
  
  this.show = function(col){
    
    fill(col);
    noStroke();
    rect(this.i*w, this.j*h, w-1, h-1 );
    
  }
  
  this.addNeighbors = function(grid){
    
    let i = this.i;
    let j = this.j;
    
    if (i < squares - 1){
      
      this.neighbors.push(grid[i + 1][j]);
      
    }
    
    if (i > 0){
      
      this.neighbors.push(grid[i - 1][j]);
      
    }
    
    if(j < squares-1){
      
      this.neighbors.push(grid[i][j + 1]);
      
    }
    
    if(j > 0){
      
      this.neighbors.push(grid[i][j - 1]);
      
    }
    
  }
  
}

function Super(){
  
  Spot.call(this, f, show);
  this.i = floor(random(squares))
  f = -10000;
  
}


function setup() {
  createCanvas(800, 800);
  console.log('A*');
  
  w = width / squares;
  h = height/ squares;
  
  //Making a 2d Array
  for (let i = 0; i < squares; i++){
    
    grid[i] = new Array(squares);
    
  }
  
  for (let i = 0; i < squares; i++){
    
     for (let j = 0; j < squares; j++){
      
      grid[i][j] = new Spot(i,j);
       
      
      if(floor(random(0,100)) <= 30){
        
        grid[i][j].f = 100000;
        grid[i][j].pass = false;
        
      }
    
    }
    
  }
  
  
  for ( i = 0; i < squares; i++){
    
    for (let j = 0; j < squares; j++){
      
      grid[i][j].addNeighbors(grid);
    
    }
    
  }
  
  start = grid[0][0];
  end = grid[squares - 1][squares - 1];
  
  start.pass = true;
  end.pass = true;
  start.f = 0;
  end.f = 0;
  
  openSet.push(start);
  
  console.log(grid);
  
}

function draw() {
  
  if(openSet.length > 0){
    
    let winner = 0;
    for(var i = 0; i < openSet.length; i++){
      
      if(openSet[i].f < openSet[winner].f){
       
        winner = i;
        
      }
      
    }
    
    current = openSet[winner];
    
    if(openSet[winner] === end){
      
      noLoop();
      
      console.log("DONE!");
      
    }
    
    
    removeFromArray(openSet,current);
    closedSet.push(current);
    
    let neighbors = current.neighbors;
    
    for( i = 0; i<neighbors.length; i++){
    
      var neighbor = neighbors[i];
      
      if (!closedSet.includes(neighbor)){
        
        let tempG = current.g + 1;
        
        
        if(openSet.includes(neighbor)){
        
          if (tempG < neighbor.g){
          
            neighbor.g = tempG;
            
          }
          
        } else {
        
          neighbor.g = tempG;
          openSet.push(neighbor);
          
        }
        
        if(neighbor.pass === true)
        {
          
        neighbor.h = heuristic(neighbor, end);
        neighbor.f = neighbor.g + neighbor.h;
        neighbor.previous = current;
          
        }
        
        
      }
    
    }
    
    
    //we can keep going
  }else{
    //no solution
  }
  
  background(0);
  
  for (let i = 0; i < squares; i++){
    
    for(var j = 0; j < squares; j++){
      
      if(grid[i][j].pass === true){
        grid[i][j].show(color(255));
      } else{
        
        grid[i][j].show(color(0));
        
      }
      
    }
    
  }
  
  
  for ( let i = 0; i < closedSet.length; i++){
    if(closedSet[i].pass === true)
    {
      closedSet[i].show(color(255,0,0));
    }
  }
  
   for ( let i = 0; i < openSet.length; i++){
    if(openSet[i].pass === true)
    {
      openSet[i].show(color(0,255,0));
    }
  }
  
  Super.show(color(255,255,0));
  
      // Find the path Does not work
    path = [];
    let temp = current;
    path.push(temp);
    while(temp.previous){
       
      path.push(temp.previous);
      temp = temp.previous;
        
    }
  
  
  for ( let i = 0; i< path.length; i++) {
    
    path[i].show(color(0,255,255));
    
  }
  
  
  
}
