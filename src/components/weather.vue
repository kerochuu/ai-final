<template>
  <div id="weather" width="30%">
      <ul>
        <img v-if = "weather == 'Rain'"
          src="../assets/weatherIcon/cloud-rain.png">
        </img>
        <img v-else-if = "weather == 'Clouds'"
          src="../assets/weatherIcon/cloud-sun.png">
        </img>
        <img v-else-if = "weather == 'Snow'"
          src="../assets/weatherIcon/cloud-snow.png">
        </img>
        <img v-else-if = "weather == 'Thunderstorm'"
          src="../assets/weatherIcon/cloud-lightning.png">
        </img>
        <img v-else-if = "weather == 'Mist' || weather == 'Haze'|| weather == 'Fog'"
          src="../assets/weatherIcon/cloud-fog-2.png">
        </img>
        <img v-else-if = "weather == 'Clear'"
          src="../assets/weatherIcon/sun.png">
        </img>
      </ul>
      <ul class="weatherInfo">
        <li>습도 : {{humidity}}</li>
        <li>현재온도 : {{temp}}</li>
        <li>최고온도 : {{temp_max}}</li>
        <li>최저온도 : {{temp_min}}</li>
      </ul>
  </div>
</template>

<script>
//날씨 api 추가. using openweathermap API
var weatherApiId="eff5a88bc9e0ad23fa3b728424ed8adb";
var city="SEOUL"
var apiURI = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+weatherApiId;

export default{
  name: "weather",
  data (){
    return{
      //city : "",
      //pressure : "",
      //img_url : "",
      weather : "",
      humidity : "",
      temp : 0,
      temp_max : 0,
      temp_min : 0,
    }
  },
  created(){
    fetch(apiURI)
    .then((response) => {
      if(response.ok){
        return response.json();
      }
      throw new Error("Network response was not ok");
    })
    .then((json) => {
      //this.city = json.name;
      this.weather = json.weather[0].main;
      this.humidity = json.main.humidity + "%";
      this.temp = (json.main.temp - 273.15).toFixed(1) + "°C";
      this.temp_max = (json.main.temp_max - 273.15).toFixed(1) + "°C";
      this.temp_min = (json.main.temp_min - 273.15).toFixed(1) + "°C";
    })
    .catch((error) => {
      console.log(error);
    })
  }
}
</script>
<style scoped>
#weather{
  z-index: 4;
  display: flex;
}
li{
  font-size : 9pt;
  list-style : none;
}
ul{
  color: #555;
}
img{
  filter: grayscale(100%);
}
.weatherInfo{
  display: block;
  font-weight: bold;
  font-size: 16px;
}
</style>
