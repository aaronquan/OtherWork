var engine;
var sW = 500;
var sH = 500;
var bW = 50;
var bH = 50;

var s = 8;
var tW = (sW-bW*2)/s;
var tH = (sH-bH*2)/s;

function setup(){
	createCanvas(500, 500);
	engine = new Engine();
	engine.setup();
	engine.printBoard();
}

function draw(){
	background(100);
	fill(250,230,255);
	var c = true;
	for(var i = 0; i < s; i++){
		for(var j = 0; j < s; j++){
			console.log(c);
			if(c){
				fill(255,255,80);
			}else{
				fill(80,255,255)
			}
			rect(i*tW+bW, j*bH+tH, tW, tH);
			c = !c;
		}
	}
	rect(bW, bH, sW-bW*2, sH-bH*2);
}

function mousePressed(){
	console.log('click');
	console.log(mouseX, mouseY);
}