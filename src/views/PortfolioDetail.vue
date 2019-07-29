<template>
<v-container>
  <v-layout wrap row>
    <img id="portfolioImg" :src="portfolio.img">
    <div class="information">
      <h1>{{portfolio.title}}</h1>
      <hr style="margin-top:1px;">
      <h2>{{portfolio.created_at}}</h2>
      <p>{{portfolio.body}}</p>
    </div>
    <div class="information">
      <h3>댓글목록</h3>
      <hr style="margin-top:1px;">

    </div>

  <div class="information">
    <v-text-field
      label="댓글입력"
      placeholder="input comment"
      outline
      v-model="comment"
    ></v-text-field>
    <v-btn color="info" dark v-on:click="updateProfileComment">
      <v-icon size="25" class="mr-2">fa-plus</v-icon>
      댓글등록
    </v-btn>
  </div>
    <v-flex xs12 text-xs-center round my-5>
      <v-btn color="info" dark v-on:click="updateProfileImage">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>
        변경
      </v-btn>
      <v-btn color="info" dark v-on:click="deleteProfile">
        <v-icon size="25" class="mr-2">fa-minus</v-icon>
        삭제
      </v-btn>
    </v-flex>
  </v-layout>
</v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PortfolioDetail",
  props: {
    comment: {
      type: String,

    }
  },
  data() {
    return {
      portfolio: {},
      pid: ""
    };
  },

  methods: {
    getInfo: function() {
      this.pid = this.$route.params.pid;
    },
    updateProfileComment:function() {
      const user = FirebaseService.getUserInfo();
      FirebaseService.updateComment(this.$route.params.pid, user);
      alert("댓글등록!")
    },
    updateProfileImage: function() {
      const user = FirebaseService.getUserInfo();
      if (user == null) {
        alert("로그인이 필요합니다.")
        return
      }
      FirebaseService.postImage(this.portfolio.img);
      console.log("이미지 업데이트!")
      alert("변경완료!")
    },
    deleteProfile: function() {
      const user = FirebaseService.getUserInfo();
      if (user == null) {
        alert("로그인이 필요합니다.")
        return
      }

      FirebaseService.deletePost(this.$route.params.pid);
      console.log("삭제완료")
      alert("삭제완료!")
      this.$router.push({
        name: 'portfolio'
      })
    }
  },
  mounted() {
    this.getInfo();
    FirebaseService.getPortfolioById(this.pid).then(res => {
      this.portfolio = res[0];
    });
    console.log(this.created_at);
  }
};
</script>

<style scoped>
#portfolioImg {
  display: block;
  margin: 10vh 15%;
  width: 70%;
  height: 50%;
}

.containerBox {
  margin: 10vh 10vw 0 10vw;
}

.information {
  font-family: 'Montserrat', sans-serif;
  margin: 0 15%;

}
</style>
