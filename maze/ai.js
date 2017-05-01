function SLTai(maze){
	this.maze = maze;
	this.paths = [];
	this.current;
	this.steps = 0;
	this.checked = [];
	
	this.found = false;
	
	this.initPath = function(){
		var p = new Path();
		p.addPath(createVector(this.maze.start.x, this.maze.start.y));
		this.paths.push(p);
	}
	this.initChecked = function(){
		for(var i = 0; i < this.maze.w; i++){
			this.checked.push([]);
		}
		for(var i = 0; i < this.maze.w; i++){
			for(var j = 0; j < this.maze.h; j++){
				this.checked[i][j] = false;
			}
		}
	}
	
	this.next = function(){
		if (this.found) return;
		this.current = this.paths.shift();
		var last = this.current.last();
		this.checked[last.x][last.y] = true;
		if(last.x == this.maze.end.x && last.y == this.maze.end.y){
			console.log("STLai: "+this.steps);
			this.found = true;
			return;
		}
		var lastTile = this.maze.getTile(last.x, last.y);
		var end = this.maze.end;
		if (!lastTile.walls[0]){
			if(!this.checked[last.x-1][last.y]){
				var p = new Path();
				this.current.copyPath(p);
				p.addValue(sqrt(((last.x-1)-end.x)*((last.x-1)-end.x)+(last.y-end.y)*(last.y-end.y)));
				p.addPath(createVector(last.x-1,last.y));
				this.addToPaths(p);
			}
		}
		if (!lastTile.walls[1]){
			if(!this.checked[last.x][last.y-1]){
				var p = new Path();
				this.current.copyPath(p);
				p.addValue(sqrt((last.x-end.x)*(last.x-end.x)+((last.y-1)-end.y)*((last.y-1)-end.y)));
				p.addPath(createVector(last.x,last.y-1));
				this.addToPaths(p);
			}
		}
		if (!lastTile.walls[2]){
			if(!this.checked[last.x+1][last.y]){
				var p = new Path();
				this.current.copyPath(p);
				p.addValue(sqrt(((last.x+1)-end.x)*((last.x+1)-end.x)+(last.y-end.y)*(last.y-end.y)));
				p.addPath(createVector(last.x+1,last.y));
				this.addToPaths(p);
			}
		}
		if (!lastTile.walls[3]){
			if(!this.checked[last.x][last.y+1]){
				var p = new Path();
				this.current.copyPath(p);
				p.addValue(sqrt((last.x-end.x)*(last.x-end.x)+((last.y+1)-end.y)*((last.y+1)-end.y)));
				p.addPath(createVector(last.x,last.y+1));
				this.addToPaths(p);
			}
		}
		this.steps++;
	}
	this.drawCurrent = function(gs, xoff, yoff){
		for(var i = 0; i < this.current.path.length - 1; i++){
			fill(80,200,200);
			rect(this.current.path[i].x*gs+gs/3+xoff, this.current.path[i].y*gs+gs/3+yoff, gs/3, gs/3);
		}
		fill(50,130,130);
		rect(this.current.path[this.current.path.length-1].x*gs+gs/4+xoff, this.current.path[this.current.path.length-1].y*gs+gs/4+yoff, gs*2/4, gs*2/4);
	}
	this.addToPaths = function(p){
		var ind = 0;
		while (ind < this.paths.length){
			if(p.value < this.paths[ind].value) break;
			ind++;
		}
		this.paths.splice(ind, 0, p);
	}
	this.initPath();
	this.initChecked();
}

function MDai(){
	this.maze = maze;
	this.paths = [];
	this.current;
	this.steps = 0;
	this.checked = [];
	
	this.found = false;
	
	this.initPath = function(){
		var p = new Path();
		p.addPath(createVector(this.maze.start.x, this.maze.start.y));
		this.paths.push(p);
	}
	this.initChecked = function(){
		for(var i = 0; i < this.maze.w; i++){
			this.checked.push([]);
		}
		for(var i = 0; i < this.maze.w; i++){
			for(var j = 0; j < this.maze.h; j++){
				this.checked[i][j] = false;
			}
		}
	}
	
	this.next = function(){
		if (this.found) return;
		this.current = this.paths.shift();
		//var s = '';
		//for(var i = 0; i<this.paths.length;i++){
		//	s += this.paths[i].value.toString()+' ';
		//}
		//console.log(s);
		var last = this.current.last();
		this.checked[last.x][last.y] = true;
		if(last.x == this.maze.end.x && last.y == this.maze.end.y){
			console.log("MDai: "+this.steps);
			this.found = true;
			return;
		}
		var lastTile = this.maze.getTile(last.x, last.y);
		var end = this.maze.end;
		if (!lastTile.walls[0]){
			if(!this.checked[last.x-1][last.y]){
				var p = new Path();
				this.current.copyPath(p);
				p.addValue(abs(last.x-1-end.x)+abs(last.y-end.y));
				p.addPath(createVector(last.x-1,last.y));
				this.addToPaths(p);
			}
		}
		if (!lastTile.walls[1]){
			if(!this.checked[last.x][last.y-1]){
				var p = new Path();
				this.current.copyPath(p);
				p.addValue(abs(last.x-end.x)+abs(last.y-1-end.y));
				p.addPath(createVector(last.x,last.y-1));
				this.addToPaths(p);
			}
		}
		if (!lastTile.walls[2]){
			if(!this.checked[last.x+1][last.y]){
				var p = new Path();
				this.current.copyPath(p);
				p.addValue(abs(last.x+1-end.x)+abs(last.y-end.y));
				p.addPath(createVector(last.x+1,last.y));
				this.addToPaths(p);
			}
		}
		if (!lastTile.walls[3]){
			if(!this.checked[last.x][last.y+1]){
				var p = new Path();
				this.current.copyPath(p);
				p.addValue(abs(last.x-end.x)+abs(last.y+1-end.y));
				p.addPath(createVector(last.x,last.y+1));
				this.addToPaths(p);
			}
		}
		this.steps++;
	}
	this.addToPaths = function(p){
		var ind = 0;
		while (ind < this.paths.length){
			if(p.value < this.paths[ind].value) break;
			ind++;
		}
		this.paths.splice(ind, 0, p);
	}
	this.drawCurrent = function(gs, xoff, yoff){
		for(var i = 0; i < this.current.path.length - 1; i++){
			fill(200,80,200);
			rect(this.current.path[i].x*gs+gs*5/12+xoff, this.current.path[i].y*gs+gs*5/12+yoff, gs/6, gs/6);
		}
		fill(130,50,130);
		rect(this.current.path[this.current.path.length-1].x*gs+gs*3/8+xoff, this.current.path[this.current.path.length-1].y*gs+gs*3/8+yoff, gs*1/4, gs*1/4);
	}
	this.initPath();
	this.initChecked();
}


function Path(){
	this.path = [];
	this.value = 0;
	this.addPath = function(next){
		this.path.push(next);
		this.value += 1;
	}
	this.addValue = function(v){
		this.value += v;
	}
	this.last = function(){
		return this.path[this.path.length-1];
	}
	this.copyPath = function(p){
		for(var i = 0; i < this.path.length; i++){
			p.addPath(this.path[i]);
		}
	}
}
