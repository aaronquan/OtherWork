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

//var selected = null;

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
	
	drawBoard(engine.wPOV);
	var selected = engine.selectedSquare;
	if(selected != null){
		highlightTile(selected.x, selected.y, [0, 0, 0]);
		var straights = new Straight().moves(selected.x, selected.y);
		for(var i = 0; i < straights.length; i++){
			highlightTile(straights[i].x, straights[i].y, [0,255,0]);
		}
		var diagonals = new Diagonal().moves(selected.x, selected.y);
		for(var i = 0; i < diagonals.length; i++){
			highlightTile(diagonals[i].x, diagonals[i].y, [255,0,0]);
		}
		var knights = new Knight().moves(selected.x, selected.y);
		for(var i = 0; i < knights.length; i++){
			highlightTile(knights[i].x, knights[i].y, [0,0,255]);
		}
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
		engine.selectedSquare = createVector(x,y);
	}else{
		engine.selectedSquare = null;
	}
	//console.log(selected);
}

function keyPressed(){
	if(keyCode == 32){
		engine.wPOV = !engine.wPOV;
	}
}

function highlightTile(x,y,c){
	var sw = 4;
	strokeWeight(sw);
	stroke(c[0], c[1], c[2]);
	noFill();
	rect(x*tW+bW+sw/2, sH-(y+1)*tH-bH+sw/2, tW-sw, tH-sw);
	strokeWeight();
	noStroke();
}