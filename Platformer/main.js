var player;
var gravity = 0.1;

var tilesize = 20;
var rows = 20;
var cols= 20;

var blocks = [];

var field = []; 

function setup() {
    createCanvas(tilesize*rows,tilesize*cols);
    player = new Player((rows*tilesize)/2-tilesize/2, 0, tilesize);
    
    for(var j = 0; j < cols; j++){
        var row = [];
        for (var i = 0; i < rows; i++){
            if(j >= 10 && i > 8 && i < 16){
                row.push(new Block(i*tilesize, j*tilesize, tilesize));
            }
            else{
                row.push(undefined);
            }
        }
        field.push(row);
    }
}

function draw() {
    background(20);
    player.show(tilesize);
    player.update(gravity);
    for(var j = 0; j < cols; j++){
        for (var i = 0; i < rows; i++){
            if (field[i][j]){
                field[i][j].show();
            }
        }
    }
}

function Block(_x,_y,_ts){
    this.x = _x;
    this.y = _y;
    this.size = _ts;
    this.show = function(){
        fill(40);
        rect(_x, _y, this.size, this.size);
    }
    this.inside = function(x,y){
        if (x >= this.x && x <= this.x+this.size && y >= this.y && y <= this.y + this.size){
            return true;
        }
        return false;
    }
}


function keyPressed(){
    if(keyCode === LEFT_ARROW){
        player.setDir(-1);
    }
    if(keyCode === RIGHT_ARROW){
        player.setDir(1);
    }
    if(keyCode === UP_ARROW){
        player.jump();
    }
}

function keyReleased(){
    if(keyCode === RIGHT_ARROW){
        if (player.speed.x > 0)
            player.setDir(0);
    }
    if(keyCode === LEFT_ARROW){
        if (player.speed.x < 0)
            player.setDir(0);
    }
}