/*
      MAYUKH MIKE YASIR
      
      Version 3
      
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

function blink(num){
  
  if(num%50 <= 25){
    
   return(color(188,0,188));
    
  }else{ return(color(255,255,0)); }
  
}

const squares = 35;
let openSet = [];
let closedSet = [];
let SBlock = [];
let start;
let end;
let current;
let w, h;
let count = 0;
let done = false;
let path = [];

var grid = new Array(squares);

class Spot{
  
  constructor(i,j){
    this.i = i;
    this.j = j;
    this.f = 0;
    this.g = 0;
    this.h = 0;
    this.points = 1;
    this.donated = false;
    this.pass = true;
    this.previous = undefined;
    this.neighbors = [];
  }
  
  
}

  Spot.prototype.show = function(col){
    
    fill(col);
    noStroke();
    rect(this.i*w, this.j*h, w-1, h-1 );
    
  }


  Spot.prototype.addNeighbors = function(grid){
    
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

class Super extends Spot{
  
  super(){}
  
  wall(){
    
    this.f = 10000;
    this.pass = false;
    this.points = 0;
  
  }
  
  pWall(){
    
    this.points = -4;
    
  }
  
  donate(list){
  
    var atleastone = false
    
    for(var i = 0; i<list.length; i++){
     
      for(var j = 0; j<this.neighbors.length; j++){
       
        if(list[i] === this.neighbors[j]){
         
          list[i].points = this.points;
          atleastone = true;
         
        }else{ this.donated = false; }
      }
    }
    
    if (atleastone === true){
     
      this.donated = true;
      
    }
    
    
  }
}



function setup() {
  createCanvas(800, 800);
  
  w = width / squares;
  h = height/ squares;
  
  //Making a 2d Array
  for (let i = 0; i < squares; i++){
    
    grid[i] = new Array(squares);
    
  }
  
  for (let i = 0; i < squares; i++){
    
     for (let j = 0; j < squares; j++){
       
      var check = ((i === 0 && j === 0) || (i === 1 && j === 1) || (i === 0 && j === 1) || (i === 1 && j === 0));
      
      var check2 = ((i === squares-1 && j === squares-1) || (i === squares-2 && j === squares-2) || (i === squares-2 && j === squares-1) || (i === squares-1 && j === squares-2));
       
      if((floor(random(0,100)) <= 27) && check === false && check2 === false){
       
        grid[i][j] = new Super(i,j)
        grid[i][j].wall();
          
        if((floor(random(0,100)) <= 10)){
          
          grid[i][j].pWall();
          
        }
          
        SBlock.push(grid[i][j]);
        
      }
      else{ grid[i][j] = new Spot(i,j); }
       
    }
    
  }
  
  console.log(grid);
  
  
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
      
      done = true;
      noLoop();
      
      
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
      
        grid[i][j].show(color(255));
      
    }
    
  }
  
  
  for ( let i = 0; i < closedSet.length; i++){

      closedSet[i].show(color(255,0,0));
    
  }
  
   for ( let i = 0; i < openSet.length; i++){
   
      openSet[i].show(color(0,255,0));
     
  }
  
      // Find the path Does not work
    path = [];
    let temp = current;
    path.push(temp);
    while(temp.previous){
       
      path.push(temp.previous);
      temp = temp.previous;
        
    }
  
  for(let i = 0; i<SBlock.length; i++) {
     
    if(SBlock[i].points === -4){
      
      SBlock[i].donate(path);
      
      if(SBlock[i].donated === false){
        
        SBlock[i].show(color(188,0,188));
        
      }else{
        
        SBlock[i].show(blink(count));
      }
    
      
    }else{
     
      SBlock[i].show(color(0));
      
    }
    
  }
  
  
  for ( let i = 0; i< path.length; i++) {
    
    path[i].show(color(0,255,255));
    
  }
  
  if(done === true){
    
    let tPoints = 0;
    
    for( let i = 0; i<path.length; i++){
      
       tPoints += path[i].points 
      
    }
  
    for( let i = 0 ; i<SBlock.length; i++){
      
      if(SBlock[i].donated === true){
          
          SBlock[i].show(color(255,255,0));
          
      }
    }
    
    fill(255);
    rect(680,0,120,100);
    fill(0);
    
    textSize(20);
    text(tPoints + " Steps!", 690,25);//explain points
    
    textSize(20)
    text("Yellow : -5", 690,50);
    
    textSize(20)
    text("Blue : +1", 690,75);
  }
  
  count++;
  
}
