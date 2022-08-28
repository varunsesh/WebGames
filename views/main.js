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
    paddleY:0,
};

class brick{
    constructor(){
        this.height = 10;
        this.width = 75;
        this.collFlag = false;
    };
    draw(x, y){
        ctx.beginPath();
        ctx.rect(x, y, this.width, this.height);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }
}

const bricks=[];

class ball_template{
    constructor(x,y,r){
        this.r = r;
        this.x=canvas.width/2;
        this.y=canvas.height-30;
        this.dx=2; 
        this.dy=-2;
    };
}

function createWall(){
    let rows = 10;
    let cols = 10;
    let padding = 50;
    let offsetTop = 30;
    let offsetLeft = 35;
    let brickInstance = new brick();
    
    for(let i = 0; i<rows; i++){
        bricks[i] = [];
        for(let j = 0; j<cols; j++){
            bricks[i][j] = {x:0, y:0, bricks:brickInstance};
            let b = bricks[i][j];
            if(ball.x > b.x && ball.x <b.x + b.bricks.width && ball.y > b.y && ball.y < b.y + b.bricks.height){
                console.log("collision!!");
                b.bricks.collFlag = true;
            }
        }
    }
    
    let x = padding, y=padding;
    for(let i = 0; i<rows; i++){
        for(let j = 0; j<cols; j++){
            if(!bricks[i][j].bricks.collFlag){
                bricks[i][j].bricks.draw(x,y);
                y=y+brickInstance.height+offsetTop;
            }
            
        }
        x=x+brickInstance.width+offsetLeft;
        y = padding;
    }
}

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
    
    if (y_ball+ball.dy <= ball.r){
        ball.dy = -ball.dy;
    }
    else if(y_ball + ball.dy > canvas.height - ball.r){
        if((x_ball > paddle.paddleX) && (x_ball < (paddle.paddleX+paddle.paddleWidth))){
            ball.dy = -ball.dy;
        }   
        else{
            alert("Game Over");
            document.location.reload();
            clearInterval(interval);
        }
    }

    if (x_ball+ball.dx <= ball.r || x_ball + ball.dx > canvas.width-ball.r){
        ball.dx = -ball.dx;
    }

}

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball.draw();
    paddle.draw();
    createWall();   
    detectCollisions();
    ball.x+=ball.dx;
    ball.y+=ball.dy;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
const interval = setInterval(draw, 10);