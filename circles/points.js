class Point{
	constructor(x,y){
		this.x = x;
		this.y = y;
	}
	show(r=200,g=200,b=200){
		fill(r,g,b);
		stroke(r,g,b);
		ellipse(this.x, this.y, 1.5);
		noFill();
	}
	distanceToPoint(p){
		var dx = this.x - p.x;
		var dy = this.y - p.y;
		return sqrt(dx*dx+dy*dy);
	}
}

class PointSet{
	//a set of points as point class
	constructor(points=[]){
		this.points = points;
	}
	show(r=200,g=200,b=200){
		this.loop(function(p){
			p.show(r,g,b);
		});
	}
	loop(func){
		for(var i=0; i < this.points.length; ++i){
			func(this.points[i]);	
		}
	}
	average(){
		var sumx = 0;
		var sumy = 0;
		for(var i=0; i < this.points.length; ++i){
			sumx += this.points[i].x;
			sumy += this.points[i].y;
		}
		return new Point(sumx/this.points.length, sumy/this.points.length);
	}
	append(p){
		this.points.push(p);	
	}
	appendFromList(list){
		for(var i=0; i < list.length; ++i){
			var p = new Point(list[i]);
			this.append()
		}
	}
	isEmpty(){
		return (this.points.length === 0);
	}
	copyPoints(){
		var points = [];
		for(var i=0; i < this.points.length; ++i){
			var p = this.points[i];
			points.push(new Point(p.x, p.y));
		}
		return points;
	}
	//format x,y\n
	toFile(fn){
		var w = createWriter(fn);
		for(var i=0; i < this.points.length; ++i){
			var p = this.points[i];
			w.print(p.x.toString()+','+p.y.toString());
		}
		w.close();
	}
	//requires a load table
	loadTable(table){
		for (var r = 0; r < table.getRowCount(); r++){
			var point = new Point(parseFloat(table.getString(r, 0)), parseFloat(table.getString(r, 1)));
			this.append(point);
		}
	}
	randomise(){
		for(var i=this.points.length-1; i > 0; --i){
			var j = floor(random(i+1));
			this.points.swap(i,j);
		}
	}
}

class PointMerger extends PointSet{
	constructor(points=[]){
		super(points);
	}
	//merge points in radius r
	averageMerge(pSet, r){
		if(pSet.length == 0){
			return new MergeReturn();
		}
		var current = pSet.pop();
		var ptsToMerge = new PointSet([current]);
		for(var i=pSet.length-1; i >= 0; --i){
			var p = pSet[i];
			var dist = current.distanceToPoint(p);
			if(dist < r){
				ptsToMerge.append(p);
				pSet.splice(i, 1);
			}
		}
		var ave = ptsToMerge.average();
		var returnStruct = {"merged": ave, "list": ptsToMerge.points};
		var nextMerge = this.averageMerge(pSet, r);
		return new MergeReturn(returnStruct).concat(nextMerge);
	}
	simpleMerge(r){
		var pts = this.copyPoints();
		return this.averageMerge(pts, r);
	}
}

//a return structure for a merge function that contains {merged, list} where merged is a single value formed from list
class MergeReturn{
	constructor(first=null){
		if(first == null){
			this.return = [];
		}else{
			this.return = [first];
		}
	}
	append(merged, list){
		this.return.push({"merged": merged, "list": list});
	}
	concat(mr){
		this.return = this.return.concat(mr.return);
		return this;
	}
	mergedItems(){
		var merged = [];
		for(var i=0; i < this.return.length; ++i){
				merged.push(this.return[i]["merged"]);
		}
		return merged;
	}
	preMergeItems(){
		var preMerge = [];
		for(var i=0; i < this.return.length; ++i){
				preMerge.concat(this.return[i]["list"]);
		}
		return preMerge;
	}
}

//random point generator
class PointGenerator extends PointSet{
	constructor(points=[]){
		super(points);
	}
	generateRandomSquare(n, r1, r2){
		for(var i=0; i < n; ++i){
			var p = new Point(random(r1,r2), random(r1,r2));
			this.append(p);
		}
	}
	
}

Array.prototype.swap = function (x,y) {
  var b = this[x];
  this[x] = this[y];
  this[y] = b;
  return this;
}