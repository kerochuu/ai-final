<template>
  <v-container>
    <v-layout class="portfolioWrite" wrap row>
      <v-flex xs12>
        <h1>Write Your Portfolio</h1>
      </v-flex>

          <v-flex xs12 class="portfolioCard">
            <v-text-field label="Portfolio title" outline v-model="title"></v-text-field>
            <v-textarea
              auto-grow="true"
              outline
              name="Portfolio Description"
              label="Portfolio Description"
              v-model="body"
              @input="update"
            ></v-textarea>
          </v-flex>

        <v-flex xs12>
          <div v-html="compiledMarkdown"></div>
          <ImageUpload ref="imgUpload" />
          <img v-if="this.pid" id="preview" :src="this.img" height="200px"/>
        </v-flex>
               

      <v-flex xs12 text-xs-center round my-5>
        <v-btn  v-if="this.pid" color="info" dark v-on:click="updatePortfolios">
          <v-icon size="25" class="mr-2">fa-plus</v-icon>수정
        </v-btn>
        <v-btn  v-else color="info" dark v-on:click="postPortfolios">
          <v-icon size="25" class="mr-2">fa-plus</v-icon>입력
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
import FirebaseService from "@/services/FirebaseService";
import ImgBanner from "../components/ImgBanner";
import { Stats } from "fs";
export default {
  name: "PortfolioWrite",
  props: {
    title: {
      type: String
    },
    body: {
      type: String
    },
    img: {
      type: String,
      default: ""
    },
    authority: {
      type: String,
      default: ""
    },
    pid: {
      type:String
    }
  },
  components: {
    ImageUpload,
    ImgBanner
  },
  data() {
    return {
      file: "",
      description:
        "The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
    };
  },
  methods: {
    async postPortfolios() {
      //this.img = await this.$refs.imgUpload.imageUpload();
      this.img = await this.$refs.imgUpload.imageUpload();
      alert(this.img);
      FirebaseService.postPortfolio(this.title, this.body, this.img).then(
        () => {
          this.$router.push({
            name: "portfolio"
          });
        }
      );
    },
    async updatePortfolios() {
      //this.img = await this.$refs.imgUpload.imageUpload();
      FirebaseService.updatePortfolio(this.title, this.body, this.img, this.pid).then(
        () => {
          this.$router.push({
            name: "portfolio"
          });
        }
      );
    },
    async getInfo() {
      await FirebaseService.getPortfolioById(this.$route.params.pid)
      .then(res => {
        console.log(res)
        this.title = res[0].title;
        this.body = res[0].body;
        this.pid = res[0].portId;
        if(this.pid != null) {
          this.img = res[0].img;
        }
      })
    },
    // handleFileUpload(img) {
    //   alert("!!!!!!!!");
    //   this.file = img;
    //   console.log(this.$refs.file.files.length);

    //   if (this.$refs.file.files.length == 0) {
    //     // 파일 선택 취소 할 시 섬네일 안보임
    //     document.getElementById("preview").style.display = "none";
    //     return;
    //   }

    //   let reader = new FileReader();
    //   reader.readAsDataURL(this.file);
    //   //로드 한 후
    //   reader.onload = function() {
    //     //로컬 이미지를 보여주기
    //     document.querySelector("#preview").src = reader.result;
    //     document.getElementById("preview").style.display = "block"; // 섬네일 이미지 보임
    //   };
    //   this.randomImage = false;
    // },
  },
  mounted() {
    if (this.authority == "Anonymous") {
      alert("로그인이 필요합니다.");
      this.$router.back(1);
    }
    this.getInfo();
  }
};
</script>

<style scoped>
h1{
  text-align: center;
  margin: 25px 10px;
}
.portfolioWrite {
  border: 3px solid #fff;
  border-radius: 6px;
  margin: 100px 15rem;
  background-color: #fff;
}

@media screen and (min-width: 600px){
  .portfolioWrite{
    margin: 100px 5rem;
  }
  h1{
    font-size: 40px;
  }
  .portfolioCard{
    margin: 5px 30px;
  }
}
@media screen and (min-width: 960px){
  .portfolioWrite{
    margin: 100px 18rem;
  }
  h1{
    font-size: 50px;
  }
  .portfolioCard{
    margin: 5px 50px;
  }
}
@media screen and (min-width: 1904px) {
  .portfolioWrite {
    margin: 100px 30rem;
  }
  h1{
    font-size: 70px;
  }
  .portfolioCard{
    margin: 10px 80px;
  }
}

</style>
