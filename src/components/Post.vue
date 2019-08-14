<template>
  <router-link :to="{name:'postDetail', params: {pid} }">
    <v-layout py-4 h-100>
      <v-flex row>
          <h2 class="title">{{title}}</h2>
          <p class="date">{{formatedDate}}</p>
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
.date{
  display: inline;
  float: right;
}
.title {
  display: inline;
  font-weight: 700;
}
a {
  text-decoration: none;
  color: #333;
}
</style>

