function Player(x, y, tilesize){
    this.x = x;
    this.y = y;
    this.size = tilesize;
    this.maxSpeed = 0.4;
    this.maxVSpeed = 12;
    this.speed = createVector(0, 0);
    this.show = function(tilesize){
        fill(150);
        rect(this.x, this.y, this.size, this.size);
    }
    
    this.update = function(gravity){
        this.x += this.speed.x;
        this.y += this.speed.y;
        
        if(this.speed.y < this.maxVSpeed){
            this.speed.add(0, gravity);
        }
        
    }
    
    this.jump = function(){
        this.speed.y = -10;
    }
    
    //key points (this.x, this.y+this.size+1), (this.x+this.size, this.y+this.size+1)
    
    this.setDir = function(x){
            this.speed.x = x*this.maxSpeed;
    }

}