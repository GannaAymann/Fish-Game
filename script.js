const canvas = document.getElementById("canvas1");

const ctx = canvas.getContext("2d");
let score = 0;
let gameFrame =0;
canvas.width=800;
canvas.height = 500;   // same as in css file
ctx.font="50px Georgia";
let gameSpeed = 1;
let gameOver = false;

let canvasPosition = canvas.getBoundingClientRect(); // 34an lw get 3nd top left point  mn cancavs msh hygeb anha 0,0 as it measure distance
// from edges of the browser windw not edges of canvas element

console.log(canvasPosition)
const mouse = 
{
    x:canvas.width/2,
    y:canvas.height/2,
    click:false

}

canvas.addEventListener("mousedown", function(event)
 {
    mouse.click = true;
    mouse.x=event.x -canvasPosition.left;
    mouse.y=event.y-canvasPosition.top;
    // console.log(mouse.x)  // lma ados b el mouse bydbly el x axis bta3 el no2ta aly dost 3alyha

 }
);

canvas.addEventListener("mouseup", function(event)
{
    mouse.click = false;
});

const PlayerLeft = new Image();
PlayerLeft.src="fish_swim_left.png";
const PlayerRight = new Image();
PlayerRight.src="fish_swim_right.png";

class Player {
    constructor()
    {
        this.x=canvas.width;
        this.y=canvas.height/2;    // 34an 3yzo yb2a m3 el mouse
        this.radius =50;           // 34an el sora bta3t el fish tkon mdwara
        this.angle = 0;            // inistalize b 0 and we will use to rotate the player toward the current mouse postion 
        this.frameX =0;
        this.frameY =0;    // x,y as we always need to make player faced the direction it is swimmming towards
        this.frame = 0;    // numb of frames
        this.spriteWidth = 498;
        this.spriteHeight=327;           // width , height of the frame
    }

    update()
    // update the player position to move the player toward the mouse position
    // that by compere the player's position and current mouse position
    {
        const dx = this.x - mouse.x
        const dy = this.y - mouse.y
        const theta = Math.atan2(dy , dx);
        this.angle=theta;
        if (mouse.x != this.x)
        {
            // this.x --;
            //or
            this.x -= dx/30;  // 30 3shan el player keda hyt7rak bsora fa 3mal keda 3shan ybat2 7rakto shwaya
        }
        if (mouse.y != this.y)
        {
            // this.y --;
            //or
            this.y -= dy/30;
        }
    }

    draw()
    {   
        // if(mouse.click)
        // {
        //     ctx.lineWidth=0.2;
        //     ctx.beginPath();
        //     ctx.moveTo(this.x , this.y);
        //     ctx.lineTo(mouse.x , mouse.y);
        //     ctx.stroke();

        // }
        // ctx.fillStyle=" blue";
        // ctx.beginPath();
        // ctx.arc(this.x , this.y , this.radius , 0 , Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.fillRect(this.x , this.y , this.radius , 10);
        ctx.save();
        ctx.translate(this.x , this.y);
        ctx.rotate(this.angle);
        if (this.x >= mouse.x)
        {
            ctx.drawImage(PlayerLeft , this.frameX * this.spriteWidth , this.frameY * this.spriteHeight , this.spriteWidth,this.spriteHeight,
            0-60 , 0-45 , this.spriteWidth/4 , this.spriteHeight/4); // /4 34an ys8ar el sora 
        }
        else
        {
            ctx.drawImage(PlayerRight , this.frameX * this.spriteWidth , this.frameY * this.spriteHeight , this.spriteWidth,this.spriteHeight,
             0-60 , 0-45 , this.spriteWidth/4 , this.spriteHeight/4); // /4 34an ys8ar el sora 
        }
        ctx.restore();
        
    }
}
const player = new Player();
// bubbles
const bubbleArray=[];
let bubbleImage= new Image();
bubbleImage.src="bubble_pop_under_water_01.png";
let bubbleImage2= new Image();
bubbleImage2.src="bubble_pop_under_water_05.png";
class Bubble {
    constructor()
    {
        this.x = Math.random()*canvas.width;
        this.y = canvas.height+Math.random()*canvas.height; // mn 8er el canvas height aly f el awal l bubbles msh httla3 mn ta7t httla3 mn ay 7ata gowa el canvas
        this.radius=50;
        this.speed = Math.random()*5+1
        this.distance // hst5dmha an awal ma el player ykon 3la msafa mo3yna mn el bubble el bubble tfr2a3 w yzwad el score
        this.counted = false; // 3shan el bubble aly y3ady 3aleha tzwad el score b 1 bas
        this.sound //=Math.random() <= 0.5? "sound1" : "sound2"
        this.src=bubbleImage;
        
    }
    update()
    {
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx*dx + dy*dy); // pysagorath therom
    }
    draw()
    {
        // ctx.fillStyle="blue";
        // ctx.beginPath();
        // ctx.arc(this.x , this.y , this.radius , 0 , Math.PI * 2);
        // ctx.fill();
        // ctx.closePath();
        // ctx.stroke();
        ctx.drawImage(this.src ,this.x -58, this.y-79 , this.radius*2.2, this.radius *2.7)

    }
}
const bubblePop1 = document.createElement("audio");
bubblePop1.src = "Plop.ogg";
const bubblePop2 = document.createElement("audio");
bubblePop2.src = "bubbles-single2.wav";
function handleBubbles() // el code da hy-run kol 50 frame
{
    if(gameFrame %50 == 0)
    {
        bubbleArray.push(new Bubble()); 
    }
    for(let i = 0 ; i<bubbleArray.length ;i++)
    {
        bubbleArray[i].update();
        
        bubbleArray[i].draw();
        
        if(bubbleArray[i].y < 0 - bubbleArray[i].radius *2 ) // if vertical y postion is less than 0 , bubbleArray[i].radius *2 34an el bubble kant bt5tafy abl ma t3ady kolha mn el top-edge                                                      
        {
           bubbleArray.splice(i , 1); // el condition da 34an myfdlsh yzwad bubbles w yfdal ypush f el array byshof hya el bubble 3adet el top edge of the canvas lw 3adet byshlha mn el array
           i--;
        }
        if(bubbleArray[i])
        { 

            if(bubbleArray[i].distance < bubbleArray[i].radius + player.radius)
        {
            console.log("collision");
            bubbleArray[i].src = bubbleImage2;
            bubbleArray[i].draw();
            console.log(bubbleArray.length)
            
            if (!bubbleArray[i].counted) // if it is false 
            {   
                if(bubbleArray[i].sound =="sound1")
                {
                    bubblePop1.play();
                    
                    
                }
                else
                {
                    bubblePop2.play();
                    
                    
                  
                    
                    
                }
                score++;               
                bubbleArray[i].counted=true         // keda el bubble aly 3ada 3aleha htzwad el score b 1                
                bubbleArray.splice(i,1);
                i--;
            }
        }

        }
       
    }


}
//BackGround
const background =new Image();
background.src="background1.png";
const BG ={
    x1:0,
    x2:canvas.width,
    y:0,
    width:canvas.width,
    height:canvas.height
}
function handleBackGround(){
    BG.x1-=gameSpeed;
    if(BG.x1 < -BG.width)
    {
        BG.x1=BG.width;
        
    }
    BG.x2-=gameSpeed;
    if(BG.x2 < -BG.width)
    {
        BG.x2=BG.width;
    }
    ctx.drawImage(background , BG.x1 ,BG.y , BG.width , BG.height);
    ctx.drawImage(background , BG.x2 ,BG.y , BG.width , BG.height);
}

