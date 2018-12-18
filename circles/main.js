var h = 400;
var w = 400;

var rad = 20;

var halfCircleGen;

var circles = [];

var pointTable;
var num;
//var points = [[3,10], [4,10], [6,9], [3,11]];
var pointMerge;
var mergedPoints;

function preload(){
	pointTable = loadTable("pointSets/set1.csv");
}

function setup(){
	createCanvas(w,h);
	//recursiveExperiment();
	pointMerge();
	//generatePoints();
}

function draw(){
	background(50);
	
	pointMerge.show();
	//mergedPoints.show(255,0,0);
	for(var i = 0; i < circles.length; ++i){
		circles[i].show();
		//circles[i].showRecursiveShapes();
	}
}

function recursiveExperiment(){
	var init = new RecursiveEqualShapeCircle(w/2, createVector(w/2,h/2), max(w/2, 20));
	init.recurseShape(circles.length+2);
	circles.push(init);
	halfCircleGen = halfRandomCircleGen(w/2, createVector(w/2, h/2));
}

function pointMerge(){
	pointMerge = new PointMerger();
	pointMerge.loadTable(pointTable);
	
	var ret = pointMerge.simpleMerge(rad);
	mergedPoints = new PointSet(ret.mergedItems());
	mergedPoints.loop(function(p){
		circles.push(new Circle(rad, p))
	});
	console.log(mergedPoints.points.length);
}

function generatePoints(){
	var pointGen;
	pointGen = new PointGenerator();
	pointGen.generateRandomSquare(200, 0, 400);
	pointGen.toFile("set1.csv");
}

function mouseClicked(){
	pointMerge.randomise();
	var ret = pointMerge.simpleMerge(rad);
	mergedPoints = new PointSet(ret.mergedItems());
	circles = [];
	mergedPoints.loop(function(p){
		circles.push(new Circle(rad, p))
	});
	console.log(mergedPoints.points.length);
	/*
	if(circles.length == 0) return;
	var last = circles[circles.length-1];
	if(!(last instanceof RecursiveEqualShapeCircle)) return;
	var c = last.halfRandomCircle();
	if(c != null){
		c.recurseShape(circles.length+2);
		circles.push(c);
	}
	*/
	
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
