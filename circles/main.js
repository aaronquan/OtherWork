var h = 400;
var w = 400;

var halfCircleGen;

var circles = [];

function setup(){
	createCanvas(w,h);
	var init = new Circle(w/2, createVector(w/2,h/2), max(w/2, 20));
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
	}
}

function Circle(r, c, l){
	this.lines = l;
	this.radius = r;
	this.coords = c;
	
	this.show = function(){
		stroke(255);
		var angle = 0;
		var inc = 2*PI/this.lines;
		for(var i = 0; i < this.lines; ++i){
			line(this.coords.x+this.radius*sin(angle), this.coords.y+this.radius*cos(angle), this.coords.x+this.radius*sin(angle+inc), this.coords.y+this.radius*cos(angle+inc));
			angle += inc;
		}
	}
}

function mouseClicked(){
	var circle = halfCircleGen.next().value;
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
