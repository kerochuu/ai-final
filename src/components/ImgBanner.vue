<template>
  <div>
    <v-img id="bannerImg" :src="require('../assets/backgndImg/wallpaper.png')"
     aspect-ratio="1.7">
      <!-- <v-layout align-center justify-center row fill-height>
        <v-flex text-xs-center>
          <span class="text-shadow display-2 font-weight-light">
            <slot name="text" />
          </span>
        </v-flex>
      </v-layout> -->
    </v-img>
  </div>
</template>



<script>
export default {
  name: "ImgBanner",
  data() {
    return {
      imgSrc : "../assets/backgndImg/wallpaper.png"
    }
  },
  methods: {}
};
</script>
<style>
.text-shadow {
  text-shadow: 0 0 15px rgb(255, 255, 255);
}

@media screen and (max-width:460px){
 #bannerImg{
   height: 100vh;
 }
};
</style>
