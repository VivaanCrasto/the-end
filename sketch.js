var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey, monkey_running, monkey_collided;
var ground, invisibleGround, groundImage;
var gameoverImage;
var restartImage;
var obstaclesGroup, obstacleI;

function preload(){
monkey_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkey_collided = loadImage("Monkey_01.png");
  
  groundImage = loadImage("ground.jpg"); 
  gameoverImage = loadImage("gameOver.png")
  resetImage = loadImage("restart.png")
  obstacleI = loadImage("stone.png");
}


function setup() {
  createCanvas(600,300);
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.scale = 0.8
  ground.x = ground.width /2;
  ground.velocityX = -4
  
  
  
  monkey = createSprite(50,180,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.addImage("monkey_collided",monkey_collided);
  monkey.scale = 0.2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
gameover = createSprite(300,100,10,20)
  gameover.addImage("gameover",gameoverImage)
  gameover.scale = 0.5
  gameover.visible = false
  
  restart = createSprite(300,130,10,10)
  restart.addImage("restart",resetImage)
  restart.scale = 0.5
  restart.visible = false
  
  
    
  obstaclegroup = new Group();
  
   
}


function draw(){
 background(255);
  if(gameState === PLAY){
    if(keyDown("space")) {
    monkey.velocityY = -10;
    camera.position.x = displayWidth/2;
  }
               monkey.velocityY = monkey.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
    spawnObstacles();
  
    if(monkey.isTouching(obstaclegroup)){
  gameState = END
    } 
  } 
    else if(gameState === END) {
   gameover.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstaclegroup.setVelocityXEach(0);
    
    
    //change the trex animation
    monkey.changeAnimation("monkey_collided",monkey_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclegroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
    reset();
  }
    }
      monkey.collide(invisibleGround);
  
  drawSprites();
  }

function reset(){
  gameState = PLAY;
  
  gameover.visible = false;
  restart.visible = false;
  
  obstaclegroup.destroyEach();

  
  monkey.changeAnimation("running",monkey_running);
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    
    
       obstacle.addImage("obstacles",obstacleI)
              
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclegroup.add(obstacle);
  }
}
