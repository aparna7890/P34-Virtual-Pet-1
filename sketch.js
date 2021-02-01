//Create variables here
var dog, happyDog
var food, foodStock

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png")
  happyDogImg = loadImage("images/dogImg1.png")

}

function setup() {
	createCanvas(800, 700);
  database = firebase.database();
  
  dog = createSprite(250, 250)
  dog.addImage(dogImg)
  dog.scale = 0.3

  foodStock = database.ref('Food')
  foodStock.on("value", readStock, writeStock)
  
}


function draw() {  
  
  background(46, 139, 87)

  if(keyWentDown(UP_ARROW))
  {
    writeStock(food)
    dog.addImage(happyDogImg)
  }

  drawSprites();
  //add styles here
  
  textSize(20)
  fill("white")
  stroke("black")

  text("Milk bottles remaining: " + food, 60, 80)
  text("Press UP ARROW to feed milk to the dog", 60, 30)

}

//function to read values from database
function readStock(data){
  food = data.val()
}

//function to write values in database
function writeStock(x){
  if(x <= 0){
    x = 0
  }
  else{
    x = x - 1
  }

  database.ref('/').update({
    Food:x
  })
}