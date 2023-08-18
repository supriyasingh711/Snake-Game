const playboard=document.querySelector(".play-board");
const scoreElement=document.querySelector(".score");
const highscoreElement=document.querySelector(".high-score");
const controls=document.querySelectorAll(".controls i");



let foodX,foodY,snakeX=5,snakeY=10;
let velocityX=0,velocityY=0;
let gameOver=false;
let snakeBody=[];
let setIntervalId;
let score=0;
let highscore=localStorage.getItem("high-score")|| 0;
highscoreElement.innerText=`High-Score:${highscore}`;


const changeFoodPosition=()=>{
    foodX=Math.floor(Math.random()*30 ) + 1;
    foodY=Math.floor(Math.random()*30 ) + 1;


}

const handleGameOver=()=>{
    clearInterval(setIntervalId);
    alert("game over! press ok to replay..");
    location.reload();
}

const changeDirection=(e)=>{
    if(e.key==="ArrowUp" && velocityY!=1){
       velocityX=0;
       velocityY=-1;
    }else if(e.key==="ArrowDown" && velocityY!=-1){
       velocityX=0;
       velocityY=1;
   }else if(e.key==="ArrowLeft" && velocityX!=1){
       velocityX=-1;
       velocityY=0;
   }else {
       velocityX=1;
       velocityY=0;
   }
   initgame();
   
   }

   controls.forEach(key => {
    key.addEventListener("click",()=>{
       changeDirection({key:key.dataset.key});
    })
    
   });


const initgame=()=>{
    if(gameOver) return handleGameOver();
    let htmlMarkup=`<div class="food" style="grid-area:${foodY}/${foodX}"></div>`
    
    if(snakeX===foodX && snakeY===foodY){
        snakeBody.push([foodX,foodY]);
        changeFoodPosition();
        score++;
        highscore=score>=highscore?score:highscore;
        localStorage.setItem("high-score",highscore);
        scoreElement.innerText=`Score : ${score}`;
        highscoreElement.innerText=`High-Score:${highscore}`;
        }
    for(let i=snakeBody.length-1;i>0;i--){
        //shifting forward the values of the elements in the snake body by one
        
        snakeBody[i]=snakeBody[i-1];
    }
    
    snakeBody[0]=[snakeX,snakeY];

    snakeX+=velocityX;
    snakeY+=velocityY;

    if(snakeX <= 0 || snakeX>30 || snakeY <=0 || snakeY>30){
        
gameOver=true;


    }

    for(let i=0;i<snakeBody.length;i++){
        htmlMarkup+=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]}"></div>`
        //checking if the snakebody is hiting itself then game over
        if(i!==0 && snakeBody[0][1]===snakeBody[i][1]  && snakeBody[0][0]===snakeBody[i][0]){
            gameOver=true;

        }
    }
    

    
    playboard.innerHTML=htmlMarkup;


}



changeFoodPosition();
setIntervalId=setInterval(initgame,125);
document.addEventListener("keydown",changeDirection);

