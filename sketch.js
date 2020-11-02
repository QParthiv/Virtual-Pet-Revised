var dog, happyDog;
var database;
var foodS, foodStock;
var dog, happyDog;
var dogImg, happyDogImg;
var food;

function preload() {
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  dog = createSprite(250, 250, 30, 30);
  dog.addImage(dogImg);
  dog.scale = 0.15;
  foodStock = database.ref('Food');
  foodStock.on("value", readStock);
}

function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodS);
    dog.addImage(happyDogImg);

  }
  drawSprites();
  fill("black");
  text("Food left : " + foodS, 170, 200);
  text("Press the up arrow to feed the dog milk!", 250, 250);
}

function readStock(data) {
  foodS = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  }
  else {
    x = x - 1;
  }
  database.ref('/').update({
    Food: x
  })
}