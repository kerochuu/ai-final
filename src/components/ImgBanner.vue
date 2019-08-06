<template>
  <div>
    <v-img id="bannerImg" :src="imgSrc" aspect-ratio="1.7">
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
  props: {
    imgSrc: { type: String },
    text: { type: String }
  },
  methods: {}
};
</script>
<style>
#bannerImg {
  background-image:url("../assets/backgndImg/wallpaper.png");
  background-size: cover;
  background-position: bottom;
  height: 100vh;
  width: 100%;
  max-width:100%;
 /* background-image: linear-gradient(to bottom right, #e39b82, #fef3cb);*/
  }
.text-shadow {
  text-shadow: 0 0 15px rgb(255, 255, 255);
}
@media screen and (max-width:460px){
 #bannerImg{
   height: 100vh;
 }
};
</style>
