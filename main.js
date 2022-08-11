const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// ctx.beginPath();
// ctx.rect(20,40,50,50);
// ctx.fillStyle="#FF0000";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.arc(240, 160, 20, 0, Math.PI*2, false);
// ctx.fillStyle = "green";
// ctx.fill();
// ctx.closePath();

// ctx.beginPath();
// ctx.rect(160,10,100,40);
// ctx.strokeStyle = "rgba(0, 0, 255, 1.0)";
// ctx.stroke();
// ctx.closePath();

let x = canvas.width/2;
let y =canvas.height-30;
let dx = 2;
let dy = -2;

function drawball(x, y, r, cut){
    ctx.beginPath();
    ctx.arc(x, y, r, cut, Math.PI*2, false);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

//Collision Detection
function detectCollisions(x_ball, y_ball){
    if (y_ball+dy < 0 || y_ball - dy >canvas.height){
        dy = -dy;
    }

    if (x_ball-dx < 0 || x_ball + dx >canvas.width){
        dx = -dx;
    }
}


function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawball(x, y, 10, 0);
    detectCollisions(x,y);
    x+=dx;
    y+=dy;
}
setInterval(draw, 10);