<template>
  <v-card id="portfolioCard">
    <router-link :to="{name:'portfolioDetail', params: {pid} }">
      <v-img :src="imgSrc" height="200px"></v-img>
    </router-link>

    <v-card-title primary-title>
      <div id="contents">
        <div id="title" class="headline">{{title}}</div>
        <span id="content" class="grey--text">{{body}}</span>
      </div>
      <div id="hoverContents">
        <button>자세히보려면 이미지를 클릭하세요.</button>
      </div>
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: "Portfolio",
  props: {
    date: { type: String },
    title: { type: String },
    body: { type: String },
    imgSrc: { type: String },
    pid: { type: String }
  },
  data() {
    return {
      //
    };
  }
};
</script>

<style scoped>
#portfolioCard {
  border-radius: 4px;
  border: 5px solid #2d0e0e;
}
#hoverContents {
  display: none;
}
#hoverContents:hover {
  display: block !important;
}

#title {
  font-family: "Montserrat", sans-serif !important;
  font-weight: bold;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#content {
  font-family: "Montserrat", sans-serif !important;
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
