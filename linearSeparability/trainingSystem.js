function TrainingSystem(){
	this.points = [];
	this.linearlySeparable = true;
	
	this.w1 = 0.1; //x
	this.w2 = 0.1; //y
	this.w0 = 0; //th
	
	this.addPoint = function(point){
		this.points.push(point);
	}
	this.calculateLearning = function(lr, point){
		console.log(point);
		var s = this.w1*point.x+this.w2*point.y+this.w0;
		console.log(s);
		if(s >= 0 && point.v){
			this.w1 -= lr*point.x;
			this.w2 -= lr*point.y;
			this.w0 -= lr
		}else if(s < 0 && !point.v){
			this.w1 += lr*point.x;
			this.w2 += lr*point.y;
			this.w0 += lr;
		}
	}
	
	this.display = function(w){
		for(var i = 0; i < this.points.length; i++){
			this.points[i].display();
		}
		var y1 = -this.w0/this.w2;
		var y2 = -(this.w1*w+this.w0)/this.w2;
		line(0, y1, w, y2);
	}
	
}

