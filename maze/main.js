var gs = 20;
var w = 20;
var h = 20;
var maze;

var ai;
var ai2;
function setup(){
	createCanvas(gs*(w+2),gs*(h+2));
	maze = new Maze(w,h, gs);
	maze.generate();
	maze.cut((w*h*20)/100);
	ai = new SLTai(maze);
	ai2 = new MDai(maze);
}

function draw(){
	background(50);
	noStroke();
	maze.draw(gs,gs);
	ai.next();
	ai2.next();
	ai.drawCurrent(gs,gs,gs);
	ai2.drawCurrent(gs,gs,gs);
	
}
