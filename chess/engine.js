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
	
	this.wKing; //position of king white
	this.bKing; //position of king black
	
	
	//should change to a list of moves
	this.lastTaken;
	this.lastMoveDestination;
	this.lastMoveStart;
	
	this.checked = false; //current player is checked
	
	this.selectedMoves = [];
	this.selectedSquare = null;
	
	this.possibleMovesFromSelected = function(){
		if(this.selectedSquare == null) return;
		var x = this.selectedSquare.x;
		var y = this.selectedSquare.y;
		var id = this.board[y][x];
		if(id == 0){
			this.selectedMoves = [];
			return;
		}
		this.selectedMoves = this.getMoves(x,y,false);
		
	}
	this.getPiece = function(x,y){
		return this.board[y][x];
	}
	this.replacePiece = function(x,y, id){
		this.board[y][x] = id;
	}
	this.getColour = function(id){
		if(id > 6){
			return false;
		}else if(id > 0){
			return true;
		}
	}
	this.getType = function(id){
		return (id-1)%6;
	}	
	/*
	this.getPieceFromString = function(str){
		var coords = this.toXY(str);
		return this.board[coords.x][coords.y]%7;
	}*/
	
	this.makeMove = function(x,y){
		var id = this.getPiece(this.selectedSquare.x, this.selectedSquare.y);
		var c = this.getColour(id);
		if(c != this.wTurn){
			return false;
		}
		for(var i = 0; i < this.selectedMoves.length; i++){
			if(this.selectedMoves[i].x == x && this.selectedMoves[i].y == y){
				this.lastTaken = this.getPiece(x, y);
				this.movePiece(x,y, this.selectedSquare.x, this.selectedSquare.y, id);
				this.lastMoveDestination = createVector(x, y);
				this.lastMoveStart = createVector(this.selectedSquare.x, this.selectedSquare.y);
				if(this.getType(id) == 5){
					if(this.wTurn){
						this.wKing = createVector(x,y);
					}else{
						this.bKing = createVector(x,y);
					}
				}
				this.checked = this.detectCheck();
				console.log(this.checked);
				this.wTurn = !this.wTurn;
				return true;
			}
		}
		return false;
	}
	this.movePiece = function(prevX, prevY, newX, newY, id){
		this.replacePiece(newX,newY, id);
		this.replacePiece(prevX, prevY, 0);
	}
	this.undoLast = function(){
		var id = this.getPiece(this.lastMoveDestination.x, this.lastMoveDestination.y);
		this.replacePiece(this.lastMoveStart.x, this.lastMoveStart.y, id);
		this.replacePiece(this.lastMoveDestination.x, this.lastMoveDestination.y, this.lastTaken);
		this.wTurn = !this.wTurn;
	}
	this.toXY = function(str){
		//assert(str.length == 2);
		//var c1 = str.charAt(0);
		//var c2 = str.charAt(1);
		//return createVector(letterToN[c1], parseInt(c2)-1);
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
					else if(i == 4){ 
						this.board[j][i] = 6;
						this.wKing = createVector(i,j);
					}
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
					else if(i == 4){
						this.board[j][i] = 12; 
						this.bKing = createVector(i,j);
					}
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
	
	this.checkSquares = function(squares, condition, colour){
		//squares 2d array
		//condition 0 - empty
		//condition 1 - capture only
		//condition 2 - both
		//condition 3 - move through opposite colour
		//condition 4 - check after move
		var moves = [];
		for(var i = 0; i < squares.length; i++){
			for(var j = 0; j <  squares[i].length; j++){
				var pos = squares[i][j];
				var id = this.getPiece(pos.x, pos.y);
				if(condition == 0){
					if(id == 0) moves.push(pos);
					else break;
				}else if(condition == 1){
					if(colour){
						if(id > 6 && id != 0) moves.push(pos);
					}else{
						if(id <= 6 && id >= 1) moves.push(pos);
					}
					break;
				}else if(condition == 2){
					if(colour){
						if(id == 0) moves.push(pos);
						else if(id == 12) moves.push(pos);
						else if(id > 6){
							moves.push(pos);
							break;
						}else if(id <= 6) break;
					}else{
						if(id == 0) moves.push(pos);
						else if(id == 6) moves.push(pos);
						else if(id < 6 && id >= 1){
							moves.push(pos);
							break;
						}else if(id > 6) break;
					}
				}else if(condition == 3){
					if(colour){
						if(id == 0) moves.push(pos);
						else if(id == 12) moves.push(pos);
						else if(id > 6){
							moves.push(pos);
							break;
						}else if(id <= 6){
							moves.push(pos);
							break;
						}
					}else{
						if(id == 0) moves.push(pos);
						else if(id == 6) moves.push(pos);
						else if(id < 6 && id >= 1){
							moves.push(pos);
							break;
						}else if(id > 6){
							moves.push(pos);
							break;
						}
					}
				}else if(condition == 4){
					if(colour){
						if(id <= 6 && id > 0) continue;
					}else{
						if(id > 6) continue;
					}
					this.movePiece(x,y, this.selectedSquare.x, this.selectedSquare.y, id);
					this.wTurn = !this.wTurn;
					var check = this.detectCheck();
					if(!check){
						moves.push(pos);
					}
					this.undoLast();
				}
			}
		}
		return moves;
	}
	this.checkSquaresKnight = function(squares, colour){
		var moves = [];
		for(var i = 0; i < squares.length; i++){
			var pos = squares[i];
			var id = this.getPiece(pos.x, pos.y);
			if(colour){
				if(id == 0 || id > 6){
					moves.push(pos);
				}
			}else{
				if(id <= 6){
					moves.push(pos);
				}
			}
		}
		return moves;
	}
	this.checkSquaresKing = function(squares, colour){
		if(squares.length == 0) return [];
		var attacking = this.possibleChecks(colour);
		var moves = [];
		for(var i = 0; i < squares.length; i++){
			var pos = squares[i];
			var available = true;
			for(var j = 0; j < attacking.length; j++){
				if(pos.x == attacking[j].x && pos.y == attacking[j].y){
					available = false;
					break;
				}
			}
			if(available) moves.push(pos);
		}
		return moves;
	}
	this.detectCheck = function(){
		var toFind = this.possibleChecks(!this.wTurn);
		for(var i = 0; i < toFind.length; i++){
			if(this.wTurn){
				if(toFind[i].x == this.bKing.x && toFind[i].y == this.bKing.y) return true;
			}else{
				if(toFind[i].x == this.wKing.x && toFind[i].y == this.wKing.y) return true;
			}
		}
		return false;
	}
	this.possibleChecks = function(colour){
		//checks on colour
		var attacking = [];
		for(var i = 0; i < this.cols; i++){
			for(var j = 0; j < this.rows; j++){
				var id = this.getPiece(i, j);
				if(id == 0) continue;
				var c = this.getColour(id);
				if(c == colour) continue;
				if((id-1)%6 == 5){
					var dia = new Diagonal(1).moves(i,j);
					var str = new Straight(1).moves(i,j);
					attacking = arrayAdd(attacking, this.checkSquares(dia, 0, c));
					attacking = arrayAdd(attacking, this.checkSquares(str, 0, c));
				}else{
					attacking = arrayAdd(attacking, this.getMoves(i,j,true));
				}
			}
		}
		return attacking;
	}
	this.getMoves = function(x,y, king){
		var id = this.board[y][x];
		if(id == 0) return [];
		var c = this.getColour(id);
		var type = (id-1)%6;
		var moves = [];
		if(c != this.wTurn) return []; //restricts turn
		if(type == 0){
			var numForward;
			var forward;
			var capture;
			if(c){
				if(y == 1) numForward = 2;
				else numForward = 1;
				forward = new StraightLim(numForward, true, false, false, false).moves(x, y);
				capture = new DiagonalLim(1, true, true, false, false).moves(x, y);
			}
			else{
				if(y == 6) numForward = 2;
				else numForward = 1;
				forward = new StraightLim(numForward, false, false, true, false).moves(x, y);
				capture = new DiagonalLim(1, false, false, true, true).moves(x, y);
			}
			if(!king){
				moves = arrayAdd(moves, this.checkSquares(forward, 0, c));
				moves = arrayAdd(moves, this.checkSquares(capture, 1, c));
			}else{
				moves = arrayAdd(moves, this.checkSquares(capture, 3, c));
			}
		}else if(type == 1){
			var diagonal = new Diagonal(7).moves(x,y);
			if(!king) moves = arrayAdd(moves, this.checkSquares(diagonal, 2, c));
			else moves = arrayAdd(moves, this.checkSquares(diagonal, 3, c));
		}else if(type == 2){
			var knight = new Knight().moves(x,y);
			moves = arrayAdd(moves, this.checkSquaresKnight(knight, c));
		}else if(type == 3){
			var straight = new Straight(7).moves(x,y);
			if(!king) moves = arrayAdd(moves, this.checkSquares(straight, 2, c));
			else moves = arrayAdd(moves, this.checkSquares(straight, 3, c));
		}else if(type == 4){
			var straight = new Straight(7).moves(x,y);
			var diagonal = new Diagonal(7).moves(x,y);
			if(!king){
				moves = arrayAdd(moves, this.checkSquares(straight, 2, c));
				moves = arrayAdd(moves, this.checkSquares(diagonal, 2, c));
			}else{
				moves = arrayAdd(moves, this.checkSquares(straight, 3, c));
				moves = arrayAdd(moves, this.checkSquares(diagonal, 3, c));
			}
		}else if(type == 5){
			var s1 = new Straight(1).moves(x,y);
			var s2 = new Diagonal(1).moves(x,y);
			var s3 = this.checkSquares(s1, 2, c);
			var s4 = this.checkSquares(s2, 2, c);
			if(!king){
				moves = arrayAdd(moves, this.checkSquaresKing(s3,c));
				moves = arrayAdd(moves, this.checkSquaresKing(s4,c));
			}else{
				moves = arrayAdd(moves, this.checkSquares(s1, 0, c));
				moves = arrayAdd(moves, this.checkSquares(s2, 0, c));
			}
		}
		return moves;
	}
}

