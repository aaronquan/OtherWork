//pieces: 0 - empty 
//white 1 - pawn, 2 - bishop, 3 - knight, 4 - rook, 5 - queen, 6 - king
//black 7 - pawn, 8 - bishop, 9 - knight, 10 - rook, 11 - queen, 12 - king

var letterToN = {"A": 0, "B": 1, "C": 2, "D": 3, "E": 4, "F": 5, "G": 6,  "H": 7};
var nToLetter = ["A", "B", "C", "D", "E", "F", "G", "H"];

function Engine(){
	
	this.rows = 8;
	this.cols = 8;
	
	this.board = [];
	this.wTurn = true;
	this.wPOV = true; //board pov
	
	this.possibleMoves = function(){
		
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
		for(var i = 0; i < this.rows; i++){
			this.board.push([]);
		}
		for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.cols; j++){
				if(i == 0){
					if(j == 0 || j == 7) this.board[i][j] = 4;
					else if(j == 1 || j == 6) this.board[i][j] = 3;
					else if(j == 2 || j == 5) this.board[i][j] = 2;
					else if(j == 3) this.board[i][j] = 5;
					else if(j == 4) this.board[i][j] = 6;
				}else if(i == 1){
					this.board[i][j] = 1;
				}else if(i == 6){
					this.board[i][j] = 7; 
				}
				else if(i == 7){
					if(j == 0 || j == 7) this.board[i][j] = 10;
					else if(j == 1 || j == 6) this.board[i][j] = 9;
					else if(j == 2 || j == 5) this.board[i][j] = 8;
					else if(j == 3) this.board[i][j] = 11;
					else if(j == 4) this.board[i][j] = 12;
				}else{
					this.board[i][j] = 0;
				}
			}
		}
	}
	this.printBoard = function(){
		for(var i = this.rows-1; i >= 0; i--){
			var str = '';
			for(var j = this.cols-1; j >= 0; j--){
				str += this.board[i][j].toString()+' ';
			}
			console.log(str);
		}
	}	
}

function Piece(){
	
}