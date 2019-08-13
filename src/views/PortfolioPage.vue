<!--navbar를 통해 들어간 portfolioPage-->
<template>
  <div id="Portfolio">
    <v-container>
      <div>
        <h1 style="text-align:center; font-size:8vh;">Portfolio Page</h1>
      </div>
      <v-btn v-if="'Anonymous' != isGuest()" class="writeBtn" color="info" @click="movePortfolioWriter">
        <v-icon dark>edit</v-icon>
      </v-btn>
      <!-- Portfolio -->
      <v-layout>
        <v-flex xs12>
          <PortfolioCard :limits="4" :load-more="true"></PortfolioCard>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PortfolioCard from "../components/PortfolioCard";
import FirebaseService from "../services/FirebaseService";

export default {
  name: "PortfolioPage",
  components: {
    PortfolioCard
  },
  props: {
    authority: {
      type: String
    }
  },
  methods: {
<<<<<<< HEAD
    isGuest() {
      return this.authority;
=======
    guestOrUser() {
      var user = getUserInfo();
      if (user == null) {
        return false;
      } else {
        return true;
      }
>>>>>>> origin/portfoiloCard
    },
    movePortfolioWriter() {
      this.$router.push("/portfoliowrite");
    }
  },
<<<<<<< HEAD

   data() {
=======
  props: {
    authority: { type: String }
  },
  data() {
>>>>>>> origin/portfoiloCard
    return {
      user: {}
    };
  },
  mounted() {
    FirebaseService.getInfo().then(res => {
      this.user = res;
      alert("user!! = " + user);
    });
  }
};
</script>

<style>
#Portfolio {
  margin: 100px 0px;
}
.writeBtn {
  float: right;
  border-radius: 10px;
  width: 20px;
}
</style>
