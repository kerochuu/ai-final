<!--navbar를 통해 들어간 portfoilopage에 표시될 포트폴리오 카드들 -->
<template>
  <v-container>
      <v-card class="portfolioCard">
        <router-link :to="{name:'portfolioDetail', params: {pid} }">
          <v-img :src="imgSrc" height="200px"></v-img>
        </router-link>
        <v-card-title primary-title>
          <div>
            <div id="title" class="headline">{{title}}</div>
            <span id="content" class="grey--text">{{body}}</span>
          </div>
        </v-card-title>
      </v-card>
    </v-container>
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
div{
  font-family: 'Do Hyeon', sans-serif !important;
}
.portfolioCard {
  border-radius: 4px;
  border: 5px solid #F2ECE5;
}
.portfolioCard:hover{
  transform: scale(1.2, 1.2);
}
#title {
  font-weight: bold;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#content {
  font-size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
