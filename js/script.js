$(function() {

// var cardDiv = '<div class="card"></div>';
// var boardRow = '<div class="board-row"></div>';
var sizeInput = 5; // must be > 1 and < 7
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
console.log(complement);

$('.complement').css({background:complement});

var initializeBoard = function() {
    console.log('first loop');
    for (var i = 0; i < sizeInput; i++) {
        board.append('<div class="board-row" id="row' + i + '"></div>')
        for (var j = 0; j < sizeInput; j++) {
            console.log(i);
            $('#row' + i).append('<div class="card" id="card' + j + '"></div>');
        }
    }
}

initializeBoard(); // add a modal to start this function

card.on('click', function () {
    $(this).addClass('animated flip');
    $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', endOfCardFlip);
});

var endOfCardFlip = function() {
    card.removeClass('animated flip');

}



// function rgbToHsl(r, g, b){
//     r /= 255, g /= 255, b /= 255;
//     var max = Math.max(r, g, b), min = Math.min(r, g, b);
//     var h, s, l = (max + min) / 2;

//     if(max == min){
//         h = s = 0; // achromatic
//     }else{
//         var d = max - min;
//         s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//         switch(max){
//             case r: h = (g - b) / d + (g < b ? 6 : 0); break;
//             case g: h = (b - r) / d + 2; break;
//             case b: h = (r - g) / d + 4; break;
//         }
//         h /= 6;
//     }

//     return [h, s, l];
// }

// var h = rgbToHsl(127,25,19)[0];

// function invertH(h) {
//     var h = rgbToHsl
//     h *= 360;
//     if (h <= 180) {
//         h -= 180;
//         h /= 360;
//     }
//     else {
//         h += 180;
//         h /= 360;
//     }
//     return h;
// }
// // invertH
// console.log(rgbToHsl(127,25,19)[0]);


// function hslToRgb(h, s, l){
//     var r, g, b;

//     if(s == 0){
//         r = g = b = l; // achromatic
//     }else{
//         function hue2rgb(p, q, t){
//             if(t < 0) t += 1;
//             if(t > 1) t -= 1;
//             if(t < 1/6) return p + (q - p) * 6 * t;
//             if(t < 1/2) return q;
//             if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
//             return p;
//         }

//         var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
//         var p = 2 * l - q;
//         r = hue2rgb(p, q, h + 1/3);
//         g = hue2rgb(p, q, h);
//         b = hue2rgb(p, q, h - 1/3);
//     }

//     return [r * 255, g * 255, b * 255];
// }
});