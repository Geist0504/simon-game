const victory = 0;
let moves = 0;

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

	$('.strict-toggle').click(function(e){
		cycleLight();
	})

	$('.slider').click(function(e){
		cycleCount(countr);
	})

});


//geneartes the series of moves a user would need to make to win
function initializeVictoryCondition(){

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