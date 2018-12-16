var system;
var t = 0;
var w = 400;
var h = 400;

function setup(){
	createCanvas(w,h);
	system = new System();
	
	var p = new Particle(5, 200, 250, 2, 0.1);
	var p2 = new Particle(10, 250, 200, 0.1, 1);
	var p3 = new Particle(8, 100, 100, 0.5, -0.2);
	
	var gz = new GravitationalZone(3, 200, 200);
	var gz2 = new GravitationalZone(0.4, 280, 160);
	system.addParticle(p);
	system.addParticle(p2);
	system.addGravitationalField(gz);
	system.addGravitationalField(gz2);
	system.addParticle(p3);
	noStroke();
}

function draw(){
	background(210);
	/*
	var ac = gz.findForce(p);
	var ac2 = gz.findForce(p2);
	
	t+=1;
	
	p.accel(ac.x, ac.y);
	p.move();
	p.show(t);
	p2.accel(ac2.x, ac2.y);
	p2.move();
	p2.show(t);
	*/
	system.progress();
	system.show(t);
	t += 1;
}
