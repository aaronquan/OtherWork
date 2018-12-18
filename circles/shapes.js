class Circle{
	constructor(r,c,l=null){
		this.radius = r;
		this.coords = c;
		if(l == null){
			this.lines = ceil(r*5)+3;
		}else{
			this.lines = l;
		}
	}
	show(){
		stroke(255);
		var angle = 0;
		var inc = 2*PI/this.lines;
		for(var i = 0; i < this.lines; ++i){
			line(this.coords.x+this.radius*sin(angle), this.coords.y+this.radius*cos(angle), this.coords.x+this.radius*sin(angle+inc), this.coords.y+this.radius*cos(angle+inc));
			angle += inc;
		}
	}
}

class RecursiveEqualShapeCircle extends Circle{
	constructor(r,c,l=null){
		super(r,c,l);
		this.recursiveShapes = [];
	}
	nSideShapePoints(n){
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
	recurseShape(n){
		var firstShape = new EqualShape(this.nSideShapePoints(n));
		var allRecursiveShapes = this.getRecursiveShapes(firstShape);
		this.recursiveShapes = allRecursiveShapes;
		return allRecursiveShapes;
	}
	getRecursiveShapes(lastShape){
		if(lastShape.sideLength < 1){
			return [];
		}
		var newShape = lastShape.midpointShape();
		return [lastShape].concat(this.getRecursiveShapes(newShape));
	}
	showRecursiveShapes(){
		//console.log(this.recursiveShapes.length);
		for(var i = 0; i < this.recursiveShapes.length; ++i){
			this.recursiveShapes[i].show();
			//console.log(i);
		}
	}
	halfRandomCircle(){
		if (this.radius <= 1){
			return null;
		}
		var bound = random(this.radius/2);
		var randAngle = random(2*PI);
		var circlePoint = createVector(this.coords.x+bound*sin(randAngle), this.coords.y+bound*cos(randAngle));
		return new RecursiveEqualShapeCircle(ceil(this.radius/2), circlePoint);
	}
}

class EqualShape{
	constructor(points){
		this.points = points;
		this.sides = points.length;
		var dx = points[0].x - points[1].x;
		var dy = points[0].y - points[1].y;
		this.sideLength = sqrt(dx*dx+dy*dy);
	}
	show(){
		for(var i = 0; i < this.sides-1; ++i){
			line(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
		}
		line(this.points[0].x, this.points[0].y, this.points[this.sides-1].x, this.points[this.sides-1].y);
	}
	midpoints(){
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

	midpointShape(){
		return new EqualShape(this.midpoints());
	}
}

/*
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
*/