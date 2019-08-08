<template>
  <div style="margin: 100px 0px;">
    <v-container>
      <div>
        <h1 style="text-align:center; font-size:8vh;">Post Page</h1>
      </div>
      <!-- Post -->
      <v-layout>
        <v-flex sm12>
          <PostList :limits="3" :load-more="true"></PostList>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import ImgBanner from "../components/ImgBanner";
import PostList from "../components/PostList";

export default {
  name: "PostPage",
  components: {
    ImgBanner,
    PostList
  }
};
</script>
