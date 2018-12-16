var engine;
var sW = 500;
var sH = 500;

var dark = [93,85,62];
var light = [196,188,154];

//dark = [100, 255, 100];
//light = [130, 130, 255];

var bW = 50;
var bH = 50;
var s = 8;
var tW = (sW-bW*2)/s;
var tH = (sH-bH*2)/s;

//var selected = null;

function setup(){
	createCanvas(500, 500);
	//noStroke();
	engine = new Engine();
	engine.setup();
}

function draw(){
	background(100);
	fill(250,230,255);
	
	drawBoard(engine.wPOV);
	drawPieces(engine.wPOV);
	var selected = engine.selectedSquare;
	if(selected != null){
		//console.log(engine.getPiece(selected.x, selected.y));
		if(engine.wPOV){
			highlightTile(selected.x, selected.y, [0,0,0]);
		}else{
			highlightTile(s-selected.x-1, s-selected.y-1, [0,0,0]);
		}
		var moves = engine.selectedMoves;
		for(var i = 0; i < moves.length; i++){
			if(engine.wPOV){
				highlightTile(moves[i].x, moves[i].y, [100,10,60]);
			}else{
				highlightTile(s-moves[i].x-1, s-moves[i].y-1, [100,10,60]);
			}
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
function drawPieces(side){
	var c = side;
	var board = engine.board;
	if (!side){
		board = array2dRotate180(board);
	}
	for(var i = 0; i < s; i++){
		for(var j = 0; j < s; j++){
			var id = board[j][i];
			var col = engine.getColour(id);
			var type = engine.getType(id);
			if(id == 0) continue;
			if(col){
				fill(255);
			}else{
				fill(0);
			}
			ellipse(i*tW+bW+tW/2, (s-j-1)*tH+bH+tH/2, tW/2);
			if(col){
				stroke(0);
			}else{
				stroke(255);
			}
			if(type == 1){
				line(i*tW+bW+tW*3/8, (s-j-1)*tH+bH+tH*3/8, i*tW+bW+tW*5/8, (s-j-1)*tH+bH+tH*5/8);
			}else if(type == 2){
				line(i*tW+bW+tW*3/8, (s-j-1)*tH+bH+tH*5/8, i*tW+bW+tW/2, (s-j-1)*tH+bH+tH*3/8)
				line(i*tW+bW+tW*5/8, (s-j-1)*tH+bH+tH*5/8, i*tW+bW+tW/2, (s-j-1)*tH+bH+tH*3/8)
				
			}else if(type == 3){
				line(i*tW+bW+tW*5/8, (s-j-1)*tH+bH+tH*3/8, i*tW+bW+tW*5/8, (s-j-1)*tH+bH+tH*5/8);
				line(i*tW+bW+tW*5/8, (s-j-1)*tH+bH+tH*5/8, i*tW+bW+tW*3/8, (s-j-1)*tH+bH+tH*5/8);
				line(i*tW+bW+tW*3/8, (s-j-1)*tH+bH+tH*3/8, i*tW+bW+tW*3/8, (s-j-1)*tH+bH+tH*5/8);
				line(i*tW+bW+tW*3/8, (s-j-1)*tH+bH+tH*3/8, i*tW+bW+tW*5/8, (s-j-1)*tH+bH+tH*3/8);
			}else if(type == 4){
				line(i*tW+bW+tW*3/8, (s-j-1)*tH+bH+tH*3/8, i*tW+bW+tW*5/8, (s-j-1)*tH+bH+tH*5/8);
				line(i*tW+bW+tW*5/8, (s-j-1)*tH+bH+tH*3/8, i*tW+bW+tW*3/8, (s-j-1)*tH+bH+tH*5/8);
			}else if(type == 5){
				line(i*tW+bW+tW/2, (s-j-1)*tH+bH+tH*3/8, i*tW+bW+tW/2, (s-j-1)*tH+bH+tH*5/8);
				line(i*tW+bW+tW*3/8, (s-j-1)*tH+bH+tH/2, i*tW+bW+tW*5/8, (s-j-1)*tH+bH+tH/2);
			}
			noStroke();
		}
	}
}

function mousePressed(){
	var x = floor((mouseX-bW)/tW);
	var y = s - ceil((mouseY-bH)/tH);
	
	var madeMove = false;
	if(engine.selectedSquare != null){
		if(engine.wPOV){
			madeMove = engine.makeMove(x,y);
		}else{
			madeMove = engine.makeMove(s-x-1,s-y-1);
		}
		engine.selectedSquare = null;
		
	}
	if(!madeMove){
		if((x >= 0 && x < s) && (y >= 0 && y < s)){
			if(engine.wPOV){
				engine.selectedSquare = createVector(x,y);	
			}else{
				engine.selectedSquare = createVector(s-x-1,s-y-1);
			}
			engine.possibleMovesFromSelected();
		}else{
			engine.selectedSquare = null;
		}
	}
	//console.log(engine.selectedSquare);
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
	strokeWeight(1);
	noStroke();
}

function displaySelected(selected){
	if(selected != null){
		highlightTile(selected.x, selected.y, [0, 0, 0]);
		var straights = new StraightLim(7, true, true, true, false).moves(selected.x, selected.y);
		for(var i = 0; i < straights.length; i++){
			for(var j = 0; j < straights[i].length; j++){	
				highlightTile(straights[i][j].x, straights[i][j].y, [0,255,0]);
			}
		}
		var diagonals = new DiagonalLim(4, true, true, false, false).moves(selected.x, selected.y);
		for(var i = 0; i < diagonals.length; i++){
			for(var j = 0; j < diagonals[i].length; j++){	
				highlightTile(diagonals[i][j].x, diagonals[i][j].y, [255,255,0]);
			}
		}
		var knights = new Knight().moves(selected.x, selected.y);
		for(var i = 0; i < knights.length; i++){
			highlightTile(knights[i].x, knights[i].y, [0,0,255]);
		}
	}
}