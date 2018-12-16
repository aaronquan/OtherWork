var sys;

var lr = 0.0001;

var bool = true;

var w = 400;
var h = 400;

function setup(){
	createCanvas(w, h);
	sys = new TrainingSystem();
}

function draw(){
	background(200);
	sys.display(w);
}

function mousePressed(){
	var point = new Point2D(mouseX,mouseY,bool);
	bool = !bool;
	//point.randomise(0, w, 0, h);
	sys.addPoint(point);
	sys.calculateLearning(lr, point);
}