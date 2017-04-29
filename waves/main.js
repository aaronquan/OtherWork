var waves = [];
var nWaves = 6;
var wl = 100;

var error = 0.000001;

var len = 50;

//say width represents 1 sec 
//num wavelengths = hertz
var w = 150;
var h = 200;

var inc = 0;

function setup(){
	
    createCanvas(w,h);
  	for(var i = nWaves; i > 0; i--){
		var wave = new Wave(wl, h/4, sineWave(wl));
		
		wave.init();
		wave.step(i*5);
		wave.setColour(255/(i+1), 255/(i+1), 255/(i+1));
		waves.push(wave);
	}
    stroke(255);
}

function draw(){
    background(30);
    translate(0, h/2);
    
	for(var i = 0; i < nWaves; i++){
		//waves[i].setColour(waves[i].y*255, waves[i].colour[1], waves[i].colour[2]);
		waves[i].show();
		waves[i].step(1);
	}
    
    //wave.step(1);
}

function Wave(wl, amp, gen){
    this.hertz = w/(wl);
    this.points = [];
    this.wavelength = wl;
    this.amplitude = amp;
    this.gen = gen;
	
	this.colour = [255,255,255];
    
    this.init  = function(){
        for (var i = 0; i < this.wavelength*this.hertz; i++){
            this.points.push(createVector(i, this.gen.next().value));
        }
    }
    this.step = function(n){
		
    	for(var i = 0; i < this.points.length-n; i++){
    		this.points[i].x = i;
			this.points[i].y = this.points[i+n].y;
      	}
		for (var i = n; i > 0; i--){
      		this.points[this.points.length-i] = createVector(this.points.length-i, this.gen.next().value);
		}
    }
	this.setColour = function(r,g,b){
		this.colour[0] = r;
		this.colour[1] = g;
		this.colour[2] = b;
	}
    this.printPoints = function(){
		  for(var i = 0; i < this.points.length; i++){
				console.log(this.points[i].x+", "+this.points[i].y);
		  }
    }
    this.show = function(inc){
		stroke(this.colour[0],this.colour[1],this.colour[2]);
        for(var i = 0; i < this.points.length - 1; i++){
			//stroke(this.points[i].x%255, this.points[i].y*255, this.points[i].y*255);
            line(this.points[i].x, this.points[i].y*this.amplitude, this.points[i+1].x, this.points[i+1].y*this.amplitude);
        }
    }
    
}

//multiple generators per wave
function uniqueWave(wl, amp, gens){
 	this.hertz = w/wl;
    this.points = [];
    this.wavelength = wl;
    this.amplitude = amp;
    this.gen = gen;
    
    this.init  = function(){
        for (var i = 0; i < this.wavelength*this.hertz; i++){
            this.points.push(createVector(i, this.gen.next().value));
        }
    }
    this.step = function(n){
    	for(var i = 0; i < this.points.length-1; i++){
    		this.points[i] = this.points[i+1];
      	}
      	this.points[this.points.length-1] = createVector(this.points.length-1, this.gen.next().value)
    }
    this.add = function(w){
      	for(var i = 0; i < this.points.length; i++){
        	this.points[i].y += w.points[i].y;
      	}
      	this.normaliseSmooth();
    }
    this.normaliseSmooth = function(){
      	for(var i = 0; i < this.points.length; i++){
        	if(this.points[i].y > 1){
          		this.points[i].y -= Math.floor(this.points[i].y-error);
          		this.points[i].y = 1 - this.points[i].y;
        	}
			else if(this.points[i].y < -1){
				this.points[i].y -= Math.ceil(this.points[i].y+error);
				this.points[i].y = -1 - this.points[i].y;
			}
		}
    }
    this.normaliseJump= function(){
      	for(var i = 0; i < this.points.length; i++){
        	if(this.points[i].y > 1){
          		this.points[i].y -= Math.floor(this.points[i].y-error);
        	}
			else if(this.points[i].y < -1){
				this.points[i].y -= Math.ceil(this.points[i].y+error);
			}
		}
    }
    this.printPoints = function(){
		  for(var i = 0; i < this.points.length; i++){
				console.log(this.points[i].x+", "+this.points[i].y);
		  }
    }
    this.show = function(inc){
        for(var i = 0; i < this.points.length - 1; i++){
            line(this.points[i].x, this.points[i].y*this.amplitude, this.points[i+1].x, this.points[i+1].y*this.amplitude);
        }
    }
}

function* sineWave(len) {
  var index = 0;
  while(true){
    var rad = (2*PI*index)/len;
    index++;
    yield sin(rad);
  }
}

function* sawWave(len) {
  var index = -1;
  while(true){
    yield ((index%len)/len)*2 - 1;
    index++;
  }
}

function* triangleWave(len) {
  var inc = 4;
  var index = 0;
  var up = true;
  while(true){
    if(up){
      if(index >= len){
        inc = -inc;
        up = false;
      }
    }else{
      if(index <= -len){
        inc = -inc;
        up = true;
      }
    }
    yield index/len;
    index+=inc;
  }
}

function Sinewave(wl, amp){
    this.hertz = w/wl;
    this.points = [];
    this.wavelength = wl;
    this.amplitude = amp;
    this.gen = sineWave(wl);
    
    this.create  = function(n){
        for (var i = 0; i < this.wavelength*n; i++){
            this.points.push(createVector(i, this.gen.next().value*this.amplitude));
        }
    }
    this.show = function(){
        for(var i = 0; i < this.points.length - 1; i++){
            line(this.points[i].x, this.points[i].y, this.points[i+1].x, this.points[i+1].y);
        }
    }
}