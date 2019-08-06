<template>
  <div>
    <div id="portfolioHeader">
      <h1 style="font-size:8vh; text-align: center;">Write Your Portfolio</h1>
    </div>
    <div id="portfolioWrite">
      <!-- <v-layout wrap id="writeCard"> -->
      <div id="writeCard">
        <v-flex>
          <v-text-field
            label="Portfolio title"
            outline
            v-model="title"
          ></v-text-field>
        </v-flex>

        <v-flex>
          <v-textarea
            auto-grow="true"
            outline
            name="Portfolio Description"
            label="Portfolio Description"
            v-model="body"
            @input="update"
          ></v-textarea>
        </v-flex>

        <v-layout wrap>
          <v-flex xs6>
            <div v-html="compiledMarkdown"></div>
          <!--
          </v-flex>
          <v-flex xs6>
            -->
            <ImageUpload ref="imgUpload" />
          </v-flex>
        </v-layout>

        <v-flex xs12 text-xs-center round my-5>
          <v-btn color="info" dark v-on:click="postPortfolios">
            <v-icon size="25" class="mr-2">fa-plus</v-icon>작성하기
          </v-btn>
        </v-flex>
      </div>
      <!-- </v-layout> -->
    </div>
  </div>
</template>

<script>
import ImageUpload from "@/components/ImageUpload";
import FirebaseService from "@/services/FirebaseService";
import ImgBanner from "../components/ImgBanner";
import { Stats } from 'fs';
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
      this.img = await this.$refs.imgUpload.imageUpload();
      FirebaseService.postPortfolio(this.title, this.body, this.img)
      .then(() => {
        alert("포트폴리오가 작성되었습니다.")
        this.$router.push({
          name: "portfolio"
        }); 
      })
    }
  },
  mounted() {
    if (this.authority == 'Anonymous') {
      alert('로그인이 필요합니다.')
      this.$router.back(1)
    }
  }
};
</script>

<style>
#portfolioWrite {
  margin: 30px 200px;
  /*background-color: #f0f0f0;*/
}
#writeCard {
  padding: 40px 30px;
}
#portfolioHeader {
  margin-top: 100px;
}

@media screen and (max-width: 760px) {
  #portfolioWrite {
    margin: 30px 100px;
  }
  #writeCard {
    padding: 20px;
  }
}
@media screen and (max-width: 600px) {
  #portfolioWrite {
    margin: 20px 50px;
  }
  #writeCard {
    padding: 40px 20px;
  }
}
</style>
