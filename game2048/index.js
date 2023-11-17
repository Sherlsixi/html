$(function () {
  const SIZE = 4;
  var arr = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
  var won = false;
  var messageShowing = false;
  // 开始游戏时随机位置生成两个数字2
  function firstRender() {
    var x1 = getRandom(0, 3);
    var y1 = getRandom(0, 3);
    do {
      var x2 = getRandom(0, 3);
      var y2 = getRandom(0, 3);
    } while (x1 === x2 && y1 === y2);
    arr[x1][y1] = 2;
    arr[x2][y2] = 2;
    var generateList = [
      {
        x: x1,
        y: y1,
        val: 2,
      },
      {
        x: x2,
        y: y2,
        val: 2,
      },
    ];
    render(generateList, []);
  }
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // 在数组为0的空白位置生成一个2或者4的随机数字
  //返回随机生成的数字的位置和数值给generateList
  function generateNum() {
    var positions = [];
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        //得到所有的空白位置 形成一个嵌套数组
        if (arr[i][j] === 0) {
          positions.push([i, j]);
        }
      }
    }
    //随机获取嵌套数组里面的一个数组 得到一个随机位置
    var index = getRandom(0, positions.length - 1);
    var pos = positions[index];
    //随机获取一个2或者4的数字
    var randomNum = getRandom(1, 2) * 2;
    var x = pos[0];
    var y = pos[1];
    arr[x][y] = randomNum;
    //返回坐标和数字
    return {
      x: x,
      y: y,
      val: randomNum,
    };
  }

  // 将嵌套数组的数字和位置映射在画面上
  function render(generateList, shouldMoveList) {
    console.log("generateList:", generateList);
    console.log("shouldMoveList:", shouldMoveList);
    var $container = $(".tile-container");
    for (const generate of generateList) {
      var $numBox = $(
        '<div><div class="tile-inner">' + generate.val + "</div></div>"
      )
        .addClass("tile")
        .addClass("tile-position-" + generate.x + "-" + generate.y)
        .addClass("tile-" + generate.val);
      $container.append($numBox);
    }
    for (const move of shouldMoveList) {
      var from = move.from;
      var to = move.to;
      $container
        .find(".tile-position-" + from[0] + "-" + from[1])
        .removeClass("tile-position-" + from[0] + "-" + from[1])
        .addClass("tile-position-" + to[0] + "-" + to[1]);
    }
    // for (var i = 0; i < SIZE; i++) {
    //   for (var j = 0; j < SIZE; j++) {
    //     var num = arr[i][j];
    //     if (num !== 0) {
    //       var $numBox = $(
    //         '<div><div class="tile-inner">' + num + "</div></div>"
    //       )
    //         .addClass("tile")
    //         .addClass("tile-position-" + i + "-" + j)
    //         .addClass("tile-" + num);
    //       $(".tile-container").append($numBox);
    //     }
    //   }
    // }
  }

  // 当控制上下箭头的时候，操控数字的移动
  function arrowUpDown(isUp) {
    var shouldMoveList = [];
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
        //如果遍历到为0的数字则直接进入下一个循环
        if (num === 0) {
          continue;
        }
        //如果遍历到不为0的数字则进行判断
        if (num === preNum) {
          // 如果此数字和上一个数字相等 则上一个的数字翻倍 此数字位置清空
          arr[preRow][j] = num * 2;
          arr[i][j] = 0;
          shouldMoveList.push({ from: [i, j], to: [preRow, j] });

          preNum = -1;
          var newPreRow = isUp ? preRow + 1 : preRow - 1;
          preRow = newPreRow;
        } else {
          //第一次遍历到数字的时候preNum为-1
          if (preNum === -1) {
            //将这个数字移到顶格位置
            arr[preRow][j] = num;
          } else {
            //如果前面有不相同的数字 则将这个数字移动到前面的数字的后一个位置
            var newPreRow = isUp ? preRow + 1 : preRow - 1;
            arr[newPreRow][j] = num;
            preRow = newPreRow;
          }
          //如果num和preNum不是同一个，则本来的位置清空
          if (preRow !== i) {
            arr[i][j] = 0;
            shouldMoveList.push({ from: [i, j], to: [preRow, j] });
          }
          preNum = num;
        }
      }
    }
    var generateList = [];
    // 如果操作上下箭头之后方格移动了，则在画面上生成新的数字方格
    if (shouldMoveList.length > 0) {
      generateList.push(generateNum());
    }
    if (!isContinue()) {
      $(".game-message").addClass("game-over");
      messageShowing = true;
    }

    if (!won && isWon()) {
      $(".game-message").addClass("game-won");
      messageShowing = true;
    }
    render(generateList, shouldMoveList);
  }

  // 当控制左右箭头的时候，操控数字的移动
  function arrowLeftRight(isLeft) {
    var shouldMoveList = [];
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
        if (num === 0) {
          continue;
        }
        if (num === preNum) {
          // 如果相等 则之前的数字翻倍
          arr[i][preCol] = num * 2;
          arr[i][j] = 0;
          shouldMoveList.push({ from: [i, j], to: [i, preCol] });
          preNum = -1;
          var newPreCol = isLeft ? preCol + 1 : preCol - 1;
          preCol = newPreCol;
        } else {
          if (preNum === -1) {
            arr[i][preCol] = num;
          } else {
            var newPreCol = isLeft ? preCol + 1 : preCol - 1;
            arr[i][newPreCol] = num;
            preCol = newPreCol;
          }
          if (preCol !== j) {
            arr[i][j] = 0;
            shouldMoveList.push({ from: [i, j], to: [i, preCol] });
          }
          preNum = num;
        }
      }
    }
    var generateList = [];

    if (shouldMoveList.length > 0) {
      generateList.push(generateNum());
    }
    if (!isContinue()) {
      $(".game-message").addClass("game-over");
      messageShowing = true;
    }
    if (!won && isWon()) {
      $(".game-message").addClass("game-won");
      messageShowing = true;
    }
    render(generateList, shouldMoveList);
  }
  //判断游戏是否结束了
  function isContinue() {
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        if (
          arr[i][j] === 0 ||
          (arr[i + 1] && arr[i][j] === arr[i + 1][j]) ||
          arr[i][j] === arr[i][j + 1]
        ) {
          return true;
        }
      }
    }
    return false;
  }

  function isWon() {
    for (var i = 0; i < SIZE; i++) {
      for (var j = 0; j < SIZE; j++) {
        if (arr[i][j] === 64) {
          won = true;
          return true;
        }
      }
    }
    return false;
  }

  // 重置游戏
  function reset() {
    arr = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ];
    won = false;
    $(".game-message").removeClass("game-over").removeClass("game-won");
    messageShowing = false;

    firstRender();
  }
  //继续游戏
  function keepGoing() {
    $(".game-message").removeClass("game-over").removeClass("game-won");
    messageShowing = false;
  }

  $(document).keydown(function (e) {
    if (messageShowing) {
      return;
    }

    if (e.keyCode === 0x25) {
      // alert("left");
      arrowLeftRight(true);
    }
    if (e.keyCode === 0x26) {
      // alert("up");
      arrowUpDown(true);
    }
    if (e.keyCode === 0x27) {
      // alert("right");
      arrowLeftRight(false);
    }
    if (e.keyCode === 0x28) {
      // alert("down");
      arrowUpDown(false);
    }
  });
  $(".retry-button").click(reset);
  $(".keep-playing-button").click(keepGoing);
  firstRender();
});
