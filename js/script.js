$(function() {

var sizeInput = 4; // must be 4 or 6
var boardSize = Math.pow(sizeInput, 2)
var board = $('#game-board');
var boardWidth = sizeInput * 125 + 'px';
var card = $('.card')
var turn = 1;
var player1 = $('#player1-name');
var player2 = $('#player2-name');
var player1score = parseInt($('#player1-score').text()); // starts at 0
var player2score = parseInt($('#player2-score').text()); // starts at 0
var player;

var playerScore = 0;

// array to use to store class name of pairs that have already been matched
var pairsMatched = [];
var winner = false;

// has potential to chack for used colors - will be useful in more advanced version of game
var newRandomColor = function() {
    var colorsUsed = {};
    var newColor = tinycolor.random();
    newColor = newColor.toHexString();
    colorsUsed[newColor] = true;
    // console.log(newColor);
    // console.log(colorsUsed);
    return newColor;
}

// gets array of colors and their complements - colors added to even indeces, 
// complements added to odd indeces immediately following their respective colors
var getColorComplements = function() {
    var colorComplements = [];
    var newColor;
    for (var i= 0; i < boardSize / 2; i++) {
        newColor = newRandomColor();
        colorComplements.push(newColor);
        colorComplements.push(tinycolor(newColor).complement().toHexString());
    }
        return colorComplements;
}

// creates array of number of squares
var numberOfSquaresArr = [];

for (i=1; i<=boardSize; i++) {
    numberOfSquaresArr.push(i);
}

// shuffles array to be used in adding ids to squares;
var shuffle = function(numberOfSquaresArr){
    for(var j, x, i = numberOfSquaresArr.length; i; j = Math.floor(Math.random() * i), x = numberOfSquaresArr[--i], numberOfSquaresArr[i] = numberOfSquaresArr[j], numberOfSquaresArr[j] = x);
    return numberOfSquaresArr;
}

var shuffledNumberOfSquaresArray = shuffle(numberOfSquaresArr);

// Initializes and resets board
var initializeBoard = function() {
    $('#player1-score').text('0');
    $('#player2-score').text('0');
    for (i=0; i < boardSize; i++)
        $('.card').removeClass('selected');
        $('.card').removeClass('chosen');
    board.css({'width': boardWidth, 'height': boardWidth})
    player = 'player1';
    turn = 0;
    turn = 1;
    clickNum = 0;
    selectedPairNumArr = [];
    pairsMatched = [];
    board.empty();
    colorComplementsArray = getColorComplements();
    // $(player1).css('color', 'red'); // FIX!
    var counter = 0;
    var counter2 = 1;
    // adds board row divs
    for (var i = 0; i < sizeInput; i++) {
        board.append('<div class="board-row" id="row' + i + '"></div>')
        counter += sizeInput - sizeInput;
        // adds board cells (initially squares, hence the misnomer), randomizing with IDs via the shuffled numbers array
        for (var j = 0; j < sizeInput; j++) {
            var uniqueID = shuffledNumberOfSquaresArray[counter];
            $('#row' + i).append('<div class="card" id="id' + uniqueID + '"></div>');
            counter++;
        }
    }
    // adds colors from color array to randomized cells; 
    // each color's complement is assigned to the cell with an ID one higher than its color match
    for(k = 0; k < boardSize; k++) {
        $('#id' + (k + 1)).css('background', colorComplementsArray[k]);
        // console.log(colorComplementsArray[k], '#id' + (k + 1));
    }
    // CONSIDER MOVING ABOVE!!
    for (l = 1; l <= boardSize; l++) {
        if ((l +1) % 2 === 0) {
            // console.log(counter);
            // console.log(counter);
            $('#id' + l).addClass('pair' + counter2);
            // $('#id' + l).append('pair' + counter2);
            // console.log($('#id' + l),'pair' + counter2);
        }
        else {
            $('#id' + l).addClass('pair' + counter2);
            // $('#id' + l).append('pair' + counter2);
            // console.log($('#id' + l),'pair' + counter2);
         // $('#id' + l).append('pair' + counter2);
        counter2++;
        }
    }
    turnStart();
}

// Causes clicking the start button in the modal to initialize the board
$('#start').focus();
$('#start').on('click', function(e) {
    initializeBoard();
    $('#player1-name').text($('#player1').val());
    $('#player2-name').text($('#player2').val());
    $('#myModal').modal('hide');
    // e.preventDefault();
});
$('#new-game').on('click', function() {
    $('input#player1').focus()
});

// The following functions deal with game play

var clickNum = 0;
// array to put the two choices to compare
var selectedPairNumArr = [];
var pairCounter = 0;

// var complementaryChosen = function () {
//     $('.selected').
// }



//checks to see who won
var checkForWinner = function() {
    console.log(player1score);
    console.log(player2score);
    console.log(player1.text())
    console.log(player2.text())

    if (player1score === player2score) {
        winner = 'tie';
        swal({   title: "It's a tie!",   
        text: "Game over.",   
        timer: 2000,   
        showConfirmButton: false });
        return winner;
        }
    else if (player1score > player2score) {
        winner = player1;
        swal({   title: winner.text() + ' is the winner!',   
        text: "Game over.",   
        timer: 2000,   
        showConfirmButton: false });
        // alert(winner.text() + ' is the winner!');
        return winner.text();
    }
    else {
        winner = player2;
        swal({   title: winner.text() + ' is the winner!',   
        text: "Game over.",   
        timer: 2000,   
        showConfirmButton: false });
        winner = player2;
        // alert(winner.text() + ' is the winner!')
        return winner.text();
    }
}

// checks to see if game is over
var checkForEnd = function() {
    if (pairsMatched.length === boardSize / 2) {
        checkForWinner();    
    }
    else {
        selectedPairNumArr = [];
        switchTurns();
    }
}

var switchTurns = function() {
    console.log('the current player before switching is:', player)
    clickNum = 0;
    turn++;
    selectedPairNumArr = [];
    // $('#status').removeClass('animated fadeOutRight slideInRight');
    if (turn % 2 !== 0) {
        player = 'player1';
        // $(player1).css('color', 'red');
        // $(player2).css('color', 'black');
        // return player;

    } else {
        player = 'player2';
        // playerScore = player2score;
        // $(player1).css('color', 'black')
        // $(player2).css('color', 'red')
        // return player;
    }
}
var trackScore = function() {
    if (player === 'player1') {
        player1score++;
        $('#'+ player + '-score').text(player1score);
        return player1score;
    }
    else {
        player2score++;
        $('#'+ player + '-score').text(player2score);
        return player2score;
    }
}

var checkPairsOfSelected = function() {
    var choice1 = '.' + selectedPairNumArr[0];
    var choice2 = '.' + selectedPairNumArr[1];
    if (clickNum === 2 && choice1 === choice2) {
        console.log('match!');
        trackScore();
        // swal({   title: 'Nice work, ' + $('#'+ player + '-name').text() + ' !',   
        // text: 'You selected complementary colors.',   
        // timer: 1000,   
        // showConfirmButton: false });
        $('#status').fadeIn().text('Nice work, ' + $('#'+ player + '-name').text() + ' ! You selected complementary colors.');
        
        // cell color disappears on match
        $(choice1).css({
            'background': 'transparent',
            'box-shadow': 'none',
            'border': '2px solid #999'
        });

        $(choice1).addClass('chosen');
        $(choice2).addClass('chosen');        
        pairsMatched.push(choice1);
        checkForEnd();
    }
    else if (clickNum < 2) {
        console.log('choose the complement');
    }
    else {
        console.log('not a match');
        $('#status').fadeIn().text('Sorry, ' + $('#'+ player + '-name').text() + ', those colors are not complementary.');
        // $('#status').addClass('animated slideInRight')
        // swal({   title: 'Sorry, ' + $('#'+ player + '-name').text() + '.',   
        //     text: "Those colors are not complementary.",   timer: 1000,   showConfirmButton: false });
        setTimeout(function() {
            $(choice1 + '.selected').removeClass('selected');
            $(choice2 + '.selected').removeClass('selected');
        }, 1000);
        // // $(choice1 + '.selected').removeClass('selected');
        // $(choice2 + '.selected').removeClass('selected');


        switchTurns(choice1, choice2);
    }
}

var turnStart = function(){
    // console.log(clickNum);

    // console.log('turn starting');

    board.on('click', '.card', function (e) {


        // console.log('clicking');

        console.log('turn', turn);

        // $(this).addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
        //     $(this).removeClass('animated pulse');
        //     if (clickNum === 2) {
        //         // console.log(winner);
        //     }
        // });
        if ($(this).hasClass('selected') || clickNum > 2) {
            console.log($(this));
            e.preventDefault();
            // clickNum--;
            // console.log($(this));
            // console.log($(this).hasClass('selected'));
            console.log('prevented default');
            // console.log(clickNum);
        } else {
            clickNum++;
            console.log('click', clickNum);
            $(this).addClass('selected');
            // console.log('adding class selected');
            // console.log($(this));
            selectedPairNumArr.push($(this)[0].classList[1]);
            // console.log(selectedPairNumArr);
            // console.log("clickNum",clickNum, "going to check pairs of selected");
            checkPairsOfSelected();
        }
    });
}


initializeBoard();


// var playAgain = function() {

// }

// // fn
// var flipCard = function() {
//     $(this).addClass('animated flip');
//     $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', endOfCardFlip);

// }
// // fn
// var endOfCardFlip = function() {
//     card.removeClass('animated flip');

// }
//end 
});