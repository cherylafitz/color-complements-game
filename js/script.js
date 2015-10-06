$(function() {

// The object of this game is to select complementary color sets until there are no colors left. The player with the most sets wins.
// A next step would be to animate the pair removal so that matched pairs end up under the scoreboard of the player who chose them

// Some variables
var sizeInput = 4; // must be 4 or 6 -- plan to provide option for user to click a button for the 6 input - a super-challenge option
var boardSize = Math.pow(sizeInput, 2);
var board = $('#game-board');
var boardWidth = sizeInput * 125 + 'px';
var card = $('.card')
var turn = 1;
var player1 = $('#player1-name');
var player2 = $('#player2-name');
var player1score = parseInt($('#player1-score').text()); // starts at 0
var player2score = parseInt($('#player2-score').text()); // starts at 0
var player;
var successIcon = '<span class="glyphicon glyphicon-thumbs-up pull-right" aria-hidden="true"></span>';
var failIcon = '<span class="glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>';
// array to store class name of pairs that have already been matched
var pairsMatched = [];
var winner = false;

// Generates random color with tinycolor library
// has potential to check for used colors - will be useful in more advanced version of game
var newRandomColor = function() {
    return tinycolor.random().toHexString();
}

// gets array of colors and their complements - first colors added to even indeces,
// complements added to odd indeces immediately following their respective colors
var getColorComplements = function() {
    var colorComplements = [];
    for (var i= 0; i < boardSize / 2; i++) {
        var newColor = newRandomColor();
        colorComplements.push(newColor);
        colorComplements.push(tinycolor(newColor).complement().toHexString());
    }
    return colorComplements;
}

// Array to store number of squares and allow for randomization
var numberOfSquaresArr = [];
for (i=1; i<=boardSize; i++) {
    numberOfSquaresArr.push(i);
}

// Randomizes colors on board - shuffles array to be used in adding IDs to squares;
// pulled this shuffle algorithm from Stack Overflow
var shuffle = function(array){
    for(var j, x, i = numberOfSquaresArr.length; i; j = Math.floor(Math.random() * i), x = numberOfSquaresArr[--i], numberOfSquaresArr[i] = numberOfSquaresArr[j], numberOfSquaresArr[j] = x);
    return numberOfSquaresArr;
}

// Initializes and resets board
var initializeBoard = function() {
    var shuffledNumberOfSquaresArray = shuffle(numberOfSquaresArr);
    $('#player1-score').text('0'); //CHECK
    $('#player2-score').text('0'); //CHECK
    player1score = parseInt($('#player1-score').text()); //CHECK
    player2score = parseInt($('#player2-score').text()); //CHECK
    for (var i = 0; i < boardSize; i++) {
        $('.card').removeClass('selected chosen');
    }
    board.css({'width': boardWidth, 'height': boardWidth})
    player = 'player1';
    $('.player1-score-board').addClass('active');
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
    }
    // CONSIDER MOVING ABOVE --- seems to be glitchy when combined with loop above, not sure why...
    for (l = 1; l <= boardSize; l++) {
        if ((l +1) % 2 === 0) {
            $('#id' + l).addClass('pair' + counter2);
        }
        else {
            $('#id' + l).addClass('pair' + counter2);
        counter2++;
        }
    }
    turnStart();
}

// Causes clicking the start button in the modal to initialize the board
$('#start').on('click', function(e) {
    initializeBoard();
    e.preventDefault();
    $('#player1-name').text($('#player1').val());
    $('#player2-name').text($('#player2').val());
    $('#myModal').modal('hide');
    // console.log(player1score);
    $('#status').fadeIn().text($('#'+ player + '-name').text() + "'s turn.");
    //
});
$('#new-game').on('click', function() {
    $('#player1').focus()
});

// The following functions deal with game play

var clickNum = 0;

// Array to put the two choices to compare
var selectedPairNumArr = [];
var pairCounter = 0;

// Checks to see who won
var checkForWinner = function() {
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
        setTimeout(function() {
            $('#status').text('Game over. Click "New Game" to play again.');
        }, 2000);
        checkForWinner();
    }
    else {
        selectedPairNumArr = [];
        switchTurns();
    }
}

// Causese turns to switch after each pair of clicks
var switchTurns = function() {
    // console.log('the current player before switching is:', player)
    clickNum = 0;
    turn++;
    selectedPairNumArr = [];
    if (turn % 2 !== 0) {
        $('.player2-score-board').removeClass('active');
        player = 'player1';
        $('.player1-score-board').addClass('active');

    } else {
        $('.player1-score-board').removeClass('active');
        player = 'player2';
        $('.player2-score-board').addClass('active');
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

// Checks to see if the selected colors make a pair
var checkPairsOfSelected = function() {
    var choice1 = '.' + selectedPairNumArr[0];
    var choice2 = '.' + selectedPairNumArr[1];
    if (clickNum === 2 && choice1 === choice2) {
        // console.log('match!');
        trackScore();
        $('.active .panel-body h4').append(successIcon);
        setTimeout(function() {
            $('.glyphicon').fadeOut();
        }, 1500);
        $('#status').fadeIn().text('Nice work, ' + $('#'+ player + '-name').text() + '! You selected complementary colors.');
        setTimeout(function() {
            $('#status').fadeIn().text($('#'+ player + '-name').text() + "'s turn.");
        }, 1500);
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
        // console.log('choose the complement');
    }
    else {
        // console.log('not a match');
        $('.active .panel-body h4').append(failIcon);
        setTimeout(function() {
            $('.glyphicon').fadeOut()
        }, 1500);
        $('#status').fadeIn().text('Sorry, ' + $('#'+ player + '-name').text() + ', those colors are not complementary.');
        setTimeout(function() {
            $('#status').fadeIn().text($('#'+ player + '-name').text() + "'s turn.");
        }, 1500);
        setTimeout(function() {
            $(choice1 + '.selected').removeClass('selected');
            $(choice2 + '.selected').removeClass('selected');
        }, 500);
        switchTurns();
    }
}

// Starts and manages the turns - is running throughout the game
var turnStart = function(){
    board.on('click', '.card', function (e) {
        // console.log('turn', turn);
        $(this).addClass('animated pulse').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
            $(this).removeClass('animated pulse');
        });
        if ($(this).hasClass('selected') || clickNum > 2) {
            // console.log($(this));
            e.preventDefault();
            // console.log('prevented default');
        } else {
            clickNum++;
            // console.log('click', clickNum);
            $(this).addClass('selected');
            selectedPairNumArr.push($(this)[0].classList[1]);
            checkPairsOfSelected();
        }
    });
}

initializeBoard();
$('#new-game').focus();

//end
});