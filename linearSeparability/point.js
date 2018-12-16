function Point2D(x,y, val){
	this.x = x;
	this.y = y;
	this.v = val;
	
	this.randomise = function(xlo, xhi, ylo, yhi){
		this.x = random()*(xlo+xhi)-xlo;
		this.y = random()*(ylo+yhi)-ylo;
		if(random()*2 > 1){
			this.v = true;
		}else{
			this.v = false;
		}
	}
	
	this.display = function(){
		if(!this.v){
			fill(255);
		}else{
			fill(0);
		}
		ellipse(this.x,this.y, 6)
	}
}
