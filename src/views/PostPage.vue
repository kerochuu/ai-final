<template>
  <v-container class="postPage">
    <v-layout>
      <v-flex xs12>
        <h1 style="font-size:8vh; text-align:center;">Post Page</h1>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <v-btn
          v-if="'Anonymous' != isGuest()"
          class="postWriteBtn"
          color="info"
          @click="movePostWriter"
        >
          <v-icon dark>edit</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12 class="posts">
        <PostList :limits="4" :load-more="true"></PostList>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PostList from "../components/PostList";
import FirebaseService from "../services/FirebaseService";
export default {
  name: "PostPage",
  components: {
    PostList
  },
  methods: {
    isGuest() {
      return this.authority;
    },
    movePostWriter() {
      this.$router.push("/postwrite");
    }
  },
  props: {
    authority: { type: String }
  },
  data() {
    return {
      user: {}
    };
  }
};
</script>

<style scoped>
.postWriteBtn {
  float: right;
  margin: 20px 0;
}
.postPage {
  margin: 100px auto;
}
button {
  border-radius: 10px;
}
@media screen and (min-width: 600px) {
  .postPage {
    margin: 100px auto;
  }
}

@media screen and (min-width: 960px) {
  .postPage {
    margin: 100px auto;
  }
}

@media screen and (min-width: 1264px) {
  .postPage {
    margin: 100px auto;
  }
}
</style>