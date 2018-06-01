const victory = 20;
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
		let e = document.getElementById(this.number)
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
				console.log(userMove, gameState, vict)
				if(goodMove(this.id)){
					userMove++;
					if(userMove >= gameState.length){
						addNextMove();
						displayCount();
						userMove = 0;
						if(!finished){
							setTimeout(function(){playGameState()}, 600);			
						}
						else{
							playVictoryState();
							setTimeout(function(){resetGame()}, 3000);
						}
					}
				}
				else{
					if(strictMode){
						var audio = new Audio("https://s3.amazonaws.com/fccgeist/lose.flac");
						audio.volume = 0.5;
						setTimeout(function(){audio.play()}, 200);
						setTimeout(function(){resetGame()}, 1000);
					}
					else{
						var audio = new Audio("https://s3.amazonaws.com/fccgeist/error.wav");
						audio.volume = 0.1;
						audio.play();
						setTimeout(function(){playGameState()}, 1700)
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
	cycleCount();
	displayCount();
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
		countr.count = gameState.length;
		gameState[userMove] = vict[userMove];
	}
}

function resetGame(){
	resetVariables();
	vict = initializeVictoryCondition();
	addNextMove();
	displayCount();
	//setTimeout(function() {playGameState()}, 1200);
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
	resetVariables();
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
	callNTimes(cycleCount, 6, 150, countr)
	for (var i = 0; i < 3; i++) {
		(function (x) {
        	setTimeout(function () { 
        		pushAll();
        		console.log(x); }, i* 1000);
    	})(i);
	}
}

function pushAll(){
	circleBtnDict[0].push()
	circleBtnDict[1].push()
	circleBtnDict[2].push()
	circleBtnDict[3].push()
}

function resetVariables(){
	vict = [];
	gameState = [];
	userMove = 0;
	started = false;
	finished = false;
	countr.count = gameState.length;
}

