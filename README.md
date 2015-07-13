# color-complements-challenge

###Object

The Color Compliments Challenge is a game in which two players compete to identify the most pairs of complementary colors. Turns alternate after each pairing attempt. The game ends when there are no more pairs to identify. If players end up with the same amount of color pairs, the game is tied. Otherwise, the player who has identified the most pairs wins. The game ended up being much more difficult to play than I had anticipated. 

###Technologies Used
I built the game using JavaScript, CSS3, and HTML5. The game utilizes the Bootstrap framework for its basic components and styles, jQuery for most of its functions, Sweet Alert for its alerts, and Animate.css for it's on-click animations. The colors are generated and matched using functions from the Tiny Color JavaScript library. Because of this, the colors paired may differ slightly from those generated with programs using different algirithms. 

###Approach
I began by building functions to generate colors and pair them with their complements. I then created a board initializer function, which also serves as a reset. The board initializer pulls in an array of color pairs and assigns them to random IDs/cells. The board is expandable to enable a super-challenge with 36 colors, but I have not yet built in a way to deliver this to the user, as it will require adjusting some of the dimensions to maintain a pleasant user experience. 

I then added functions to start the turns, check for pairs, switch turns, track points, check for an end, check for a winner, and call for a new game. 

###Installation Instructions

To install the game, clone the cherylafitz/color-complements-game repository on GitHub, and open the index.html file in a browser. 

###Unsoved problems
I spent a fair amount of time in the beginning trying to make the board both responsive and expandable. I somewhat succeeded with the latter, but was unsuccessful at creating a board that works well on all device sizes, specifically mobile. This is something I would like to explore in the future. I would also like to give users the ability to increase the number of cells to 36 themselves - the "super-challenge" version I mentioned above. The reason I didn't pursue this now is because the current set up of the board makes impossible to show all 36 cells at one time on the average computer screen. Making the game fully responsive would solve that problem. 

I would also like to give users the option to choose an easier verison of the game. This would mean that I would have to reduce thepool of random colors which populates the board, and make the colors in the smaller pool differentiate more greatly from one another. I'd also like to add a hint button which opens up a color wheel which users can refer to.

Another future step is to animate the pair removal so that matched pairs slide over to end up under the scoreboard of the player who chose them, instead of just disappearing into the board. I'd also like to give more obvious signifiers about what is happening when a player chooses incorrectly, such as adding a temporary red diagonal line over each circle. The text displayed to the user requires more thought and attention than it should. The game could also benefit from some sound appropriate effects.

One bug in this first version of the game is that if a user click's "New Game" and does not enter any names for players, the "Player 1" and "Player 2" names are lost, when they should still be a default. This should be fixed for the next version.




