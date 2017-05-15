//pieces: 0 - empty 
//white 1 - pawn, 2 - bishop, 3 - knight, 4 - rook, 5 - queen, 6 - king
//black 7 - pawn, 8 - bishop, 9 - knight, 10 - rook, 11 - queen, 12 - king

var letterToN = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6,  "H": 7};
var nToLetter = ["A", "B", "C", "D", "E", "F", "G", "H"];

function Engine(){
	
	this.rows = 8;
	this.cols = 8;
	
	this.board = []; // [y][x] representation
	this.wTurn = true;
	this.wPOV = true; //board pov
	
	this.selectedMoves = [];
	this.selectedSquare = null;
	
	this.possibleMoves = function(x,y){
		var p = new Piece(this.getPiece(x,y));
		p.getColour();
		
	}
	this.getPiece = function(x,y){
		return this.board[x][y]%7;
	}
	this.getPiece = function(str){
		var coords = toXY(str);
		return this.board[coords.x][coords.y]%7;
	}
	
	this.move = function(){
		
	}
	
	this.toXY = function(str){
		assert(str.length == 2);
		var c1 = str.charAt(0);
		var c2 = str.charAt(1);
		return createVector(letterToN["c1"], parseInt(c2)-1);
	}
	this.toChessSquare = function(x,y){
		return nToLetter[x]+(y+1).toString();
	}
	
	this.setup = function(){
		for(var j = 0; j < this.cols; j++){
			this.board.push([]);
		}
		for(var j = 0; j < this.cols; j++){
			for(var i = 0; i < this.rows; i++){
				if(j == 0){
					if(i == 0 || i == 7) this.board[j][i] = 4;
					else if(i == 1 || i == 6) this.board[j][i] = 3;
					else if(i == 2 || i == 5) this.board[j][i] = 2;
					else if(i == 3) this.board[j][i] = 5;
					else if(i == 4) this.board[j][i] = 6;
				}else if(j == 1){
					this.board[j][i] = 1;
				}else if(j == 6){
					this.board[j][i] = 7; 
				}
				else if(j == 7){
					if(i == 0 || i == 7) this.board[j][i] = 10;
					else if(i == 1 || i == 6) this.board[j][i] = 9;
					else if(i == 2 || i == 5) this.board[j][i] = 8;
					else if(i == 3) this.board[j][i] = 11;
					else if(i == 4) this.board[j][i] = 12;
				}else{
					this.board[j][i] = 0;
				}
			}
		}
	}
	this.printBoard = function(){
		for(var j = this.rows-1; j >= 0; j--){
			var str = '';
			for(var i = 0; i < this.cols; i++){
				str += this.board[j][i].toString()+' ';
			}
			console.log(str);
		}
	}	
}

function Piece(id){
	this.id = id; // 1 to 12
	
	this.moves = [];
	
	this.getColour = function(){
		if(id >= 6){
			return false;
		}else{
			return true;
		}
	}
	this.type = function(){
		var p = (this.id-1)%6;
	}
}

function Knight(){
	this.moves = function(x,y){
		var kn = [createVector(-2, -1),createVector(-2, 1),createVector(2, 1),createVector(2, -1),
				  createVector(1, -2),createVector(1, 2),createVector(-1, 2),createVector(-1, -2)]
		var m = [];
		for(var i = 0; i < kn.length; i++){
			if(kn[i].x+x < 8 && kn[i].y+y < 8 && kn[i].x+x >= 0 && kn[i].y+y >= 0){
				m.push(createVector(kn[i].x+x,kn[i].y+y));
			}	
		}
		return m;
	}
}

function Straight(){
	this.moves = function(x,y){
		var m = [];
		for(var i = 1; i < 8; i++){
			if(x+i < 8) m.push(createVector(x+i, y));
			if(y-i >= 0) m.push(createVector(x, y-i));
			if(x-i >= 0) m.push(createVector(x-i, y));
			if(y+i < 8) m.push(createVector(x, y+i));
		}
		return m;
	}
}

function Diagonal(){
	this.moves = function(x,y){
		var m = [];
		for(var i = 1; i < 8; i++){
			if(x+i < 8 && y+i < 8) m.push(createVector(x+i, y+i));
			if(x+i < 8 && y-i >= 0) m.push(createVector(x+i, y-i));
			if(x-i >= 0 && y+i < 8) m.push(createVector(x-i, y+i));
			if(x-i >= 0 && y-i >= 0) m.push(createVector(x-i, y-i));
		}
		return m;
	}
}
