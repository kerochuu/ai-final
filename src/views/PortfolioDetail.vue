<template>
  <v-container>
    <v-layout class="portfolio" wrap row>
      <!-- photo and contents -->
      <v-flex xs12 lg6 class="img-box">
        <div class="Content">
          <img :src="portfolio.img" alt="Portfolio Image" />
        </div>
      </v-flex>
      <v-flex xs12 lg6 class="information">
        <h1>{{portfolio.title}}</h1>
        <hr style="margin-top:1px;" />
        <br />
        <p id="createdAt">{{portfolio.created_at}}</p>
        <p style="text-align: justify;">{{portfolio.body}}</p>
      </v-flex>

      <div class="information">
        <v-text-field label="댓글입력" placeholder="input comment" outline v-model="comment"></v-text-field>
        <v-btn color="info" dark v-on:click="addComment">
          <v-icon size="25" class="mr-2">fa-plus</v-icon>댓글등록
        </v-btn>
      </div>

      <!-- <v-btn class="mx-2" color="info" fab dark small v-on:click="isAdmin()">
      <v-icon dark>테스트용</v-icon>
      </v-btn>-->
      <div class="information" style="width: 70%;">
        <h3>댓글목록</h3>
        <hr style="margin-top:1px;" />

        <v-flex style="margin-top:2px; width: 90%;" v-for="data in comments" :key="data.uid">
          <template v-if="'Admin' == isAdmin()">
            {{data.uid}} ㅡ {{data.body}}
            <v-btn
              class="mx-2"
              color="info"
              fab
              dark
              small
              v-on:click="updateComment(data.body, data.commentId, data.password)"
            >
              <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              color="info"
              fab
              dark
              small
              v-on:click="deleteCommentByAdmin(data.commentId)"
            >
              <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
          <template v-else-if="data.uid == isPossible()">
            {{data.uid}} ㅡ {{data.body}}
            <v-btn
              class="mx-2"
              color="info"
              fab
              dark
              small
              v-on:click="updateComment(data.body, data.commentId, data.password)"
            >
              <v-icon dark>edit</v-icon>
            </v-btn>
            <v-btn
              class="mx-2"
              color="info"
              fab
              dark
              small
              v-on:click="deleteComment(data.commentId, data.password)"
            >
              <v-icon dark>remove</v-icon>
            </v-btn>
          </template>
          <template v-else>{{data.uid}} ㅡ {{data.body}}</template>
        </v-flex>
      </div>

      <v-flex xs12 text-xs-center round my-5>
        <v-btn color="info" dark v-on:click="updateProfileImage">
          <v-icon size="25" class="mr-2">fa-plus</v-icon>변경
        </v-btn>
        <v-btn color="info" dark v-on:click="deleteProfile">
          <v-icon size="25" class="mr-2">fa-minus</v-icon>삭제
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
      type: String
    },
    authority: {
      type: String
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
    isPossible() {
      var userId = FirebaseService.getUserInfo();
      if(userId == null) {
        return 'guest';
      } else {
        return  userId.email;
      }
    },
    isAdmin() {
      return this.authority;
    },
     
    addComment: function() {
      const user = FirebaseService.getUserInfo();
      const uid = this.$route.params.uid;

      FirebaseService.addComment(this.$route.params.pid, this.comment);
      this.$router.push("/pass");
    },
    deleteComment:function(cid, pw) {
      alert(cid);
      FirebaseService.deleteComment(this.$route.params.pid, cid, pw);
      this.$router.push('/pass');
      
    },
    deleteCommentByAdmin:function(cid) {
      alert(cid);
      FirebaseService.deleteCommentByAdmin(this.$route.params.pid, cid);
      this.$router.push('/pass');
    },
    updateComment:function(body, cid, pw) {
      
      FirebaseService.updateComment(this.$route.params.pid, body, cid, pw);
      this.$router.push('/pass');
      
    
    },
    getUidForId: function(uid) {
      const user = FirebaseService.getUidForId(uid);
      return this.user;
    },
    updateProfileImage: function() {
      const user = FirebaseService.getUserInfo();
      if (user == null) {
        alert("로그인이 필요합니다.");
        return;
      }
      FirebaseService.postImage(this.portfolio.img);
      alert("변경완료!");
    },
    deleteProfile: function() {
      const user = FirebaseService.getUserInfo();
      if (user == null) {
        alert("로그인이 필요합니다.");
        return;
      }

      FirebaseService.deletePost(this.$route.params.pid);
      alert("삭제완료!");
      this.$router.push({
        name: "portfolio"
      });
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
button {
  border-radius: 3px;
}
.portfolio {
  background-color: #fff;
  border: 3px solid #fff;
  border-radius: 6px;
  margin: 100px 2rem;
}

.img-box {
  display: flex;
  align-items: center;
  padding: 40px 10px;
}

.Content {
  width: 80%;
  margin: 0 auto;
  height: auto;
}
.Content img {
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
}

.containerBox {
  margin: 10vh 10vw 0 10vw;
}

.comment {
  display: flex;
  padding: 5%;
}
.comments {
  padding: 5%;
}

.commentBtn {
  margin: 0;
  margin-left: 20px;
  height: 54px;
}
.information {
  padding: 60px;
}
.commentInput {
  width: 80%;
}
@media screen and (min-width: 1264px) {
  .comment {
    padding: 5% 20% 1%;
  }
  .comments {
    padding: 1% 20%;
  }
  .portfolio {
    margin: 100px 20rem;
  }
}
</style>
