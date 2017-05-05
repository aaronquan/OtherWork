var engine;
var sW = 500;
var sH = 500;

var dark = [130,126,111];
var light = [244,229,204];

var bW = 50;
var bH = 50;
var s = 8;
var tW = (sW-bW*2)/s;
var tH = (sH-bH*2)/s;

var selected = null;

function setup(){
	createCanvas(500, 500);
	noStroke();
	engine = new Engine();
	engine.setup();
	engine.printBoard();
}

function draw(){
	background(100);
	fill(250,230,255);
	
	drawBoard(true);
	if(selected != null){
		stroke(0);
		noFill();
		rect(selected.x*tW+bW, sH-(selected.y+1)*tH-bH, tW, tH);
		strokeWeight(4);
		noStroke();
	}
}

function drawBoard(side){
	var c = side;
	for(var i = 0; i < s; i++){
		for(var j = 0; j < s; j++){
			if(c){
				fill(light);
			}else{
				fill(dark);
			}
			rect(i*tW+bW, j*tH+bH, tW, tH);
			c = !c;
		}
		c = !c;
	}
}

function mousePressed(){
	var x = floor((mouseX-bW)/tW);
	var y = s - ceil((mouseY-bH)/tH);
	if((x >= 0 && x < s) && (y >= 0 && y < s)){
		selected = createVector(x, y);
	}else{
		selected = null;
	}
	//console.log(selected);
}