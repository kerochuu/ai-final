<template>
  <v-app>
    <Header :user="user" />
    <Scroll />
    <v-content id="body">
      <router-view :user="user" />
    </v-content>
    <Footer />
  </v-app>
</template>

<script>
import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Scroll from "./components/Scroll";
import FirebaseService from "./services/FirebaseService";

if (
  !window.chrome ||
  navigator.userAgent.indexOf("Edge") !== -1 ||
  navigator.userAgent.indexOf("OPR") !== -1 ||
  navigator.userAgent.indexOf("Version") !== -1
) {
  alert("이 사이트는 크롬에 최적화 되어 있읍니다. 크롬을 깔아주세욥");
}

export default {
  name: "App",
  store,
  data() {
    return {
      user: ""
    };
  },
  components: {
    Header,
    Footer,
    Scroll
  },
  mounted() {
    this.$router.push("/pass");
  },
  watch: {
    $route() {
      this.user = FirebaseService.getUserInfo();
      if (this.user) {
        var id = this.user.uid;
      } else {
        var id = "unauthenticated";
      }
      FirebaseService.addPageLog(id);
    }
  }
};
</script>

<style>
#body {
  background-image: linear-gradient(to bottom right, #e39b82, #fef3cb);
}
div {
  font-family: "Montserrat", sans-serif;
}
@media screen and(max-width:48px) {
  #content {
    margin-top: 48px;
  }
}

@media screen and(max-width:56px) {
  #content {
    margin-top: 56px;
  }
}
@media screen and(max-width:1092) {
  #content {
    margin-top: 64px;
  }
}
</style>
