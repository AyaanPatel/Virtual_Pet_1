//Create variables here
var dog, happyDog, database, foodS, foodStock;
var fedTime, lastFed;
var foodObj;

function preload()
{
  //load images here
  dog_img = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  dog = createSprite(250,300,150,150);
  dog.addImage(dog_img);
  dog.scale = 0.15;
  foodStock=database.ref('Food');
  foodStock.on("value", readStock);

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
}


function draw() {  

  //add styles here
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDog);

  }
textSize(20);
text("Press UP_ARROW to feed the dog milk ", 100, 200);
drawSprites();
}
function feedDog(){
  dog.addImage(happyDog);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
Food:foodObj.getFoodStock(),
FeedTime:hour()
})
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
function readStock(data){
foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })
}