// Enemies 
const enemyImage = new Image();
enemyImage.src="enemy1.png";
class Enemy {
    constructor()
    {
        this.x = canvas.width+200;
        this.y = Math.random() * (canvas.height -150)+90; // 
        this.radius=60;
        this.speed=Math.random()*2+2 // random numb from 0 to 4
        this.frameX =0;
        this.frameY =0;    
        this.frame = 0;   
        this.spriteWidth = 418;
        this.spriteHeight=397; 
    }

    update()
    {
        this.x -=this.speed;
        if(this.x < 0-this.radius*2)
        {
            this.x = canvas.width +200;
            this.y = Math.random()*(canvas.height -150)+90;
            this.speed=Math.random()*2+2;

        }
        if(gameFrame %5 ==0 )
        {
            this.frame++;
            if(this.frame>=12)
            {
                this.frame=0;
            }
            if(this.frame==3|| this.frame==7 ||this.frame==11)
            {
                this.frameX=0;
            }
            else{
                this.frameX++;
            }
            if(this.frame<3)
            {
                this.frameY=0;
            }
            else if(this.frame<7)
            {
                this.frameY=1;
            }
            else if(this.frame<11)
            {
                this.frameY=2;
            }
            else{
                this.frameY=0;
            }
          // collsion with the player
          const dx = this.x - player.x;
          const dy = this.y - player.y;
          const distance = Math.sqrt(dx*dx + dy*dy);
          if(distance<this.radius+player.radius)
          {
              handleGameOver();
          }

        }
    }
    draw()
    {
        ctx.drawImage(enemyImage , this.frameX * this.spriteWidth , this.frameY * this.spriteHeight , this.spriteWidth,this.spriteHeight,
             this.x -60, this.y-70 , this.spriteWidth/3 , this.spriteHeight/3)
    }
    
}

const enemy1 = new Enemy();
function handleEnemy()
{   
    enemy1.draw();
    enemy1.update();
    
}
function  handleGameOver()
{
    ctx.fillStyle="white"
    ctx.fillText("Game Over , Your Final Score is : " +score , 110 , 250 );
    gameOver=true;
}
// Animation loop
function animate()

{   ctx.clearRect(0 , 0 , canvas.width ,canvas.height);
    handleBackGround();
    handleBubbles();
    handleEnemy();
    player.update();
    player.draw();
    ctx.font = "30px Times Roman";
    ctx.fillStyle="black"
    ctx.fillText("Score : " +score , 10 , 50)
    gameFrame++;
    if(!gameOver)
    {
        requestAnimationFrame(animate);
        
    }
    
}
animate();
window.addEventListener("resize" , function(){
    canvasPosition = canvas.getBoundingClientRect(); // 34an y7seb el mouse position sa7 lma a2alel 7agm l browser
})
