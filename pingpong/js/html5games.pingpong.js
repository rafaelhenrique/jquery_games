// Neste código é permitido o pressionamento de duas teclas 
// simultaneamente

var pingpong = {}
pingpong.pressedKeys = [];

pingpong.ball = {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
}


var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83,
    D: 68
}

$(function(){
    // set interval to call gameloop every 30 milliseconds
    pingpong.timer = setInterval(gameloop,30);
    
    // mark down what key is down and up into an array called "pressedKeys"
    $(document).keydown(function(e){
        pingpong.pressedKeys[e.which] = true;
    });

    $(document).keyup(function(e){
        pingpong.pressedKeys[e.which] = false;
    });
    
});


function gameloop() {
    moveBall();
    movePaddles();
}

function moveBall() {
    // reference useful variables
    var mesaAltura = parseInt($("#mesa").height());
    var bolaAltura = parseInt($("#bolinha").height());
    var mesaLargura = parseInt($("#mesa").width());
    var bolaLargura = parseInt($("#bolinha").width());
    var ball = pingpong.ball;
    
    // check playground boundary
    // check bottom edge
    if (ball.y > (mesaAltura - bolaAltura)){
        ball.directionY = -1;
    }
 
    // check top edge
    if (ball.y  < 0){
        ball.directionY = 1;
    }

    // check right edge
    if (ball.x > (mesaLargura - bolaLargura) ){
        ball.directionX = -1;
    }
    
    // check left edge
    if (ball.x < 0){
        ball.directionX = 1;
    }
    
    if (ball.x >= getPaddleX("#raqueteA") && ball.x <= getPaddleX("#raqueteA")+30 &&
        ball.y >= getPaddleY("#raqueteA") && ball.y <= getPaddleY("#raqueteA")+70 ){
        ball.directionX = 1;
//         console.log("Raquete A\n"+"Ball x: "+ ball.x +
//                     " Ball y:"+ball.y+"\n"+
//                     "Paddle x:" + getPaddleX("#raqueteA")+
//                     " Paddle y:" + getPaddleY("#raqueteA")+"\n\n" );
    }        

    if (ball.x >= getPaddleX("#raqueteB")-30 && ball.x <= getPaddleX("#raqueteB")+30 &&
        ball.y >= getPaddleY("#raqueteB")-70 && ball.y <= getPaddleY("#raqueteB")+70 ){
        ball.directionX = -1;
//         console.log("Raquete B\n"+"Ball x: "+ ball.x +
//                     " Ball y:"+ball.y+"\n"+
//                     "Paddle x:" + getPaddleX("#raqueteB")+
//                     " Paddle y:" + getPaddleY("#raqueteB")+"\n\n" );
    }        
    
    
    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;
    
    //console.log(getPaddle("#raqueteA"))
    // check moving paddle here, later.
    // actually move the ball with speed and direction
    $("#bolinha").css({
        "left" : ball.x,
        "top" : ball.y
    });
}

function getPaddleY(raquete){   
    return parseInt($(raquete).css("top"));
}

function getPaddleX(raquete){   
    return parseInt($(raquete).css("left"));
}


function movePaddles() {
    // use our custom timer to continuously check if a key is pressed.
    var mesaAltura = parseInt($("#mesa").height());
    var raqueteAlturaA = parseInt($("#raqueteA").height());    
    var raqueteAlturaB = parseInt($("#raqueteB").height());    
    
    if (pingpong.pressedKeys[KEY.UP]) { // arrow-up
        // move the paddle B up 5 pixels
        var topu = parseInt($("#raqueteB").css("top"));
        if (topu > 0)
            $("#raqueteB").css("top",topu-5);
    }
    
    if (pingpong.pressedKeys[KEY.DOWN]) { // arrow-down
        // move the paddle B down 5 pixels
        var topd = parseInt($("#raqueteB").css("top"));
        if (topd < mesaAltura - raqueteAlturaB )
            $("#raqueteB").css("top",topd+5);
    }

    if (pingpong.pressedKeys[KEY.W]) { // w
        // move the paddle A up 5 pixels
        var topw = parseInt($("#raqueteA").css("top"));
        if (topw > 0)
            $("#raqueteA").css("top",topw-5);
    }

    if (pingpong.pressedKeys[KEY.S]) { // s
        // move the paddle A down 5 pixels
        var tops = parseInt($("#raqueteA").css("top"));
        if (tops < mesaAltura - raqueteAlturaA )
            $("#raqueteA").css("top",tops+5);
    }
}
    