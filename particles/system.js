function System(){
	this.particles = [];
	this.gravitationalFields = [];
	
	this.addParticle = function(particle){
		this.particles.push(particle);
	}
	
	this.addGravitationalField = function(grav){
		this.gravitationalFields.push(grav);
	}
	
	this.progress = function(){
		for(var i = 0; i < this.particles.length; i++){
			var sum = createVector(0, 0);
			for(var j = 0; j < this.gravitationalFields.length; j++){
				var ga = this.gravitationalFields[j].findForce(this.particles[i]);
				sum.x += ga.x;
				sum.y += ga.y;
			}
			this.particles[i].accel(sum.x, sum.y);
			this.particles[i].move();
		}
	}
	this.show = function(t){
		for(var i = 0; i < this.particles.length; i++){
			this.particles[i].show(t);
		}
	}
}