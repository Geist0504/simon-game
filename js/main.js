const victory = 20;
let moves = 0;
let gameState = false;
let started = false;
let finished = false;
let circleButtons = ["green", "red", "blue", "yellow"]  //button order clockwise from top-left
let soundSamples = ["https://s3.amazonaws.com/freecodecamp/simonSound1.mp3",
					"https://s3.amazonaws.com/freecodecamp/simonSound2.mp3",
					"https://s3.amazonaws.com/freecodecamp/simonSound3.mp3",
					"https://s3.amazonaws.com/freecodecamp/simonSound4.mp3"]

function gameObj(state){
	this.state = state;
	this.changeState = function(){
    	if(this.state){this.state = false;}
    	else{this.state = true;}
    }
}

function circleBtn(color, soundURL){
	this.color = color;
	this.soundURL = soundURL;

	this.playSound = function(){
		var audio = new Audio(this.soundURL);
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

	let countr = new cntr(false, 0);
	let game = new gameObj(false);

	$('.strict-toggle').click(function(e){
		if(!game.state){}
		else{cycleLight()};
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
});


function initializeGame(countr, game){
	$('.quarter').addClass("quarter-on");
	cycleCount(countr);
	displayCount(countr);
	let circleBtnDict = {};
	for (var i = 0; i < 4; i++) {
		circleBtnDict[i] = new circleBtn(circleButtons[i], soundSamples[i])
	}
	console.log(circleBtnDict);

	vict = initializeVictoryCondition();
}

function turnOff(){
	$('.quarter').removeClass("quarter-on");
}


//geneartes the series of moves a user would need to make to win
function initializeVictoryCondition(){
	return Array.from({length: victory}, () => Math.floor(Math.random() * 4));
}


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

function cycleCount(cntr){
	if(cntr.state){
		cntr.changeState();
		$('.cnt-display').addClass("led-off")
		$('.cnt-display').removeClass("led-on")
	}
	else{
		cntr.changeState();
		$('.cnt-display').addClass("led-on")
		$('.cnt-display').removeClass("led-off")
	}
}

function displayCount(count){
	let val = count.getCount();
	if (val == 0){val = '--'}
	val = pad(val, 2);
	$('.cnt-display').text(val);
}

function pad(num, size) {
    let s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}



