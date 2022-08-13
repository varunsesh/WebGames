const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");


let rightKeyPressed = false;    
let leftKeyPressed = false;


let ball = {
    x:canvas.width/2,
    y:canvas.height-30,
    dx:2, 
    dy:-2,
    r:10,
    collFlag:false,
    draw:function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, false);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();    
    },
    
};

let paddle = {
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
function detectCollisions(){
    let x_ball = ball.x;
    let y_ball = ball.y;
    
    if (y_ball+ball.dy <= ball.r || y_ball + ball.dy >canvas.height-ball.r){
        ball.dy = -ball.dy;
    }

    if (x_ball+ball.dx <= ball.r || x_ball + ball.dx >canvas.width-ball.r){
        ball.dx = -ball.dx;
    }
    
}



function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    paddle.draw();    
    detectCollisions();
    ball.x+=ball.dx;
    ball.y+=ball.dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 10);