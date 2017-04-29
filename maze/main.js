var gs = 40;
var w = 8;
var h = 5;
var maze;
function setup(){
	createCanvas(gs*(w+2),gs*(h+2));
	maze = new Maze(w,h, gs);
}

function draw(){
	background(50);
	maze.draw(gs,gs);
}
