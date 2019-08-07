<template>
  <div style="z-index:3">
    <v-toolbar fixed>

      <v-icon @click="moveHome">home</v-icon>

      <v-toolbar-title id="title">TEAM</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn @click="movePost" flat>
          <div class="link-text">POST</div>
        </v-btn>
        <v-btn @click="movePortfolio" flat>
          <div class="link-text">PORTFOLIO</div>
        </v-btn>
        <v-btn v-if="this.authority != 'Anonymous'" @click="movePortfolioWriter" flat>
          <div class="link-text">PORTFOLIOWRITE</div>
        </v-btn>
        <v-btn v-if="this.authority == 'Admin'" @click="moveAdmin" flat>
          <div class="link-text">ADMIN</div>
        </v-btn>
        <v-btn class="link-button" @click="showLogin" v-if="!user" flat>
          <div class="link-text">login</div>
        </v-btn>
        <v-btn class="link-button" @click="logout" v-if="user" flat>
          <div class="link-text">logout</div>
        </v-btn>
      </v-toolbar-items>

      <!-- 모바일 화면 메뉴 -->
      <v-menu class="hidden-md-and-up">
        <v-toolbar-side-icon slot="activator">
          <v-icon>apps</v-icon>
        </v-toolbar-side-icon>

        <v-list class="hbmenu">
          <v-list-tile @click="movePost" ><v-icon size="25" class="mr-2 icon">fa-envelope</v-icon> POST </v-list-tile>
          <v-list-tile  @click="movePortfolio"> <v-icon size="25" class="mr-2 icon">fa-folder-open</v-icon> PORTFOLIO </v-list-tile>
          <v-list-tile v-if="this.authority != 'Anonymous'"  @click="movePortfolioWriter"> <v-icon size="25" class="mr-2 icon">fa-pencil</v-icon> PORTFOLIOWRITE </v-list-tile>
          <v-list-tile v-if="this.authority == 'Admin'"  @click="moveAdmin"> <v-icon size="25" class="mr-2 icon">fa-pencil</v-icon> ADMIN </v-list-tile>
          <v-list-tile v-if="!user" @click="showLogin"> <v-icon size="25" class="mr-2 icon">fa-unlock</v-icon> LOGIN </v-list-tile>
          <v-list-tile v-if="user"  @click="logout"> <v-icon size="25" class="mr-2 icon">fa-lock</v-icon> LOGOUT </v-list-tile>
        </v-list>
      </v-menu>

    </v-toolbar>
    <Modal v-if="showmodal" v-on:update="showLogin"></Modal>
  </div>
</template>

<script>
import Modal from "./Modal";
import FirebaseService from "../services/FirebaseService";

export default {
  name: "Header",
  components: {
    Modal
  },
  data() {
    return {
      showmodal: false,
    };
  },
  methods: {
    showLogin: function() {
      this.showmodal = !this.showmodal;
    },
    logout: function() {
      FirebaseService.signout();
      this.$router.push("/pass");
    },
    moveHome(){
      this.$router.push('/');
    },
    movePost(){
      this.$router.push('/post');
    },
    movePortfolio(){
      this.$router.push('/portfolio');
    },
    movePortfolioWriter(){
      this.$router.push('/portfoliowrite');
    },
    moveAdmin(){
      this.$router.push('/admin');
    }
  },
  props: {
    user: { default: null },
    authority: { type: String }
  },
};
</script>

<style scoped>
.theme--light.v-toolbar {
  background-color: rgba(179,229,252,0.7);
}

.link-text {
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
  font-weight: bolder;
  font-size: 20px;
  color: #01579b ;
}
.hbmenu {
  font-weight: bold;
}
#title {
  font-family: "Montserrat", sans-serif;
  font-weight: bolder;
  font-size: 23px;
  color: #01579b ;
}
.icon {
  color: #01579b ;
}
</style>
