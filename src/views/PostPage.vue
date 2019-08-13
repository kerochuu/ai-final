<template>
<div class="postPage">
  <div>
    
  </div>
</div>

  <div style="margin: 100px 0px;">
    <v-container>
      <div>
        <h1 style="text-align:center; font-size:8vh;">Post Page</h1>
      </div>

      <v-flex xs12 text-xs-center>
        <v-btn
          v-if="'Anonymous' != isGuest()"
          class="postWriteBtn"
          color="success"
          fab
          dark
          small
          @click="movePostWriter"
        >
          <v-icon dark>edit</v-icon>
        </v-btn>
      </v-flex>
      <!-- Post -->
      <v-layout>
        <v-flex sm12>
          <PostList :limits="4" :load-more="true"></PostList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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
  },
  mounted() {
    FirebaseService.getInfo().then(res => {
      this.user = res;
      alert(user);
    });
  }
};
</script>

<style scoped>
.postPage{
  margin: 100px 20px;
}
@media screen and (min-width: 600px){
  .postPage{
    margin: 100px 40px;
  }
}

@media screen and (min-width: 960px){
  .postPage{
    margin: 100px 100px;
  }
}

@media screen and (min-width: 1264px){
  .postPage{
    margin: 100px 200px; 
  }
}
</style>