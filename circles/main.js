var h = 400;
var w = 400;

var halfCircleGen;

var circles = [];

function setup(){
	createCanvas(w,h);
	var init = new Circle(w/2, createVector(w/2,h/2), max(w/2, 20));
	init.recurseShape(circles.length+2);
	circles.push(init);
	halfCircleGen = halfRandomCircleGen(w/2, createVector(w/2, h/2));
	//halfRandomCircle(w/4, createVector(w/2, h/2));
	/*for(var i = 0; i < 50; ++i){
		var bound = random(w/4);
		var randAngle = random(PI*2);
		var circlePoint = createVector(w/2+bound*sin(randAngle), w/2+bound*cos(randAngle));
		circles.push(new Circle(w/4, circlePoint, max(w/2, 20)));
	}*/
}

function draw(){
	background(50);
	
	for(var i = 0; i < circles.length; ++i){
		circles[i].show();
		circles[i].showRecursiveShapes();
	}
}

function Circle(r, c, l){
	this.lines = l;
	this.radius = r;
	this.coords = c;

	this.recursiveShapes = [];
	
	this.show = function(){
		stroke(255);
		var angle = 0;
		var inc = 2*PI/this.lines;
		for(var i = 0; i < this.lines; ++i){
			line(this.coords.x+this.radius*sin(angle), this.coords.y+this.radius*cos(angle), this.coords.x+this.radius*sin(angle+inc), this.coords.y+this.radius*cos(angle+inc));
			angle += inc;
		}
	}
	this.nSideShapePoints = function(n){
		var angleIncrement = 2*PI/n;
		var cumulativeAngle = 0;
		var points = [];
		for(var i = 0; i < n; ++i){
			var vec = createVector(this.coords.x+this.radius*sin(cumulativeAngle), this.coords.y+this.radius*cos(cumulativeAngle))
			points.push(vec);
			cumulativeAngle += angleIncrement;
		}
		return points;
	}
	this.recurseShape = function(n){
		var firstShape = new EqualShape(this.nSideShapePoints(n));
		var allRecursiveShapes = this.getRecursiveShapes(firstShape);
		//for(var i = 0; i < allRecursiveShapes.length; ++i){
			//allRecursiveShapes[i].show();
		//}
		this.recursiveShapes = allRecursiveShapes;
		return allRecursiveShapes;
	}
	this.getRecursiveShapes = function(lastShape){
		if(lastShape.sideLength < 1){
			return [];
		}
		var newShape = lastShape.midpointShape();
		return [lastShape].concat(this.getRecursiveShapes(newShape));
	}
	this.showRecursiveShapes = function(){
		for(var i = 0; i < this.recursiveShapes.length; ++i){
			this.recursiveShapes[i].show();
		}
	}
}

//shape with equal side lengths
function EqualShape(points){
	this.points = points;
	this.sides = points.length;
	var dx = points[0].x - points[1].x;
	var dy = points[0].y - points[1].y;
	this.sideLength = sqrt(dx*dx+dy*dy);
	this.show = function(){
		for(var i = 0; i < this.sides-1; ++i){
			line(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
		}
		line(this.points[0].x, this.points[0].y, this.points[this.sides-1].x, this.points[this.sides-1].y);
	}
	this.midpoints = function(){
		var midpoints = [];
		var dx, dy, point;
		for(var i = 0; i < this.sides-1; ++i){
			dx = this.points[i+1].x - this.points[i].x;
			dy = this.points[i+1].y - this.points[i].y;
			point = createVector(this.points[i].x+dx/2, this.points[i].y+dy/2);
			midpoints.push(point);
		}
		dx = this.points[this.sides-1].x - this.points[0].x;
		dy = this.points[this.sides-1].y - this.points[0].y;
		point = createVector(this.points[0].x+dx/2, this.points[0].y+dy/2);
		midpoints.push(point);
		return midpoints;
	}

	this.midpointShape = function(){
		return new EqualShape(this.midpoints());
	}
}

function mouseClicked(){
	var circle = halfCircleGen.next().value;
	circle.recurseShape(circles.length+2);
	if(circle.radius >= 1){
		circles.push(circle);
	}
}

function halfRandomCircle(r, c){
	if (r <= 1){
		return;
	}
	var bound = random(r/2);
	var randAngle = random(2*PI);
	var circlePoint = createVector(c.x+bound*sin(randAngle), c.y+bound*cos(randAngle));
	circles.push(new Circle(r, circlePoint, max(ceil(r/2), 20)));
	halfRandomCircle(ceil(r/2), circlePoint);	
}

function* halfRandomCircleGen(r, c){
	var rad = r/2;
	while(true){
		var bound = random(rad/2);
		var randAngle = random(2*PI);
		var c = createVector(c.x+bound*sin(randAngle), c.y+bound*cos(randAngle));
		yield new Circle(rad, c, max(ceil(r/2), 20))
		rad = rad/2;
	}
}
