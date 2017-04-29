function Polygon(){
	this.points = []; //contains vectors
	
	
	//this.lines = []; //two points
	
	this.appendPoint = function(p){
		if (this.points.length < 3){
			this.points.push(p);
			return;
		}
		var c = 0;
		while (!this.needsUntangle(p) && c < this.points.length-1){
			var front = this.points.shift();
			this.points.push(front);
			++c;
			console.log(c);
		}
		this.points.push(p);
	}
	//this.addPoint = function(p, n){
	//	this.points.splice(n, 0, p);
	//}
	this.remove = function(){
		this.points.pop();
	}
	this.removePoint = function(n){
		this.points.splice(n,1);
	}
	
	this.show = function(){
		if(this.points.length < 2) return;
		stroke(255);
		for(var i = 0; i < this.points.length-1; ++i){
			line(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
		}
		line(this.points[0].x, this.points[0].y, this.points[this.points.length-1].x, this.points[this.points.length-1].y);
	}
	
	this.needsUntangle = function(p){
		var len = this.points.length;
		var p1 = this.points[0];
		var p2 = this.points[1];
		
		var p3 = this.points[len-1];
		var p4 = this.points[len-2];
		
		if(solve2PointLineForX(p1,p2, p3.y) >= p3.x){
			if(solve2PointLineForX(p1,p2, p.y) >= p.x && solve2PointLineForX(p4,p3,p.y) <= p.x){
				return true;
			}
		}else{
			if(solve2PointLineForX(p1,p2, p.y) < p.x && solve2PointLineForX(p4,p3,p.y) > p.x){
				return true;
			}
		}
		return false;
	}
	
	this.inside = function(x, y){
		var len = this.points.length
		if(len < 2) return false;
		var possibleLines = []; 
		var numCrosses = 0;
		for(var i = 0; i < len-1; ++i){
			var y1 = this.points[i].y;
			var y2 = this.points[i+1].y;
			if(y > min(y1, y2) && y < max(y1, y2)){
				var line = [this.points[i], this.points[i+1]];
				possibleLines.push(line);
			}
		}
		var y1 = this.points[len-1].y;
		var y2 = this.points[0].y;
		if(y > min(y1, y2) && y < max(y1, y2)){
			var line = [this.points[len-1], this.points[0]];
			possibleLines.push(line);
		}
		console.log("possiblelines: "+possibleLines.length);
		
		for(var i = 0; i < possibleLines.length; ++i){
			/*
			var m = (possibleLines[i][0].y - possibleLines[i][1].y)/(possibleLines[i][0].x - possibleLines[i][1].x);
			var b = possibleLines[i][0].y - possibleLines[i][0].x*m;
			var nx = (y-b)/m
			*/
			if(solve2PointLineForX(possibleLines[i][0], possibleLines[i][1], y) > x){
				numCrosses += 1;
			}
		}
		console.log("crosses: "+numCrosses);
		return numCrosses % 2 == 0 ? false : true; 
	}
	
}

//l1, l2 are 2 element arrays of vectors
function solve2PointLineForX(l1, l2, y){
	var m = (l1.y - l2.y)/(l1.x - l2.x);
	var b = l1.y - l1.x*m;
	return (y-b)/m
}

function solve2PointLineForY(l1, l2, x){
	var m = (l1.y - l2.y)/(l1.x - l2.x);
	var b = l1.y - l1.x*m;
	return m*x + b
}
