const victory = 0;
let moves = 0;

function counter(state, count) {
    this.state = state;  //bool False is off, true is on
    this.count = count;  //int
    this.changeState = function(){
    	if(this.state){
    		this.state = false;
    	}
    	else{this.state = true;}
    }
    this.getCount(){return this.count}
    this.increaseCount = function(){
    	this.count++;
    }
}


$(document).ready(function(){

	$('.strict-toggle').click(function(e){
		cycleLight();
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

function cycleCount(){
	if($('.light').attr("id") == "light-off"){
		$('.light').removeAttr("id");
		$('.light').attr("id", "light-on");
	}
	else{
		$('.light').removeAttr("id");
		$('.light').attr("id", "light-off");
	}
}