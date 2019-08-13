<template>
  <router-link :to="{name:'postDetail', params: {pid} }">
    <v-layout py-4 h-100>
      <v-flex row>
        <!-- 글쓴이, 작성일  추가-->
        <!-- <div class="caption">{{formatedDate}}</div> -->
        <h2 id="title" class="color-333 headline font-weight-light">{{title}}</h2>
        <!-- <p id="content" class="mb-1 color-666 font-weight-light subheading">{{body}}</p> -->
      </v-flex>
    </v-layout>
  </router-link>
</template>

<script>
export default {
  name: "Post",
  props: {
    date: { type: Date },
    title: { type: String },
    body: { type: String },
    pid: { type: String }
  },
  computed: {
    formatedDate() {
      return `${this.date.getFullYear()}년 ${this.date.getMonth()}월 ${this.date.getDate()}일`;
    }
  }
};
</script>
<style scoped>
.color-666 {
  color: #666;
}
.color-333 {
  color: #333;
}
.h-100 {
  height: 100%;
}
#title {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
}
#content {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

