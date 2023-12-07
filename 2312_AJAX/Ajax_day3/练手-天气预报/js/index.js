function getWeather(cityCode) {
  myAxios({
    url: "https://hmajax.itheima.net/api/weather",
    params: {
      city: cityCode,
    },
  }).then((result) => {
    // console.log(result.data);
    const wData = result.data;
    document.querySelector(".title").innerHTML = `
    <span class="dateShort">${wData.dateShort}</span>
    <span class="calendar">农历&nbsp;
      <span class="dateLunar">${wData.dateLunar}</span>
    </span>
    `;
    document.querySelector(".location .area").innerHTML = wData.area;
    document.querySelector(".weather-box").innerHTML = `
    <div class="tem-box">
      <span class="temp">
        <span class="temperature">${wData.temperature}</span>
        <span>°</span>
      </span>
    </div>
    <div class="climate-box">
      <div class="air">
        <span class="psPm25">${wData.psPm25}</span>
        <span class="psPm25Level">${wData.psPm25Level}</span>
      </div>
      <ul class="weather-list">
        <li>
          <img src="${wData.weatherImg}" class="weatherImg" alt="">
          <span class="weather">${wData.weather}</span>
        </li>
        <li class="windDirection">${wData.windDirection}</li>
        <li class="windPower">${wData.windPower}</li>
      </ul>
    </div>
    `;
    const twData = wData.todayWeather;
    // console.log(twData);
    document.querySelector(
      ".today-weather"
    ).innerHTML = `<div class="range-box">
    <span>今天：</span>
    <span class="range">
      <span class="weather">${twData.weather}</span>
      <span class="temNight">${twData.temNight}</span>
      <span>-</span>
      <span class="temDay">${twData.temDay}</span>
      <span>℃</span>
    </span>
  </div>
  <ul class="sun-list">
    <li>
      <span>紫外线</span>
      <span class="ultraviolet">${twData.ultraviolet}</span>
    </li>
    <li>
      <span>湿度</span>
      <span class="humidity">${twData.humidity}</span>%
    </li>
    <li>
      <span>日出</span>
      <span class="sunriseTime">${twData.sunriseTime}</span>
    </li>
    <li>
      <span>日落</span>
      <span class="sunsetTime">${twData.sunsetTime}</span>
    </li>
  </ul>`;
    const dayForecast = wData.dayForecast;
    const weekStr = dayForecast
      .map((item) => {
        return `
      <li class="item">
        <div class="date-box">
          <span class="dateFormat">${item.dateFormat}</span>
          <span class="date">${item.date}</span>
        </div>
        <img src="${item.weatherImg}" alt="" class="weatherImg">
        <span class="weather">${item.weather}</span>
        <div class="temp">
          <span class="temNight">${item.temNight}</span>-
          <span class="temDay">${item.temDay}</span>
          <span>℃</span>
        </div>
        <div class="wind">
          <span class="windDirection">${item.windDirection}</span>
          <span class="windPower">${item.windPower}</span>
        </div>
      </li>
      `;
      })
      .join("");
    document.querySelector(".week-wrap").innerHTML = weekStr;
  });
}
getWeather(110100);

document.querySelector(".search-city").addEventListener("input", (e) => {
  // console.log(e.target.value);
  myAxios({
    url: "https://hmajax.itheima.net/api/weather/city",
    params: {
      city: e.target.value,
    },
  }).then((result) => {
    // console.log(result.data);
    const searchStr = result.data
      .map((item) => {
        return `<li class="city-item" data-code="${item.code}">${item.name}</li>`;
      })
      .join("");
    document.querySelector(".search-list").innerHTML = searchStr;
  });
});
document.querySelector(".search-list").addEventListener("click", (e) => {
  if (e.target.classList.contains("city-item")) {
    // console.log(e.target.dataset.code);
    const cityCode = e.target.dataset.code;
    getWeather(cityCode);
  }
});
