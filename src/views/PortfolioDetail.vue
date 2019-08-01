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
    <v-text-field
      label="댓글입력"
      placeholder="input comment"
      outline
      v-model="comment"
    ></v-text-field>
    <v-btn color="info" dark v-on:click="addComment">
      <v-icon size="25" class="mr-2">fa-plus</v-icon>
      댓글등록
    </v-btn>
  </div>

  <div class="information" style="width: 70%;">
      <h3>댓글목록</h3>
      <hr style="margin-top:1px;">
      <v-flex style="margin-top:2px; width: 90%;" v-for="data in comments" :key="data.uid"> 
        {{data.uid}} ㅡ {{data.body}}
      </v-flex>

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
      default: "# comment"
    }
  },
  data() {
    return {
      portfolio: {},
      comments: []
    };
  },

  methods: {
    getInfo: function() {
      this.pid = this.$route.params.pid;
    },
    addComment:function() {
      const user = FirebaseService.getUserInfo();
      const uid = this.$route.params.uid;
      
      FirebaseService.addComment(this.$route.params.pid, this.comment);
      this.$router.push('/pass');
    },
    getUidForId:function(uid) {
      const user = FirebaseService.getUidForId(uid);
      return this.user;

    },
    updateProfileImage: function() {
      const user = FirebaseService.getUserInfo();
      if (user == null) {
        alert("로그인이 필요합니다.")
        return
      }
      FirebaseService.postImage(this.portfolio.img);

      alert("변경완료!")
    },
    deleteProfile: function() {
      const user = FirebaseService.getUserInfo();
      if (user == null) {
        alert("로그인이 필요합니다.")
        return
      }

      FirebaseService.deletePost(this.$route.params.pid);

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
    FirebaseService.getPortfolioComment(this.pid).then(res => {
      this.comments = res;
    });

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
