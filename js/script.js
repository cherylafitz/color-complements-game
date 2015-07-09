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
    // for (var i= 0; i < boardSize / 2; i++) {
    //     console.log(colorComplements[i]);
    //     colorComplements.push(tinycolor(colorComplements[i]).complement().toHexString());
    // }
        return colorComplements;
}

colorComplementsArray = getColorComplements();



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

// object which stores colors, complements, and unique ids
// var colorSquareObjects = [{
//         color: '#be65530',
//         complement: '#53acbe',
//         randomID: "id" + 10
//     },
//     {
//         color: '#0174a71',
//         complement: '#a73401',
//         randomID: "id" + 14
//     },
//     {
//         color: '#570ddd2',
//         complement: '#93dd0d',
//         randomID: "id" + 7
//     }
//     ]

var assignColors = function() {
    for (var i = 0; i < boardSize; i++) {

    }
}


var initializeBoard = function() {
    // console.log('first loop');
    var counter = 0;

    for (var i = 0; i < sizeInput; i++) {
        board.append('<div class="board-row" id="row' + i + '"></div>')
        counter += sizeInput - sizeInput;
        for (var j = 0; j < sizeInput; j++) {
            var uniqueID = shuffledNumberOfSquaresArray[counter];
            $('#row' + i).append('<div class="card" id="id' + uniqueID + '"></div>');
            console.log(colorComplementsArray[counter], '#id' + uniqueID);
            $('#id' + uniqueID).css('background', colorComplementsArray[counter]);
            counter++;
        }
    }
    for (k = 1; k <= colorComplementsArray.length; k+=2) {
        var classCounter = 1;
        // console.log('#id' + k);
        // console.log('#id' + (k+1));
        $('#id' + k).addClass('.pair' + ((k +1)/2));
        $('#id' + k).append('pair' + ((k +1)/2));
        $('#id' + (k + 1)).addClass('.pair' + ((k +1)/2));
        $('#id' + (k + 1)).append('pair' + ((k +1)/2));

        classCounter++;
    }
    // troubleshooting color pairs 

}

initializeBoard();


// assignIds();
// addColors() // add a modal to start this function

// fn

for (i = 0; i < boardSize; i++) {
board.on('click', ('#id' + i), function () {
    $(this).css('background', '#000');

});
}
//colorSquareObjects[i].color
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