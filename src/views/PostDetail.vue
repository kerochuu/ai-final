<template>
  <v-container>
    <v-layout class="post" wrap row>
      
      <v-flex xs12 lg6 class="information" style="padding: 60px;">
        <h1>{{post.title}}</h1>
        <hr style="margin-top:1px;" />
        <br />
        <p>{{post.created_at}}</p>
        <p class="contents" style="text-align: justify;">{{post.body}}</p>
      </v-flex>

      <!-- comments -->
      <v-flex xs12 lg6 class="comments">
        <h1 style="text-align:center; margin-bottom: 20px; font-size:26px;">Write what you think</h1>
        <div class="commentInput">
          <v-text-field label="comment" outline v-model="comment"></v-text-field>
          <v-btn id="commentInputBtn" color="info" dark v-on:click="addComment">
            <v-icon size="25">fa-plus</v-icon>
          </v-btn>
        </div>

        <!-- 댓글 수정 아이콘 수정할 것 -->
        <div class="commentList">
          <h1 style="text-align:center;">Comments</h1>
          <hr style="margin:10px 0 15px;" />

          <v-flex style="margin-top:20px; width: 100%;" v-for="data in comments" :key="data.uid">
            <div v-if="'Admin' == isAdmin()">
              <div class="content">
                <div class="data_uid">{{data.uid}}</div>
                <v-layout>
                  <span class="data_body">{{data.body }}</span>
                  <v-flex class="editBtn">
                    <v-icon
                      color="green"
                      size="19px"
                      v-on:click="updateComment(data.body, data.commentId, data.password)"
                    >edit</v-icon>
                    <v-icon
                      color="red"
                      size="19px"
                      v-on:click="deleteCommentByAdmin(data.commentId)"
                    >delete</v-icon>
                  </v-flex>
                </v-layout>
              </div>
            </div>

            <div v-else-if="data.uid == isPossible()">
              <div class="content">
                <div class="data_uid">{{data.uid}}</div>
                <v-layout>
                  <span class="data_body">{{data.body}}</span>
                  <v-flex class="editBtn">
                    <v-icon
                      color="green"
                      size="19px"
                      v-on:click="updateComment(data.body, data.commentId, data.password)"
                    >edit</v-icon>
                    <v-icon
                      color="red"
                      size="19px"
                      v-on:click="deleteCommentByAdmin(data.commentId)"
                    >delete</v-icon>
                  </v-flex>
                </v-layout>
              </div>
            </div>
            <div class="commentInfo" v-else>
              <div class="content">
                <div class="data_uid">{{data.uid}}</div>
                <v-layout>
                  <span class="data_body">{{data.body}}</span>
                </v-layout>
              </div>
            </div>
          </v-flex>
        </div>
      </v-flex>

      <v-flex v-if="'Anonymous' != isGuest()" xs12 text-xs-center round my-5>
        <v-btn color="success" dark v-on:click="updatePost">
          <v-icon size="25" class="mr-2">fa-plus</v-icon>변경
        </v-btn>
        <v-btn color="red" dark v-on:click="deletePost">
          <v-icon size="25" class="mr-2">fa-minus</v-icon>삭제
        </v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";
export default {
  name: "PostDetail",
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
      post: {},
      comments: []
    };
  },

  methods: {
    getInfo: function() {
      this.pid = this.$route.params.pid;
    },
    isPossible() {
      var userId = FirebaseService.getUserInfo();
      if (userId == null) {
        return "guest";
      } else {
        return userId.email;
      }
    },
    isAdmin() {
      return this.authority;
    },
    isGuest() {
      return this.authority;
    },
    addComment: function() {
      const user = FirebaseService.getUserInfo();
      const uid = this.$route.params.uid;

      FirebaseService.addPostComment(this.$route.params.pid, this.comment);
      this.$router.push("/pass");
    },
    deleteComment: function(cid, pw) {
      alert(cid);
      FirebaseService.deletePostComment(this.$route.params.pid, cid, pw);
      this.$router.push("/pass");

      // FirebaseService.deleteComment(this.$route.params.);
      //this.$router.push('/pass');
    },
    deleteCommentByAdmin: function(cid) {
      alert(cid);
      FirebaseService.deletePostCommentByAdmin(this.$route.params.pid, cid);
      this.$router.push("/pass");
    },
    updateComment: function(body, cid, pw) {
      FirebaseService.updatePostComment(this.$route.params.pid, body, cid, pw);
      this.$router.push("/pass");

      // FirebaseService.deleteComment(this.$route.params.);
      //this.$router.push('/pass');
    },
    getUidForId: function(uid) {
      const user = FirebaseService.getUidForId(uid);
      return this.user;
    },
    updatePost: function() {
      const user = FirebaseService.getUserInfo();
      if (user == null) {
        alert("로그인이 필요합니다.");
        return;
      }
      this.$router.push({
        name: "postUpdate",
        params: this.$route.params.pid
      });
    },

    deletePost: function() {
      const user = FirebaseService.getUserInfo();
      if (user == null) {
        alert("로그인이 필요합니다.");
        return;
      }

      FirebaseService.deletePost(this.$route.params.pid);
      alert("삭제완료!");
      this.$router.push({
        name: "post"
      });
    }
  },
  mounted() {
    this.getInfo();
    FirebaseService.getPostById(this.pid).then(res => {
      this.post = res[0];
    });
    FirebaseService.getPostComment(this.pid).then(res => {
      this.comments = res;
    });
  }
};
</script>

<style scoped>
h1 {
  font-size: 30px;
}
​ button {
  border-radius: 5px;
}
.post {
  background-color: #fff;
  border: 3px solid #fff;
  border-radius: 6px;
  margin: 100px 2rem;
}
​ .img-box {
  display: flex;
  align-items: center;
  padding: 40px 10px;
}
​ .Content {
  width: 80%;
  margin: 0 auto;
  height: auto;
}
.Content img {
  width: 100%;
  object-fit: cover;
  border-radius: 5px;
  /* padding: 20px; */
}
​ .containerBox {
  margin: 10vh 10vw 0 10vw;
}
​.information {
  padding: 60px;
}
​#commentInputBtn {
  height: 57px;
  width: 40px;
  margin-top: -1px;
  border-radius: 5px;
}
.commentList {
  margin: 40px 70px;
}
.commentInfo {
  display: inline-block;
}
.contents {
  font-size: 20px;
  font-weight: border;
}
.data_uid {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 2px;
}
.data_body {
  font-size: 19px;
}
.userComment {
  margin-bottom: 10px;
  text-align: justify;
  max-width: 100%;
}

.comments{
  padding: 20px 10px;
}
​.commentInput {
  display: inline-block;
  width: 80%;
}
.editBtn{
  margin-left: 3px;
}
@media screen and (min-width: 1904px) {
  .post {
    margin: 100px 15rem;
  }
  .commentInput {
    width: 50%;
    margin-left: 20%;
  }
}
@media screen and (min-width: 1264px){
  .commentInput{
    width: 60%;
    margin-left: 18%;
  }
}
@media screen and (min-width: 960px) {
  .commentInput {
    width: 70%;
    margin-left: 15%;
  }
}
</style>
