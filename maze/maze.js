function Maze(w,h,gs){
	this.w = w;
	this.h = h;
	this.gs = gs;
	
	this.wt = gs/6;
	this.grid = [];
	this.generated = false;
	this.start;
	this.end;
	
	this.init = function(){
		for(var i = 0; i < this.w; i++){
			this.grid.push([]);
		}
		for(var i = 0; i < this.w; i++){
			for(var j = 0; j < this.h; j++){
				this.grid[i][j] = new Tile(i,j);
			}
		}
	}
	this.draw = function(xoff, yoff){
		for(var i = 0; i < this.w; i++){
			for(var j = 0; j < this.h; j++){
				/*
				if(this.grid[i][j].walls[0]){
					//fill(0)
					rect(i*this.gs+xoff-this.wt, j*this.gs+yoff, this.wt*2, this.gs);
				}*/
				this.grid[i][j].draw(this.gs, this.wt, xoff, yoff);
			}
		}
	}
	this.getTile = function(x,y){
		return this.grid[x][y];
	}
	
	this.generate = function(){
		var next = this.getTile(floor(random(0, this.w)),floor(random(0, this.h)));
		var previous = [];
		var visited = 0;
		while(visited < this.w*this.h){
			
			var curr = next;
			curr.visited = true;
			visited++;
			//console.log(visited);
			//console.log(curr.x+' '+curr.y);
			var directions = this.addDirections(curr.x, curr.y);
			while(directions.length == 0){
				curr = previous.pop();
				var directions = this.addDirections(curr.x, curr.y);
				if (previous.length == 0) break;
			}
			if(directions.length == 0) break;
			
			var dir = directions[floor(random(0, directions.length))];
			//console.log(dir.x+' '+dir.y);
			next = this.getTile(curr.x+dir.x,curr.y+dir.y);
			if (dir.x == 1){
				curr.walls[2] = false;
				next.walls[0] = false;
			}else if (dir.x == -1){
				curr.walls[0] = false;
				next.walls[2] = false;
			}else if (dir.y == 1){
				curr.walls[3] = false;
				next.walls[1] = false;
			}else if (dir.y == -1){
				curr.walls[1] = false;
				next.walls[3] = false;
			}
			previous.push(curr);
		}
		this.start = this.getTile(floor(random(0, this.w)),floor(random(0, this.h)));
		this.start.start = true;
		this.end = this.getTile(floor(random(0, this.w)),floor(random(0, this.h)));
		this.end.end = true;
	}
	this.addDirections = function(x,y){
		var d = [];
		if(x+1 < this.w){
			if(!this.grid[x+1][y].visited){
				d.push(createVector(1,0));
			}
		}
		if(x-1 >= 0){
			if(!this.grid[x-1][y].visited){
				d.push(createVector(-1,0));
			}
		}
		if(y+1 < this.h){
			if(!this.grid[x][y+1].visited){
				d.push(createVector(0,1));
			}
		}
		if(y-1 >= 0){
			if(!this.grid[x][y-1].visited){
				d.push(createVector(0,-1));
			}
		}
		return d;
	}
	this.cut = function(c){
		for(var i = 0; i < c; i++){
			var randx = floor(random(1, this.w-1));
			var randy = floor(random(1, this.h-1));
			var randd = floor(random(0, 4));
			var t1 = this.getTile(randx, randy);
			if(randd == 0){
				var t2 = this.getTile(randx-1, randy);
				t1.walls[0] = false;
				t2.walls[2] = false;
			}
			if(randd == 1){
				var t2 = this.getTile(randx+1, randy);
				t1.walls[2] = false;
				t2.walls[0] = false;
			}
			if(randd == 2){
				var t2 = this.getTile(randx, randy+1);
				t1.walls[3] = false;
				t2.walls[1] = false;
			}
			if(randd == 3){
				var t2 = this.getTile(randx, randy-1);
				t1.walls[1] = false;
				t2.walls[3] = false;
			}
		}
	}
	
	this.init();
}

// 0 - left, 1 - up, 2 - right, 3 - down
function Tile(x, y){
	this.x = x;
	this.y = y;
	this.walls = [true, true, true, true]
	this.visited = false;
	this.start = false;
	this.end = false;
	
	this.draw = function(gs, wt, xoff, yoff){
		if(this.start){
			fill(100,255,100);
		}
		else if(this.end){
			fill(255,100,100);
		}
		else if (!this.visited){
			fill(70);
		}else{
			fill(200,200,255);
		}
		rect(this.x*gs+xoff, this.y*gs+yoff, gs, gs);
		this.drawCorners(gs, wt, xoff, yoff);
		if(this.walls[0]){
			fill(0);
			rect(this.x*gs+xoff, this.y*gs+yoff, wt, gs);
		}
		if(this.walls[1]){
			fill(0);
			rect(this.x*gs+xoff, this.y*gs+yoff, gs, wt);
		}
		if(this.walls[2]){
			fill(0);
			rect((this.x+1)*gs+xoff-wt, this.y*gs+yoff, wt, gs);
		}
		if(this.walls[3]){
			fill(0);
			rect(this.x*gs+xoff, (this.y+1)*gs+yoff-wt, gs, wt);
		}
	}
	this.drawCorners = function(gs, wt, xoff, yoff){
		noStroke();
		fill(0);
		rect(this.x*gs+xoff, this.y*gs+yoff, wt, wt);
		rect((this.x+1)*gs+xoff-wt, this.y*gs+yoff, wt, wt);
		rect(this.x*gs+xoff, (this.y+1)*gs+yoff-wt, wt, wt);
		rect((this.x+1)*gs+xoff-wt, (this.y+1)*gs+yoff-wt, wt, wt);
	}
	
	
}