function Piece(id, posx, posy){
	this.id = id; // 1 to 12
	this.type = (this.id-1)%6;
	this.colour; //defined later
	this.pos = createVector(posx, posy);
	this.possibleMoves = [];
	
	this.getPossibleMoves = function(){
		if(this.type == 0){
			//pawn 
			var numForward;
			var forward;
			var capture;
			if(this.colour){
				if(this.pos.y == 1){
					numForward = 2;
				}else{
					numForward = 1;
				}
				forward = new StraightLim(numForward, true, false, false, false).moves(this.pos.x, this.pos.y);
				capture = new DiagonalLim(1, true, true, false, false).moves(this.pos.x, this.pos.y);
			}
			else{
				if(this.pos.y == 6){
					numForward = 2;
				}else{
					numForward = 1;
				}
				forward = new StraightLim(numForward, true, false, false, false).moves(this.pos.x, this.pos.y);
				capture = new DiagonalLim(1, true, true, false, false).moves(this.pos.x, this.pos.y);
			}
			this.possibleMoves = arrayAdd(forward, capture);	
		}
	}
	
	this.getColour = function(){
		if(this.id >= 6){
			this.colour = false; //black
		}else{
			this.colour = true; //white
		}
	}
	
	this.getColour();
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

function Straight(l){
	this.length = l;
	this.active = [true, true, true, true];
	//[up, right, down, left]
	
	this.moves = function(x,y){
		var m = []; 
		m.push([]); m.push([]); m.push([]); m.push([]);
		for(var i = 1; i <= l; i++){
			if(x+i < 8 && this.active[1]) m[1].push(createVector(x+i, y));
			if(y-i >= 0 && this.active[2]) m[2].push(createVector(x, y-i));
			if(x-i >= 0 && this.active[3]) m[3].push(createVector(x-i, y));
			if(y+i < 8 && this.active[0]) m[0].push(createVector(x, y+i));
		}
		return m;
	}
	this.makeInactive = function(i){
		this.active[i] = false;
	}
}

function StraightLim(l, up, right, down, left){
	this.length = l;
	this.active = [up, right, down, left];
	this.moves = function(x,y){
		var m = []; 
		m.push([]); m.push([]); m.push([]); m.push([]);
		for(var i = 1; i <= l; i++){
			if(x+i < 8 && this.active[1]) m[1].push(createVector(x+i, y));
			if(y-i >= 0 && this.active[2]) m[2].push(createVector(x, y-i));
			if(x-i >= 0 && this.active[3]) m[3].push(createVector(x-i, y));
			if(y+i < 8 && this.active[0]) m[0].push(createVector(x, y+i));
		}
		return m;
	}
}

function Diagonal(l){
	this.length = l;

	this.moves = function(x,y){
		var m = [];
		m.push([]); m.push([]); m.push([]); m.push([]);
		for(var i = 1; i <= l; i++){
			if(x+i < 8 && y+i < 8) m[0].push(createVector(x+i, y+i));
			if(x+i < 8 && y-i >= 0) m[1].push(createVector(x+i, y-i));
			if(x-i >= 0 && y+i < 8) m[2].push(createVector(x-i, y+i));
			if(x-i >= 0 && y-i >= 0) m[3].push(createVector(x-i, y-i));
		}
		return m;
	}
}

function DiagonalLim(l, upl, upr, downr, downl){
	this.length = l;
	this.active = [upl, upr, downr, downl];
	//[up-left, up-right, down-right, down-left]
	this.moves = function(x,y){
		var m = [];
		m.push([]); m.push([]); m.push([]); m.push([]);
		for(var i = 1; i <= l; i++){
			if(x+i < 8 && y+i < 8 && this.active[1]) m[1].push(createVector(x+i, y+i));
			if(x+i < 8 && y-i >= 0 && this.active[2]) m[2].push(createVector(x+i, y-i));
			if(x-i >= 0 && y+i < 8 && this.active[0]) m[0].push(createVector(x-i, y+i));
			if(x-i >= 0 && y-i >= 0 && this.active[3]) m[3].push(createVector(x-i, y-i));
		}
		return m;
	}
}

function array2dRotate180(array){
	var newArray = [];
	var n = 0;
	for(var j = array.length-1; j >= 0; j--){
		newArray.push([]);
		for(var i = array[j].length-1; i >= 0; i--){
			newArray[n].push(array[j][i]);
		}
		n += 1;
	}
	return newArray;
}

function arrayAdd(a1, a2){
	for(var i = 0; i < a2.length; i++){
		a1.push(a2[i]);
	}
	return a1;
}
		
function array2dto1d(array){
	var ret = [];
	for(var i = 0; i < array.length; i++){
		for (var j = 0; j < array[i].length; j++){
			ret.push(array[i][j]);
		}
	}
	return ret;
}