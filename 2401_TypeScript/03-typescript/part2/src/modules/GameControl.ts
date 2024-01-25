import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

class GameControl {
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  direction: string = "Right";
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();
  }
  // 初始化游戏
  init() {
    document.addEventListener("keydown", this.keydownHandler);
    this.run();
  }
  // 键盘按下的响应函数
  keydownHandler = (event: KeyboardEvent) => {
    // 需要检查event.key的值是否合法
    this.direction = event.key;
  };
  run = () => {
    let headX = this.snake.headX;
    let headY = this.snake.headY;
    switch (this.direction) {
      case "ArrowUp":
      case "Up":
        headY -= 10;
        break;
      case "ArrowDown":
      case "Down":
        headY += 10;
        break;
      case "ArrowLeft":
      case "Left":
        headX -= 10;
        break;
      case "ArrowRight":
      case "Right":
        headX += 10;
        break;
    }

    if (this.checkEat(headX, headY)) {
      console.log("吃到食物了");
      this.food.changeFood();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
    try {
      this.snake.headX = headX;
      this.snake.headY = headY;
      // console.log("移动了头");
    } catch (e) {
      alert((e as Error).message + "GAME OVER!");
      this.isLive = false;
    }

    this.isLive && setTimeout(this.run, 300 - (this.scorePanel.level - 1) * 30);
  };
  checkEat(headX: number, headY: number) {
    return headX === this.food.FoodX && headY === this.food.FoodY;
  }
}
export default GameControl;
