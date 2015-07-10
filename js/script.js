$(function() {

// var cardDiv = '<div class="card"></div>';
// var boardRow = '<div class="board-row"></div>';
var sizeInput = 4; // must be even and > 1 and < 7
var boardSize = Math.pow(sizeInput, 2)
var board = $('#game-board');
var boardWidth = sizeInput * 125 + 'px';
// var vpw = $(window).width();
// var vph = $(window).height();
var card = $('.card')
// var cardSize = vph / sizeInput + 'px';
var turn = 1;
var player1 = 'player1';
var player2 = 'player2';
var player1score = 0;
var player2score = 0;
var player = player1;
var playerScore = player1score;
var turnStatusText = $('#turn-status');


// board.css({'height': vph + 'px','width': vph + 'px'});
// card.css({'width': cardSize, 'height': cardSize})

board.css({'width': boardWidth, 'height': boardWidth})


var complement = tinycolor($('.first-color').css('background')).complement().toHexString();
// console.log(complement);

$('.complement').css({background:complement});


var newRandomColor = function() {
    var colorsUsed = {};
    var newColor = tinycolor.random();
    newColor = newColor.toHexString();
    colorsUsed[newColor] = true;
    // console.log(newColor);
    // console.log(colorsUsed);
    return newColor;
}

var getColorComplements = function() {
    var colorComplements = [];
    var newColor;
    for (var i= 0; i < boardSize / 2; i++) {
        newColor = newRandomColor();
        // console.log(newColor);
        // colorComplements[newColor + i] = tinycolor(newColor).complement().toHexString();
        colorComplements.push(newColor);
        colorComplements.push(tinycolor(newColor).complement().toHexString());
    }
        return colorComplements;
}

console.log(colorComplementsArray = getColorComplements());



var numberOfSquaresArr = [];

for (i=1; i<=boardSize; i++) {
    numberOfSquaresArr.push(i);
}
// shuffles array to be used in adding ids to squares;
function shuffle(numberOfSquaresArr){
    for(var j, x, i = numberOfSquaresArr.length; i; j = Math.floor(Math.random() * i), x = numberOfSquaresArr[--i], numberOfSquaresArr[i] = numberOfSquaresArr[j], numberOfSquaresArr[j] = x);
    return numberOfSquaresArr;
}

var shuffledNumberOfSquaresArray = shuffle(numberOfSquaresArr);

var initializeBoard = function() {
    // console.log('first loop');
    var counter = 0;
    var counter2 = 1;
    for (var i = 0; i < sizeInput; i++) {
        board.append('<div class="board-row" id="row' + i + '"></div>')
        counter += sizeInput - sizeInput;
        for (var j = 0; j < sizeInput; j++) {
            var uniqueID = shuffledNumberOfSquaresArray[counter];
            $('#row' + i).append('<div class="card" id="id' + uniqueID + '"></div>');
            counter++;
        }
    }
    for(k = 0; k < boardSize; k++) {
        $('#id' + (k + 1)).css('background', colorComplementsArray[k]);
        console.log(colorComplementsArray[k], '#id' + (k + 1));
    }
    for (l = 1; l <= boardSize; l++) {
        if ((l +1) % 2 === 0) {
            console.log(counter);
            console.log(counter);
            $('#id' + l).addClass('pair' + counter2);
            // $('#id' + l).append('pair' + counter2);
            // $('#id' + (counter + 2)).addClass('pair' + ((l + 1)/2));
            // $('#id' + (counter + 2)).append('pair' + ((l + 1)/2));
            console.log($('#id' + l),'pair' + counter2);
        }
        else {
            $('#id' + l).addClass('pair' + counter2);
            // $('#id' + l).append('pair' + counter2);
            console.log($('#id' + l),'pair' + counter2);
         // $('#id' + l).append('pair' + counter2);
        counter2++;
        }
    }
    turnStatusText.text(player + "'s turn:")
}



// fn
var clickNum = 0;
var selectedPairNumArr = [];
var pairCounter = 0


// var complementaryChosen = function () {
//     $('.selected').
// }

var switchTurns = function() {
    if (turn % 2 === 0) {
        player = player1;
        playerScore = player1score;
    } else {
        player = player2;
        playerScore = player2score;
    }
    turnStatusText.text(player + "'s turn:")
}


var checkPairsOfSelected = function() {
    console.log(selectedPairNumArr);
    var choice1 = '.' + selectedPairNumArr[0];
    var choice2 = '.' + selectedPairNumArr[1]
    if (clickNum > 1 && choice1 === choice2) {
        alert('you selected complementary colors!');
        // complementaryChosen();
        $(choice1).css({
            'background': 'transparent',
            'box-shadow': 'none',
            'border': '2px solid #999'
        });
        playerScore++;
        console.log(playerScore);
        $('#' + player + '-score').text(playerScore);
        clickNum = 0;
        selectedPairNumArr = [];
        turn++;
        switchTurns()
        console.log(turn);
    }
    else if (clickNum <= 1) {
        console.log('choose the complement');
    }
    else {
        $(this).removeClass('selected');
        alert('sorry! not a pair.');
        $(choice1).removeClass('selected');
        $(choice2).removeClass('selected');
        clickNum = 0;
        selectedPairNumArr = [];
        turn++;
        switchTurns()
        console.log(turn);
    }
}

var turnStart = function(){
    console.log(turn);
    board.on('click', '.card', function (e) {
        $(this).addClass('animated pulse');
        if ($(this).hasClass('selected') || clickNum > 1) {
            e.preventDefault();
        } else {
            clickNum++;
            console.log("clickNum",clickNum);
            console.log($(this));
            $(this).addClass('selected');
            selectedPairNumArr.push($(this)[0].classList[1]);
            // console.log(selectedPairNumArr);
            checkPairsOfSelected();
        }
    });
}

initializeBoard();
turnStart();

// fn
var flipCard = function() {
    $(this).addClass('animated flip');
    $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', endOfCardFlip);

}
// fn
var endOfCardFlip = function() {
    card.removeClass('animated flip');

}
//end 
});