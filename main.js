const ball = document.getElementById("ball");
const grid = document.querySelector(".grid");
var paddle = document.getElementById("paddle");

var blocks = Array.from(document.querySelectorAll(".grid div")); 

var ballDirectionY = 1 ;
var ballDirectionX = 1


// moving the ball
function moveBall(){
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
    // changing left and top
    ball.style.left = (ballLeft + (10*ballDirectionX)) + "px";
    ball.style.top = (ballTop - (10*ballDirectionY)) + "px"
}

// change direction of ball on collision with walls
function changeDirection(){
    var ballLeft = parseInt(window.getComputedStyle(ball).getPropertyValue("left"));
    var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));

    if(ballTop <0){
        ballDirectionY = -ballDirectionY
    }
    else if(ballLeft < 0 || ballLeft > innerWidth){
        ballDirectionX = -ballDirectionX
    }
}

// Removing blocks with ball and bouncing ball back
function remove(){
    blocks.forEach((block)=>{
        var blockPosition = block.getBoundingClientRect();
        var ballPosition = ball.getBoundingClientRect();
        var removedBlock = block.classList.contains("remove");


        if(blockPosition.left < ballPosition.right && blockPosition.right > ballPosition.left && blockPosition.top < ballPosition.bottom && blockPosition.bottom > ballPosition.bottom && !removedBlock) {
            block.style.visibility = "hidden";
            block.classList.add("remove");
            ballDirectionY = -ballDirectionY
        }else{
            console.log("nothing")
        }
    })
}

// control the paddle with mouse
window.addEventListener("mousemove", movePaddle)

 function movePaddle(e){
     mousePosition ={
         x: e.clientX,
         y: e.clientY
     }
     if(mousePosition.x < innerWidth - 80){
        paddle.style.left = (mousePosition.x + 0) + "px"
     }else{
         console.log("go inside")
     }
 }


 // ball bouce back after hitting the paddle
 function collision(){
    var paddlePosition = paddle.getBoundingClientRect();
    var ballPosition = ball.getBoundingClientRect();
    if(paddlePosition.left < ballPosition.right && paddlePosition.right > ballPosition.left && paddlePosition.top < ballPosition.bottom && paddlePosition.bottom > ballPosition.top){
        ballDirectionY = -ballDirectionY
    }
 }

 // game over funtion
 function gameOver(){
     var ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));
     if(ballTop > innerHeight){
         clearInterval(interval)
         const result = document.getElementById("result");
         result.style.display = "block";
         grid.style.display = "none";
         const box = document.getElementById("box");
         box.style.display = "none";
     }else{
         console.log("nothing")
     }
 }


// Main starting fuction of game
function start(){
    moveBall()
    changeDirection()
    remove()
    collision()
    gameOver()
}

const interval = setInterval(start, 40)