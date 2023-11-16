$(function () {
  const SIZE = 4;
  var arr = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  // console.log(arr[1][0]);

  function firstRender() {
    var x1 = getRandom(0, 3);
    var y1 = getRandom(0, 3);
    do {
      var x2 = getRandom(0, 3);
      var y2 = getRandom(0, 3);
    } while (x1 === x2 && y1 === y2);
    arr[x1][y1] = 2;
    arr[x2][y2] = 2;
    render();
  }
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 在数组为0的位置生成随机数字
  function generateNum() {
    var positions = [];
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        if (arr[i][j] === 0) {
          positions.push([i, j]);
        }
      }
    }
    var index = getRandom(0, positions.length - 1);
    var pos = positions[index];
    // console.log(pos);
    var randomNum = getRandom(1, 2) * 2;
    var x = pos[0];
    var y = pos[1];
    console.log(pos, randomNum);
    arr[x][y] = randomNum;
  }

  function render() {
    console.log(arr);
    $(".tile-container").empty();
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        var num = arr[i][j];
        if (num !== 0) {
          var $numBox = $(
            '<div><div class="tile-inner">' + num + "</div></div>"
          )
            .addClass("tile")
            .addClass("tile-position-" + i + "-" + j)
            .addClass("tile-" + num);
          $(".tile-container").append($numBox);
        }
      }
    }
  }
  function arrowUpDown(isUp) {
    var isMoved = false;
    for (var j = 0; j < SIZE; j++) {
      // 上一个不为0的数字的行数和大小
      var preRow = isUp ? 0 : SIZE - 1;
      var preNum = -1;
      for (
        var i = isUp ? 0 : SIZE - 1;
        isUp ? i < SIZE : i >= 0;
        isUp ? i++ : i--
      ) {
        var num = arr[i][j];
        if (num !== 0) {
          if (num === preNum) {
            // 如果相等 则之前的数字翻倍
            arr[preRow][j] = num * 2;
            arr[i][j] = 0;
            preNum = num * 2;
            isMoved = true;
          } else {
            if (preNum === -1) {
              arr[preRow][j] = num;
            } else {
              var newPreRow = isUp ? preRow + 1 : preRow - 1;
              arr[newPreRow][j] = num;
              preRow = newPreRow;
              // arr[i][j] = 0;
            }
            if (preRow !== i) {
              arr[i][j] = 0;
              isMoved = true;
            }
            preNum = num;
          }
        }
      }
    }
    if (isMoved) {
      generateNum();
    }
  }
  function arrowLeftRight(isLeft) {
    var isMoved = false;
    for (var i = 0; i < SIZE; i++) {
      // 上一个不为0的数字的行数和大小
      var preCol = isLeft ? 0 : SIZE - 1;
      var preNum = -1;
      for (
        var j = isLeft ? 0 : SIZE - 1;
        isLeft ? j < SIZE : j >= 0;
        isLeft ? j++ : j--
      ) {
        var num = arr[i][j];
        if (num !== 0) {
          if (num === preNum) {
            // 如果相等 则之前的数字翻倍
            arr[i][preCol] = num * 2;
            arr[i][j] = 0;
            preNum = num * 2;
            isMoved = true;
          } else {
            if (preNum === -1) {
              arr[i][preCol] = num;
            } else {
              var newPreCol = isLeft ? preCol + 1 : preCol - 1;
              arr[i][newPreCol] = num;
              preCol = newPreCol;
              // arr[i][j] = 0;
            }
            if (preCol !== j) {
              arr[i][j] = 0;
              isMoved = true;
            }
            preNum = num;
          }
        }
      }
    }
    if (isMoved) {
      generateNum();
    }
  }
  $(document).keydown(function (e) {
    if (e.keyCode === 0x25) {
      // alert("left");
      arrowLeftRight(true);
      render();
    }
    if (e.keyCode === 0x26) {
      // alert("up");
      arrowUpDown(true);
      render();
    }
    if (e.keyCode === 0x27) {
      // alert("right");
      arrowLeftRight(false);
      render();
    }
    if (e.keyCode === 0x28) {
      // alert("down");
      arrowUpDown(false);
      render();
    }
  });
  firstRender();
});
