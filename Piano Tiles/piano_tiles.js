
let WIDTH = 100;
let HEIGHT = 150;

var score;
var time;
var playing;
var won;
var tiles = [];

function setup(){
    createCanvas(400, 600); // keep borders

    time = -3;
    score = 0;
    
    for(var i = 0; i < 4; i++){
        newRow();

        playing = false;
        won = false;
        textAlign(CENTER);
    }
}

function draw(){
    background(51);

    for(var i = 0; i < tiles.length; i++){

        var x = (i % 4) * WIDTH;
        var y = (Math.floor(i / 4)) * HEIGHT;

        // -1 = red
        // 0 = black
        // 1 = white
        fill((tiles[i] !== 0) ? ((tiles[i] === 1) ? "#FFFFFF" : "#FF0000") : "#000000")
        rect(x, y, WIDTH, HEIGHT);
    }

    handleState();

    
}

function getTime(){
    return Math.floor(time / 60) + ":" + Math.floor(map(time % 60, 0, 59, 0, 999)) + "\"";
}

function handleState(){
    
    // handle state
    if(!playing){
        
        if(time > 0){
            // endGame
            
            if(won){
                background("#66EE66");

                fill("#FFFFFF");
                textSize(60);
                text("Complete!", width / 2, height / 2 - 50);

                fill("#000000");
                textSize(70);
                text(getTime(), width / 2, height / 2);

                fill("#FFFFFF");
                textSize(40);
                text("Press f5 to restart!", width / 2, height / 2 + 50);
            }
            else{
                fill("#FF00FF");
                textSize(60);
                text("Game Over!", width / 2, height / 2);
                textSize(40);
                text("Press f5 to restart!", width / 2, height / 2 + 50); 
            }
        }
        else{
            
            // countdown
            textSize(60);
            fill("#FF0000");
            text(-time, width / 2, height / 2);
            if(frameCount % 60 === 0){
    
                time++;
                if(time === 0){
                    playing = true;
                }
            }
        }
    }
    else{
        // draw time
        textSize(90);
        fill("#FFFF00");
        text(getTime(), width / 2, HEIGHT);
        time++;
    }
}

function mousePressed(){

    if(!playing) return;

    if(mouseY >= 3 * HEIGHT && mouseY <= 4 * HEIGHT){
        var t = getClickedTile(mouseX);
        if(t == -1) return;

        if(tiles[t] !== 0){
            // end game

            tiles[t] = -1;
            
            won = false;
            playing = false;
        }
        else{
            score++;
            newRow();

            if(score >= 30){
                // end game
                won = true;
                playing = false;
            }
        }
    }
}

// function keyPressed(){
//     if(!playing) return;
// }

function getClickedTile(mX){
    
    for(var i = 0; i < 4; i++){
        // get clicked on tile
        if(mX >= i * WIDTH && mX <= (i + 1) * WIDTH){
            return i + 12;
        }
    }

    return -1;
}



function newRow(){
    var t = Math.floor(random(4));
    
    for(var i = 0; i < 4; i++){
        tiles.unshift((t === i) ? 0 : 1); // push tiles to the front
    }
}