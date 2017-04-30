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
var timeLeft = 30000;	
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
		
		hero.y -= hero.speed * modifier;

	}
	if ((40 in keysDown) ) { // Player holding down
		
		hero.y += hero.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		
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

	
};




// Draw everything
function draw() {

		
	
		ctx.drawImage(bgImage, 0, 0);
	
	
		ctx.drawImage(heroImage, hero.x, hero.y);
	
		ctx.drawImage(monsterImage, monster.x, monster.y);
	

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught , 32, 32);
	
	
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






