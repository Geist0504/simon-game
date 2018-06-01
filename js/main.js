const victory = 3;
let move = 0;
let started = false;
let finished = false;
let strictMode = false;
let circleButtons = ["green", "red", "blue", "yellow"]  //button order clockwise from top-left
let soundSamples = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
					"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
					"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
					"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"]
let circleBtnDict = {};
let vict =[];
let gameState = [];
let userMove = 0;
let currentMove = 0;
let countr = new cntr(false, 0);

function gameObj(state){
	this.state = state;
	this.changeState = function(){
    	if(this.state){this.state = false;}
    	else{this.state = true;}
    }
}

function circleBtn(number, color, soundURL){
	this.number = number;
	this.color = color;
	this.soundURL = soundURL;

	this.playSound = function(){
		var audio = new Audio(this.soundURL);
		audio.play();
	}
	this.push = function(){
		this.playSound();
		e = document.getElementById(this.number)
		e.classList.add("quarter-on-active")
		setTimeout(function() { e.classList.remove("quarter-on-active"); }, 500);
		
	}
}

function cntr(state, count) {
    this.state = state;  //bool False is off, true is on
    this.count = count;  //int
    this.getState = function() {return this.state}
    this.changeState = function(){
    	if(this.state){
    		this.state = false;
    	}
    	else{this.state = true;}
    }
    this.getCount = function() {return this.count}
    this.increaseCount = function(){
    	this.count++;
    }
}

$(document).ready(function(){

	
	let game = new gameObj(false);

	$('.strict-toggle').click(function(e){
		if(!game.state){}
		else if(started){}
		else{
			strictMode = true;
			cycleLight()
		};
	})

	$('.slider').click(function(e){
		if(!game.state){
			initializeGame(countr, game);
			game.changeState();	
		}
		else{
			turnOff();
			game.changeState();		
		}
	})

	$(".quarter").click(function(e){
		if(!game.state){}
		else{
			circleBtnDict[this.id].playSound();
			if(started){
				if(goodMove(this.id)){
					userMove++;
					if(userMove >= gameState.length){
						addNextMove();
						displayCount();
						if(!finished){
							setTimeout(function(){playGameState()}, 300);			
						}
						else{
							playVictoryState();
							setTimeout(function(){resetGame()}, 3000);
						}
					}
				}
				else{
					if(strictMode){
						//announce loss
						resetGame();
					}
					else{
						//Failure sound
						setTimeout(function(){playGameState()}, 300)
						userMove = 0;
					}
				}

			}
		};
	})

	$(".start-toggle").click(function(e){
		if(!game.state){}
		else if(started){
			resetGame()
		}
		else{
			started = true;
			callNTimes(cycleCount, 6, 150, countr)
			addNextMove();
			setTimeout(function() {displayCount()}, 750)
			setTimeout(function() {playGameState()}, 700);
		};
	})
});


function initializeGame(countr, game){
	$('.quarter').addClass("quarter-on");
	cycleCount(countr);
	displayCount(countr);
	for (var i = 0; i < 4; i++) {
		circleBtnDict[i] = new circleBtn(i, circleButtons[i], soundSamples[i])
	}
	vict = initializeVictoryCondition();
	addNextMove();
}

function playGameState(){
	for (var i = 0; i < gameState.length; i++) {
		(function(i){
			setTimeout(function() {circleBtnDict[gameState[i]].push(); }, i * 1000);
		})(i);
	}
}

function goodMove(id){
	if(id == gameState[userMove]){
		return true;
	}
	else{
		return false}
}

function addNextMove(){
	if(userMove >= vict.length){
		//play win sound
		finished = true;
	}
	else{
		countr.count = userMove + 1;
		gameState[userMove] = vict[userMove];
	}
}

function resetGame(){
	vict = initializeVictoryCondition();
	gameState = [];
	userMove = 0;
	finished = false;
	addNextMove();
	displayCount();
	setTimeout(function() {playGameState()}, 1200);
}



//geneartes the series of moves a user would need to make to win
function initializeVictoryCondition(){
	return Array.from({length: victory}, () => Math.floor(Math.random() * 4));
}


///DISPLAY CYCLES
function cycleLight(){
	if($('.light').attr("id") == "light-off"){
		$('.light').removeAttr("id");
		$('.light').attr("id", "light-on");
	}
	else{
		$('.light').removeAttr("id");
		$('.light').attr("id", "light-off");
	}
}

function cycleCount(){
	if(countr.state){
		countr.changeState();
		$('.cnt-display').addClass("led-off")
		$('.cnt-display').removeClass("led-on")
	}
	else{
		countr.changeState();
		$('.cnt-display').addClass("led-on")
		$('.cnt-display').removeClass("led-off")
	}
}

function turnOff(){
	$('.quarter').removeClass("quarter-on");
	cycleCount();
}

function displayCount(){
	let val = countr.count;
	if (val == 0){val = '--'}
	val = pad(val, 2);
	$('.cnt-display').text(val);
}

function pad(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function callNTimes(func, num, delay, v){
    if (!num) return;
    func(v);
    setTimeout(function() { callNTimes(func, num - 1, delay, v); }, delay);
}

function playVictoryState(){
	for (var i = 0; i < 3; i++) {
		setTimeout(function() {pushAll(); }, i * 1000);
	}
}

function pushAll(){
	circleBtnDict[0].push()
	circleBtnDict[1].push()
	circleBtnDict[2].push()
	circleBtnDict[3].push()
}



