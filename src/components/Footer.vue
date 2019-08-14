<template>
  <div>
    <footer>
      <strong>@ 이주원과아이들 - 2019</strong>
      <div id="snsIcon">
        <strong class="mr-3">Contact Us</strong>
        <a href="https://lab.ssafy.com/zooo1/webmobile-sub2/">
          <v-icon size="30" class="mr-3" style="color:#333;">fa-github</v-icon>
        </a>
      </div>
    </footer>
    <div id="translate">
      <Translate></Translate>
    </div>
    <!-- 날씨 정보 -->
    <weather></weather>
        <audio autoplay controls>
      <source src="../assets/music/PinkNWhite.mp3" type="audio/mpeg" />
    </audio>
  </div>
</template>


<script>
import weather from "@/components/weather.vue";
import Translate from "@/components/Translate.vue";

export default {
  name: "Footer",
  components: {
    weather,
    Translate
  }
};
</script>

<style scoped>
div {
  background-color: #f0f0f0 ;
}
footer {
  font-family: "Jua", sans-serif;
  color: #777;
  font-size: 20px;
  font-weight: 700;
  padding: 15px;
}
a {
  text-decoration: none;
}
strong {
  margin: 0 3;
}
#snsIcon {
  color: #555;
  float: right;
  margin-right: 60px;
}
#translate {
  float: right;
  margin-right: 140px;
  margin-top: 10px;
 }
 audio{
   width: 500px;
 }
</style>
