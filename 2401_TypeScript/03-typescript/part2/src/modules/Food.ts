class Food {
  element: HTMLElement;

  constructor() {
    this.element = document.querySelector(".food")!;
  }

  get FoodX() {
    return this.element.offsetLeft;
  }
  get FoodY() {
    return this.element.offsetTop;
  }
  changeFood() {
    // 生成一个随机位置
    let foodLeft = Math.floor(Math.random() * 30) * 10;
    let foodTop = Math.floor(Math.random() * 30) * 10;

    this.element.style.left = foodLeft + "px";
    this.element.style.top = foodTop + "px";
  }
}

export default Food;
