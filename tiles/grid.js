function Grid(nw, nh){
	this.w = nw;
	this.h = nh;
	this.grid = [];
	
	this.init = function(){
		for(var i = 0; i < this.w; i++){
			this.grid.push([]);
		}
		for(var i = 0; i < this.w; i++){
			for(var j = 0; j < this.h; j++){
				this.grid[i][j] = null;
			}
		}
	}
	
	this.init();
}