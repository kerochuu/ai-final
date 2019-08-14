<template>
  <v-layout row wrap>
    <v-flex
      v-for="i in posts.length > limits ? limits : posts.length"
      :class="'xs' + 12 / column "
      px-3
    >
      <div class="postList">
        <Post
          :date="posts[i - 1].created_at"
          :title="posts[i - 1].title"
          :body="posts[i - 1].body"
          :pid="posts[i-1].pid"
        />
      </div>
    </v-flex>
    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="info" dark v-on:click="loadMorePosts">
        <v-icon size="25" class="mr-2">fa-plus</v-icon>더 보기
      </v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import Post from "@/components/Post";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "PostList",
  props: {
    column: { type: Number, default: 1 },
    limits: { type: Number, default: 3 },
    loadMore: { type: Boolean, default: false }
  },
  data() {
    return {
      posts: []
    };
  },
  components: {
    Post
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    async getPosts() {
      this.posts = await FirebaseService.getPosts();
    },
    loadMorePosts() {
      this.limits += 2;
    }
  }
};
</script>
<style scoped>

.postList {

  background-color: #f0f0f0;
  border-radius: 5px;
  margin: 20px 70px;
  padding: 10px 30px;
}
.postList:hover {
  filter: brightness(80%);
}
</style>
