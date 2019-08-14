<template>
  <div>
    <i class="fas fa-pencil-alt"></i>

    <!-- <div v-on:click="changeBannerImg"> -->
    <ImgBanner>
      <div id="introduce" style="line-height:1.2em; color:#333;" slot="text"></div>
    </ImgBanner>
    <!-- About Us -->
    <div id="aboutUsbox">
      <div id="aboutUs">
        <h2 class="headline text-xs-center" style="margin: 50px 0;">About Us</h2>
        <AboutUs></AboutUs>
      </div>
    </div>

    <!-- Portfolio -->
    <!-- <v-container>
      <v-layout>
    <v-flex xs12>-->
    <div style="margin: 50px 30px">
      <h2 class="headline text-xs-center" style="margin: 50px 0;">Portfolio</h2>
      <PortfolioList></PortfolioList>
    </div>
    <!-- </v-flex>
      </v-layout>
    </v-container>-->

    <!-- Post -->
    <v-layout my-5>
      <v-flex xs12>
        <h2 class="headline my-5 text-xs-center">Post</h2>
        <PostList :column="1"></PostList>
      </v-flex>
    </v-layout>

    <!-- Github -->
    <v-container>
      <v-layout>
        <v-flex xs12>
          <h2 class="headline my-5 text-xs-center">Project</h2>
          <RepositoryList></RepositoryList>
        </v-flex>
      </v-layout>
    </v-container>
    <!-- </v-container> -->
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PortfolioList from "../components/PortfolioList";
import PostList from "../components/PostList";
import RepositoryList from "../components/RepositoryList";
import ImageUpload from "../components/ImageUpload";
import AboutUs from "../components/AboutUs";

export default {
  name: "HomePage",
  data() {
    return {
      showPhoto: false
      // randomImg: "https://picsum.photos/1080/1920",
      // img: "https://picsum.photos/1080/1920"
    };
  },
  components: {
    ImgBanner,
    PortfolioList,
    PostList,
    RepositoryList,
    ImageUpload,
    AboutUs
  },
  methods: {
    // getImgUrl(img) {
    //   return require("../assets/" + img);
    // },
    // changeBannerImg() {
    //   this.showPhoto = !this.showPhoto;
    //   if (this.showPhoto && this.user.photoURL) {
    //     this.img = this.user.photoURL;
    //   } else {
    //     this.img = this.randomImg;
    //   }
    // }
  },
  props: ["user"]
};
</script>


<style scoped>
h2 {
  font-family: "Jua", sans-serif !important;
  letter-spacing: 3px !important;
  font-size: 43px !important;
  font-weight: 900;
  text-shadow: 4px 4px #069be5;
}
#aboutUs {
  padding: 50px;
}
@media screen and (max-width: 1204px) {
  #aboutUs {
    font-size: 25px;
  }
}

@media screen and (max-width: 760px) {
  #aboutUs {
    font-size: 20px;
  }
}
#introduce {
  font-size: 45px;
  font-weight: bold;
  color: black;
  opacity: 1;
}
</style>
