var w = 400;
var h = 400;

var poly;
var pointer; 
function setup(){
	//background(50);
	createCanvas(w,h);
	poly = new Polygon();
	//poly.appendPoint(createVector(random(w), random(h)));
	//poly.appendPoint(createVector(random(w), random(h)));
	//poly.appendPoint(createVector(random(w), random(h)));
	//poly.appendPoint(createVector(random(w), random(h)));
	
}

function draw(){
	background(50);
	poly.show();
	//stroke(255);
	//ellipse(mouseX, mouseY, 1);
}

function mouseClicked(){
	poly.appendPoint(createVector(mouseX, mouseY));
	//console.log(poly.inside(mouseX, mouseY));
	//console.log(poly.needsUntangle(createVector(mouseX, mouseY)));
}

function keyPressed(){
	poly.remove();
}