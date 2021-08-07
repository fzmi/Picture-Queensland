/**
 * script-puzzle.js
 * 
 * Reference: https://www.emanueleferonato.com/2018/03/13/build-a-html5-jigsaw-puzzle-game-with-zim-framework/
 * (with modification)
 */

var proxy = '../proxy.php';
var imgUrl = '../images/puzzles/test.jpg';

function proxify(url) {
  return proxy + '?' + url;
}

$(document).ready(function () {
  startGame(null, imgUrl);
});

function startGame(data, url) {

  var img = new Image();
  img.src = url;

  img.onload = function () {

    var scaling = "fit"; // this will resize to fit inside the screen dimensions
    var width = img.width;
    var height = img.height;
    var color = "#EEEEEE"; // ZIM colors like green, blue, pink, faint, clear, etc.
    var outerColor = "#333333"; // any HTML colors like "violet", "#333", etc. are fine to use

    var frame = new Frame(scaling, width, height, color, outerColor);
    frame.on("ready", function () {

      var stage = frame.stage;
      var stageW = frame.width;
      var stageH = frame.height;

      var container = new Container();
      var finishedPieces = 0;

      frame.loadAssets(url);

      frame.on("complete", function () {
        var image = frame.asset(url); // A bitmap image
        image.alpha = 0.2;
        image.addTo(container);

        var horizontalPieces = 4;
        var verticalPieces = 3;
        if (height > width) {
          [horizontalPieces, verticalPieces] = [verticalPieces, horizontalPieces];
        }
        var totalPieces = horizontalPieces * verticalPieces;
        var imageWidth = width;
        var imageHeight = height;
        var pieceWidth = imageWidth / horizontalPieces;
        var pieceHeight = imageHeight / verticalPieces;
        var puzzleX = stageW / 2 - imageWidth / 2;
        var puzzleY = stageH / 2 - imageHeight / 2;
        container.pos(puzzleX, puzzleY);

        var piecesArrayObject = [];
        for (i = 0; i < verticalPieces; i++) {
          piecesArrayObject[i] = [];
          for (j = 0; j < horizontalPieces; j++) {

            var offsetX = pieceWidth * j;
            var offsetY = pieceHeight * i;

            var width8 = pieceWidth / 8;
            var height8 = pieceHeight / 8;

            piecesArrayObject[i][j] = new Object();
            piecesArrayObject[i][j].right = Math.floor(Math.random() * 2);
            piecesArrayObject[i][j].down = Math.floor(Math.random() * 2);
            if (i > 0) {
              piecesArrayObject[i][j].up = 1 - piecesArrayObject[i - 1][j].down;
            }
            if (j > 0) {
              piecesArrayObject[i][j].left = 1 - piecesArrayObject[i][j - 1].right;
            }
            var pieceObject = piecesArrayObject[i][j];

            var pieceContent = new createjs.Graphics();
            pieceContent.setStrokeStyle(2, "round");
            pieceContent.beginStroke(createjs.Graphics.getRGB(80, 80, 80)).command;
            pieceContent.beginBitmapFill(image.image).command;
            pieceContent.moveTo(offsetX, offsetY);

            // Draw the outline of each piece.
            if (i != 0) {
              pieceContent.lineTo(offsetX + 3 * width8, offsetY);
              if (pieceObject.up == 1) {
                pieceContent.curveTo(offsetX + 2 * width8, offsetY - 2 * height8, offsetX + 4 * width8, offsetY - 2 * height8);
                pieceContent.curveTo(offsetX + 6 * width8, offsetY - 2 * height8, offsetX + 5 * width8, offsetY);
              } else {
                pieceContent.curveTo(offsetX + 2 * width8, offsetY + 2 * height8, offsetX + 4 * width8, offsetY + 2 * height8);
                pieceContent.curveTo(offsetX + 6 * width8, offsetY + 2 * height8, offsetX + 5 * width8, offsetY);
              }
            }
            pieceContent.lineTo(offsetX + 8 * width8, offsetY);
            if (j != horizontalPieces - 1) {
              pieceContent.lineTo(offsetX + 8 * width8, offsetY + 3 * height8);
              if (pieceObject.right == 1) {
                pieceContent.curveTo(offsetX + 10 * width8, offsetY + 2 * height8, offsetX + 10 * width8, offsetY + 4 * height8);
                pieceContent.curveTo(offsetX + 10 * width8, offsetY + 6 * height8, offsetX + 8 * width8, offsetY + 5 * height8);
              } else {
                pieceContent.curveTo(offsetX + 6 * width8, offsetY + 2 * height8, offsetX + 6 * width8, offsetY + 4 * height8);
                pieceContent.curveTo(offsetX + 6 * width8, offsetY + 6 * height8, offsetX + 8 * width8, offsetY + 5 * height8);
              }
            }
            pieceContent.lineTo(offsetX + 8 * width8, offsetY + 8 * height8);
            if (i != verticalPieces - 1) {
              pieceContent.lineTo(offsetX + 5 * width8, offsetY + 8 * height8);
              if (pieceObject.down == 1) {
                pieceContent.curveTo(offsetX + 6 * width8, offsetY + 10 * height8, offsetX + 4 * width8, offsetY + 10 * height8);
                pieceContent.curveTo(offsetX + 2 * width8, offsetY + 10 * height8, offsetX + 3 * width8, offsetY + 8 * height8);
              } else {
                pieceContent.curveTo(offsetX + 6 * width8, offsetY + 6 * height8, offsetX + 4 * width8, offsetY + 6 * height8);
                pieceContent.curveTo(offsetX + 2 * width8, offsetY + 6 * height8, offsetX + 3 * width8, offsetY + 8 * height8);
              }
            }
            pieceContent.lineTo(offsetX, offsetY + 8 * height8);
            if (j != 0) {
              pieceContent.lineTo(offsetX, offsetY + 5 * height8);
              if (pieceObject.left == 1) {
                pieceContent.curveTo(offsetX - 2 * width8, offsetY + 6 * height8, offsetX - 2 * width8, offsetY + 4 * height8);
                pieceContent.curveTo(offsetX - 2 * width8, offsetY + 2 * height8, offsetX, offsetY + 3 * height8);
              } else {
                pieceContent.curveTo(offsetX + 2 * width8, offsetY + 6 * height8, offsetX + 2 * width8, offsetY + 4 * height8);
                pieceContent.curveTo(offsetX + 2 * width8, offsetY + 2 * height8, offsetX, offsetY + 3 * height8);
              }
            }
            pieceContent.lineTo(offsetX, offsetY);

            var piece = new Shape({
              graphics: pieceContent
            });
            piece.drag();
            piece.mouseChildren = false;

            piece.addEventListener("pressup", function (event) {
              var gap = 40;
              var currentPiece = event.currentTarget;
              var currentX = Math.round(currentPiece.x);
              var currentY = Math.round(currentPiece.y);

              if (currentX < gap && currentX > -gap && currentY < gap && currentY > -gap) {
                currentPiece.x = 0;
                currentPiece.y = 0;
                currentPiece.noDrag();
                currentPiece.addTo(currentPiece.parent, 0);
                currentPiece.mouseChildren = false;
                currentPiece.mouseEnabled = false;
                currentPiece.hint.visible = false;
                finishedPieces++;
                stage.update();

                // Win the game.
                if (finishedPieces == totalPieces) {
                  puzzleWin();
                  gameRefresh();
                }
              }
            });

            piece.addTo(container);

            var fill = new createjs.Graphics.Fill("red");
            pieceContent.append(fill);
            var hint = new Shape();
            hint.mouseChildren = false;
            hint.mouseEnabled = false;
            piece.hint = hint;
            hint.graphics = pieceContent.clone(true);
            hint.pos(puzzleX, puzzleY);
            hint.graphics._fill = fill;
            hint.graphics._fill.style = null;
            hint.addTo(container, 0);

            piece.animate({ obj: { x: rand(-offsetX, stageW - offsetX - pieceWidth), y: rand(-offsetY, stageH - offsetY - pieceHeight) }, time: 700 });
          }
        }

        container.addTo(stage);
        stage.update();
      });

      stage.update(); // this is needed to show any changes
    }); // end of ready
  };
}

function gameRefresh() {
  window.location.replace(window.location.pathname + window.location.search + window.location.hash);
}

function puzzleStart(url) {
  gameRefresh(null);
}

function puzzleWin() {
  parent.gameSuccess();
}
