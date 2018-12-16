function Particle(r, x, y, vx, vy){
	this.r = r;
	this.x = x; 
	this.y = y;
	this.vx = vx;
	this.vy = vy;
	this.colour = [0,0,0];
	
	this.accel = function(xa, ya){
		this.vx = limitFromZero(this.vx+xa, 2);
		this.vy = limitFromZero(this.vy+ya, 2);
	}
	this.move = function(){
		this.x += this.vx;
		this.y += this.vy;
		
	}
	this.show = function(t){
		fill(smoothColour(this.y+this.x*2), smoothColour(this.y*3-t), smoothColour(t));
		ellipse(this.x, this.y, this.r);
	}
	
	
}

function smoothColour(i){
	var x = i % (256*2-1);
	if(x >= 256){
		x = 256*2-1 - x
	}
	return x;
}

function GravitationalZone(s, x, y){
	this.s = s;
	this.x = x;
	this.y = y;
	
	this.findForce = function(particle){
		var dx = particle.x - this.x;
		var dy = particle.y - this.y;
		var f = -this.s/(abs(dx)+abs(dy)+1)
		var fx = f*dx/(abs(dx)+abs(dy))
		var fy = f*dy/(abs(dx)+abs(dy))
		fx = limitFromZero(fx, this.s);
		fy = limitFromZero(fy, this.s);
		
		return createVector(fx, fy);
	}
	
}

function limitFromZero(n, lim){
	if(n > lim){
		return lim;
	}
	if(n < -lim){
		return -lim;
	}
	return n;
}
