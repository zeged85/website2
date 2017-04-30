var canvas;
var ctx;
var obj;
var bgImage;
var heroImage;
var monsterImage;
var hero;
var monster;
var monstersCaught;
var then;
var bgReady;
var heroReady;
var monsterReady;

var keysDown;
var intervalTimer;
var timeLeft = 2000;	
var howManyCircles =20;
var circles=[];

window.addEventListener("load", setupGame, false);

// called when the app first launches
function setupGame()
{
	
	// Get the canvas
	canvas = document.getElementById("theCanvas");
	ctx = canvas.getContext("2d");

	
	 // start a new game when user clicks Start Game button
	document.getElementById("startButton").addEventListener("click", newGame, false );

  	//sound
	obj = document.getElementById( "targetSound" );
	

	// Background image

	bgImage = new Image();
	bgImage.src = "images/background.png";
	
	
	// Hero image
	
	heroImage = new Image();
	heroImage.src = "images/hero.png";

	// Monster image

	monsterImage = new Image();
	monsterImage.src = "images/monster.png";



	// Game objects
	hero = {speed: 256 }; // movement in pixels per second


	monster = {};
	monstersCaught = 0;

	// Handle keyboard controls
	keysDown = {};

	addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);

	addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);

 for (var i = 0; i < howManyCircles; i++) 
  circles.push([Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 100, Math.random() / 2]);



}



function newGame()
{

	reset();
	then = Date.now();
	


	
	 intervalTimer = setInterval(main, 1); // Execute as fast as possible

}

// Reset the game when the player catches a monster
function reset() {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly
	monster.x = 32 + (Math.random() * (canvas.width - 64));
	monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
function updatePositions(modifier) {

	
	//update position
	if ((38 in keysDown) ) { // Player holding up
		if(hero.y>=20)
		hero.y -= hero.speed * modifier;

	}
	if ((40 in keysDown) ) { // Player holding down
		if(hero.y<=440)
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		if(hero.x>=20)
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		if(hero.x<=492)
		hero.x += hero.speed * modifier;
		
	}


	


	// Are they touching?
	if (
		hero.x <= (monster.x + 32)
		&& monster.x <= (hero.x + 32)
		&& hero.y <= (monster.y + 32)
		&& monster.y <= (hero.y + 32)
	) {
		++monstersCaught;

		obj.play();

		reset();
	}

	--timeLeft;
	 // if the timer reached zero
   if (timeLeft <= 0)
   {
      stopTimer();
      alert("You lost"); // show the losing dialog
   } // end
};




// Draw everything
function draw() {

		
		if(document.getElementById("rdbimg").checked)
{
		ctx.drawImage(bgImage, 0, 0);
	
	}
else
{
	clear();
	DrawCircles();
	MoveCircles(5);
}
		ctx.drawImage(heroImage, hero.x, hero.y);
	
		ctx.drawImage(monsterImage, monster.x, monster.y);
	

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught + " Time left :" +  timeLeft/1000 , 32, 32);
	
	
};


// terminate interval timer
function stopTimer()
{
  
   window.clearInterval( intervalTimer );
} 


// The main game loop
function main() {
	var now = Date.now();
	var delta = now - then;
	
	updatePositions(delta / 1000);
	draw();	
	
	then = now;
};


var clear = function(){  
  ctx.fillStyle = '#d0e7f9';  
//set active color to #d0e... (nice blue)  
//UPDATE - as 'Ped7g' noticed - using clearRect() in here is useless, we cover whole surface of the canvas with //blue rectangle two lines below. I just forget to remove that line  
//ctx.clearRect(0, 0, canvas.width, canvas.height);  
//clear whole surface  
  ctx.beginPath();  
//start drawing  
  ctx.rect(0, 0, canvas.width, canvas.height);  
//draw rectangle from point (0, 0) to  
//(width, height) covering whole canvas  
  ctx.closePath();  
//end drawing  
  ctx.fill();  
//fill rectangle with active  
//color selected before  
};  


var DrawCircles = function(){

  for (var i = 0; i < howManyCircles; i++) {
    ctx.fillStyle = 'rgba(255, 255, 255, ' + circles[i][3] + ')';
//white color with transparency in rgba
    ctx.beginPath();
    ctx.arc(circles[i][0], circles[i][1], circles[i][2], 0, Math.PI * 2, true);
//arc(x, y, radius, startAngle, endAngle, anticlockwise)
//circle has always PI*2 end angle
    ctx.closePath();
    ctx.fill();
  }
};


var MoveCircles = function(deltaY){  
  for (var i = 0; i < howManyCircles; i++) {  
    if (circles[i][1] - circles[i][2] > canvas.height) {  
//the circle is under the screen so we change  
//informations about it   
      circles[i][0] = Math.random() * canvas.width;  
      circles[i][2] = Math.random() * 100;  
      circles[i][1] = 0 - circles[i][2];  
      circles[i][3] = Math.random() / 2;  
    } else {  
//move circle deltaY pixels down  
      circles[i][1] += deltaY;  
    }  
  }  
};  