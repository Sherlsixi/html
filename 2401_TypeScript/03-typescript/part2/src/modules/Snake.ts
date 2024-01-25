class Snake {
  head: HTMLElement;
  bodies: HTMLCollection;
  element: HTMLElement;

  constructor() {
    this.element = document.querySelector(".snake")!;
    this.head = document.querySelector(".snake>div")!;
    this.bodies = this.element.getElementsByTagName("div");
  }
  get headX() {
    return this.head.offsetLeft;
  }
  get headY() {
    return this.head.offsetTop;
  }

  set headX(value: number) {
    if (this.headX === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了！");
    }
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      // console.log("蛇调头了");
      if (value > this.headX) {
        value = this.headX - 10;
      } else {
        value = this.headX + 10;
      }
    }
    this.moveBody();
    this.head.style.left = value + "px";
    this.checkHeadHitBody();
  }
  set headY(value: number) {
    if (this.headY === value) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了！");
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.headY) {
        value = this.headY - 10;
      } else {
        value = this.headY + 10;
      }
    }
    this.moveBody();
    this.head.style.top = value + "px";
    this.checkHeadHitBody();
  }
  addBody() {
    console.log("增加了身体");

    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  moveBody() {
    for (let i = this.bodies.length - 1; i > 0; i--) {
      console.log("移动了身体");

      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }
  checkHeadHitBody() {
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.headX === bd.offsetLeft && this.headY === bd.offsetTop) {
        throw new Error("蛇撞到自己了!");
      }
    }
  }
}

export default Snake;
