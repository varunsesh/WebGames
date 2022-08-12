const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let x = canvas.width/2;
let y =canvas.height-30;
let dx = 2;
let dy = -2;

let rightKeyPressed = false;    
let leftKeyPressed = false;


const ball = {
    r:10,
    collFlag:false,
    draw:function(x,y,cut){
        ctx.beginPath();
        ctx.arc(x, y, this.r, cut, Math.PI*2, false);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();    
    },
    
};

const paddle = {
    paddleWidth:75, 
    paddleHeight:10,
    paddleX:canvas.width/2,
    draw:function(){
        ctx.beginPath();
        if(leftKeyPressed){
            this.paddleX = Math.max(this.paddleX-7, 0);
        }
        else if(rightKeyPressed){
            this.paddleX = Math.min(this.paddleX+7, canvas.width-this.paddleWidth);
        }    
        ctx.rect(this.paddleX, canvas.height-this.paddleHeight, this.paddleWidth, this.paddleHeight);
        ctx.fillStyle="red";
        ctx.fill();
        ctx.closePath();
    },
    collFlag:false,
};


function keyDownHandler(e){
    if(e.key==="Right" || e.key==="ArrowRight"){
        rightKeyPressed = true;
    }
    else if(e.key==="Left" || e.key === "ArrowLeft"){
        leftKeyPressed = true;
    }

}

function keyUpHandler(e){
    if(e.key==="Right" || e.key==="ArrowRight" || paddle.paddleX >canvas.width){
        rightKeyPressed = false;
    }
    else if(e.key==="Left" || e.key === "ArrowLeft" || paddle.paddleX<0){
        leftKeyPressed = false;
    }

}

//Collision Detection
function detectCollisions(x_ball, y_ball){
    if (y_ball+dy <= ball.r || y_ball + dy >canvas.height-ball.r){
        dy = -dy;
    }

    if (x_ball+dx <= ball.r || x_ball + dx >canvas.width-ball.r){
        dx = -dx;
    }
    
}



function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw(x,y,0);
    paddle.draw();    
    detectCollisions(x,y);
    x+=dx;
    y+=dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);