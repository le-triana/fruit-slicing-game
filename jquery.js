var playing = false;
var score;
var fruits = ['apple','orange','banana','watermelon','mango','grape','cherry','kiwi','strawberry']; 
var step;
var action;


$(function() {
$("#startreset").click(function() {
    
    //we are playing
    if(playing == true) {
        
        //reload page
        location.reload();
    } else {
        //not playing
        playing = true; //game start
        
        //set score to 0
        score = 0;
        $("#scorevalue").html(score);
        console.log("crying");
        // //make trial box appear
        $("#trialsLeft").show();
        trialsLeft = 3;
        addHearts();

        // //change button to reset game
        $("#startreset").html("Reset Game");

        // //start sending fruit
        startAction();

    }
});
$("#fruit1").mouseover(function() {
    score++;
    $("#scorevalue").html(score); //updating score
    $("#sound")[0].play(); //play sound

    //stop fruit 
    clearInterval(action);

    //hide fruit
    $("#fruit1").hide("explode", 500); //slicing fruit

    //sending new fruit
    setTimeout(startAction, 500);
});


function addHearts() {
    $("#trialsLeft").empty();
    for(i = 0; i < trialsLeft; i++) {
        $("#trialsLeft").append('<img src= "images/heart.png" class= "heart">');
    }
}

//start sending fruit function
function startAction() {
    //generating a fruit
    $("#fruit1").show();
    chooseFruit(); //choose random fruit
    $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
    //random position
    
        //generate a random step
        step = 1 + Math.round(5*Math.random()); //change step

        //move fruit down by one step every 10ms
        action = setInterval(function() {
            $("#fruit1").css('top' , $("#fruit1").position().top + step);
            
                //check if the fruit is too low
                if($("#fruit1").position().top > $("#fruitcontainer").height()){
                    //check if we have any trials left
                    if(trialsLeft > 1) {
                        $("#fruit1").show();
                        chooseFruit(); //choose random fruit
                        $("#fruit1").css({'left' : Math.round(550*Math.random()), 'top' : -50});
                        //random position
                        
                        //generate a random step
                        step = 1 + Math.round(5*Math.random()); //change step
                    
                        //reduce number of trials by 1
                        trialsLeft --;

                        //populate trialsLeft box
                        addHearts();

                        //hide game over box
                        $("#gameOver").hide();

                    }else {//game over
                        playing = false; //not playing anymore
                        $("#startreset").html("Start Game");//change button to Start Game
                            $("#gameOver").show();
                            $("#gameOver").html('<p>Game Over!</p><p>Your score is '+ score +'</p>');
                            $("#trialsLeft").hide();
                            stopAction();
                    }
                }
        }, 10);
}

function chooseFruit() {
    $("#fruit1").attr('src' , 'images/' + fruits[Math.round(8*Math.random())] + '.png');

}

//stop dropping fruit
function stopAction() {
    clearInterval(action);
    $("#fruit1").hide();
}
});
