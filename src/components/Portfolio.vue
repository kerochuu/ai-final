<template>
  <v-card id="portfolioCard">
    <router-link :to="{name:'portfolioDetail', params: {pid} }">
      <v-img :src="imgSrc" height="200px">
        <p class="portfolioTitle">
        {{title}}
        </p>
        <p onmouseover="hovert()" onmouseout="hoverf()" v-if="showTitle" class="portfoiloTitle">{{title}}</p> 
      </v-img>
    </router-link>
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

.portfolioTitle {
  visibility: visible;
  text-align: center;
  align-items: center;
  font-family: "Montserrat", sans-serif !important;
  font-weight: bold;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.portfolioTitle:hover {
  visibility: visible;
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
