$(document).ready(function() {

    $("#button").click(function() {
        players.validate()
    })

});

var players = {
    validate: function() {
        var input1 = $("#input1").val();
        var input2 = $("#input2").val();
        if (input1 != undefined && input2 != undefined) {
            this.player1.name = input1;
            this.player2.name = input2;
            setgame();
        }
    },
    player1: {},
    player2: {},
    winnerTime: 0
}


    function setgame() {
        countDown();
    }


    function countDown() {
        var i = 0;
        var count = setInterval(function() {
            if (i == 0) {
                $("#container").html("<h1>3</h1>");
                i++;
            } else if (i == 1) {
                $("#container").html("<h1>2</h1>");
                i++;
            } else if (i == 2) {
                $("#container").html("<h1>1</h1>");
                i++;
            } else if (i == 3) {
                $("#container").html("<h1>GO!</h1>");
                i++;
            } else if (i == 4) {
                clearInterval(count)
                $("#container").html("<img class='car'src='car1.jpg' id='car1'></img><img class='car'src='car2.jpg' id='car2'></img>");
                timer('start');
                startGame();
            }
        }, 1000)

    }

var time = 0;
var timer = function(action) {
    var d = Date.now();
    if (time < 1 || action === 'start') {
        time = d;
        return 0;
    } else if (action === 'stop') {
        var t = d - time;
        time = 0;
        return t;
    } else {
        return d - time;
    }
};



var over = false;

function animateCar(car) {
    console.log(car)
    $(car).animate({
        marginLeft: "+=10"
    }, 10, function() {
        var position = $(car).css('margin-left');
        position = parseInt(position.substring(0, position.length - 2));
        if (position >= 860) {
            if (over == false) {
                players.winnerTime = timer('stop');
                if (car == '#car1') {
                    players.winner = 'player1';
                } else if (car == '#car2') {
                    players.winner = 'player2';
                }

                decisions(car);
                over = true;
                postResults()
            }
        }
    })
};

function startGame() {
    $(document).on('keyup', function(event) {
        var key = event.which
        if (key == 81) {
            animateCar("#car1")
        } else if (key == 80) {
            animateCar("#car2")
        };

    })
}


function postResults() {
    $.ajax({
        type: "POST",
        url: "/results",
        data: players,
        success: function(res) {

        }
    })
}

function decisions(car) {
    $("#container").html("<h1>car #" + car.substring(car.length - 1, car.length) +
        " won!</h1></br><h1>Winning time is " + (players.winnerTime / 1000).toString() + " secs</h1><button id='new'>New Game</button><button id='again'>Play Again</button>")
    $("#new").click(function() {
        window.location.reload(true);
    })
    $('#again').click(function() {
        countDown();
        $('#car1').html('margin-left', '0px');
        $('#car2').html('margin-left', '0px');
        $(document).unbind("keyup");
        over = false;

    })
}
