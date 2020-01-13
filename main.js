function removeFromArray(arr, elt) {
 for (var i = arr.length-1; i>=0; i--) {
   if (arr[i] == elt) {
    arr.splice(i ,1);
    }
  }
}

function heuristic(a,b) {
  //var d = dist(a.i, a.j, b.i, b.j);  
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

var cols = 15;
var rows = 15;
var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;
var w, h;
var path = [];
var done = false;

function Spot(i, j) {
  this.i = i;
  this.j = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neighbors = [];
  this.previous = undefined; 
  this.pass=true;
  
  this.show = function(col) {
    fill(col);
    noStroke(); 
    rect(this.i * w, this.j * h, w - 1, h - 1);
  }
  
  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;
    
    if ( i < cols - 1 ) {
      this.neighbors.push(grid[i+1][j] );
    }
    if (i>0) {
      this.neighbors.push(grid[i-1][j]);
    }
    if (j<rows-1)
    {
      this.neighbors.push(grid[i][j+1]);
    }
    if (j>0){
      this.neighbors.push(grid[i][j-1]);
    }
  }
  this.clicked = function (){
    
    this.f=100000;
    this.pass=false;
  
  }
}

Spot.prototype.isUnderMouse = function(x,y){
   
  return x >= this.i*w && x <= this.i*w + w &&
        y >= this.j*h && y <= this.j*h + h;
  
}


function setup() {
  createCanvas(600, 600);
  console.log('A*');
  
  w = width/cols - 2;
  h = height/rows - 2 ;
  
  // Making a 2d array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {   
      grid[i][j] = new Spot(i, j); 
    }
  }
  
   for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {   
      grid[i][j].addNeighbors(grid);
    }
  }
  
  start = grid[0][0];
  end = grid[cols-1][rows-1];
  
  openSet.push(start);
  
  
  console.log(grid);
  
}

mouseClicked = function(){
  
  for( var i = 0; i< grid.length;i++){
    for (var j=0; j<grid.length;j++){
      
      if (grid[i][j].isUnderMouse(mouseX,mouseY)){
        
        grid[i][j].clicked();
  
      }
    }
  }
  if (mouseY>550){
     done = true;
  }
}

function draw() {
  if (done){
    if (openSet.length > 0) {


      var winner = 0;
      for (var i = 0; i <openSet.length; i++) {
        if (openSet[i].f <  openSet[winner].f) {
          winner = i;
        }
      }

      var current =  openSet[winner];

      if (current === end){



        noLoop();
        console.log("DONE");
      }

      removeFromArray(openSet, current);


      // openSet.remove(current);
      closedSet.push(current);

      var neighbors = current.neighbors;
      for (var i = 0; i < neighbors.length; i++){
        var neighbor = neighbors[i];

        if(!closedSet.includes(neighbor)) {
          var tempG = current.g +1;    

          if (openSet.includes(neighbor)) {
            if (tempG < neighbor.g) {
              neighbor.g = tempG;
            }
          } else {
              neighbor.g  = tempG;
              openSet.push(neighbor);
          }

          if (neighbor.pass === true){
            neighbor.h = heuristic( neighbor,end);
            neighbor.f = neighbor.g + neighbor.h;
            neighbor.previous = current;
          }
        }
      }

       path = [];
      var temp = current;
      path.push(temp);
      while (temp.previous){
        path.push(temp.previous);
        temp = temp.previous;
      
      }
      
      
      // we can keep going 
    } else{
      // no solution 


    }

} //waiting to start ends

  //scaled to 15
  background(0);
  fill(255);
  rect(0,570,width,30,5);
  fill(0,255,0);
  textSize(25);
  text("Start?",270,593);
  
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
     if (grid[i][j].pass === true){
      grid[i][j].show(color(255));
     }else{
       
      grid[i][j].show(color(0)); 
     }
      
        
      
      
    }
  }
  
  for (var i = 0; i < closedSet.length; i++) {
      closedSet[i].show(color(255,0,0));
  }
  
  for (var i = 0; i < openSet.length; i++) {
    if (openSet[i].pass === true){
      openSet[i].show(color(0,255,0));
    }
  }
  
   //Find the path
      
  
  
  for (var i =0; i<path.length; i++) {
    path[i].show(color(0, 0, 255)); 
  }

}



