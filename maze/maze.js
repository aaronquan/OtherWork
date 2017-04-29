function Maze(w,h,gs){
	this.w = w;
	this.h = h;
	this.gs = gs;
	
	this.wt = gs/8;
	this.grid = [];
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
	this.init();
}

// 0 - left, 1 - up, 2 - right, 3 - down
function Tile(x, y){
	this.x = x;
	this.y = y;
	this.walls = [true, true, true, true]
	this.visited = false;
	
	this.draw = function(gs, wt, xoff, yoff){
		if(this.walls[0]){
			rect(this.x*gs+xoff-wt, this.y*gs+yoff, wt*2, gs);
		}
		if(this.walls[1]){
			rect(this.x*gs+xoff, this.y*gs+yoff-wt, gs, wt*2);
		}
		if(this.walls[2]){
			rect((this.x+1)*gs+xoff-wt, this.y*gs+yoff, wt*2, gs);
		}
		if(this.walls[1]){
			rect(this.x*gs+xoff, (this.y+1)*gs+yoff-wt, gs, wt*2);
		}
	}
	
	
}