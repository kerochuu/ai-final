<template>
  <v-card id="portfolioCard">
    <router-link :to="{name:'portfolioDetail', params: {pid} }">
      <v-img :src="imgSrc" height="200px">
        <p onmouseover="hovert()" onmouseout="hoverf()" v-if="showTitle" class="portfoiloTitle">{{title}}</p> 
      </v-img>
    </router-link>

    <!-- <v-card-title primary-title>
      <div id="contents">
        <div id="title" class="headline">{{title}}</div>
        <span id="content" class="grey--text">{{body}}</span>
      </div>
      <div id="hoverContents">
        <button>자세히보려면 이미지를 클릭하세요.</button>
      </div>
    </v-card-title> -->
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
      showTitle: false
    };
  },
  methods: {
    hovert() {
      this.showTitle = true
    },
    hoberf() {
      this.showTitle = false
    }
  }
};
</script>

<style scoped>
#portfolioCard {
  border-radius: 4px;
  border: 3px solid #F2ECE5;
}

.portfoiloTitle {
  display: block;
  text-align: center;
  align-items: center;
  font-family: "Montserrat", sans-serif !important;
  font-weight: bold;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.portfoiloTitle:hover{
  display: block !important;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  text-align: center;
  color: #ffff;
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
