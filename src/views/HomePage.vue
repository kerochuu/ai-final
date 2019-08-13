<template>
  <div>
    <i class="fas fa-pencil-alt"></i>

    <!-- <div v-on:click="changeBannerImg"> -->
    <ImgBanner>
      <div id="introduce" style="line-height:1.2em; color:#333;" slot="text"></div>
    </ImgBanner>
    <!-- 배경음악 -->
    <audio autoplay controls>
      <source type="audio/mp3" />
    </audio>
    <!-- </div> -->

    <!-- <v-container> -->
    <!-- About Us -->
    <!-- <div id="aboutUsbox">
      <div id="aboutUs">
        <h2 class="headline mb-3 text-xs-center">About US</h2>
        <p class="mr-4 text-sm-center">
          안녕하세요, 서울 SSAFY 1기 10조입니다.
          <br />아보카도 좋아하세요?
        </p>
      </div>
    </div>-->

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
    ImageUpload
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
audio{
  width: 120px;
}
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
/* audio {
  display: none;
} */
</style>
