<template>
  <div id="Portfolio">
    <v-container>
      <div>
        <h1 style="text-align:center; font-size:8vh;">Portfolio Page</h1>
      </div>
      <!-- Portfolio -->
      <v-layout>
        <v-flex xs12>
          <PortfolioList :limits="4" :load-more="true"></PortfolioList>
        </v-flex>
      </v-layout>
       <v-btn v-if="'Anonymous' != isGuest()" class="mx-2" style="margin:0%, 5%, 0%, 80%;" color="info" fab dark small @click="movePortfolioWriter">
                <v-icon dark>edit</v-icon>
       </v-btn>

      
    </v-container>
  </div>
</template>

<script>
import PortfolioList from "../components/PortfolioList";
import FirebaseService from "../services/FirebaseService";

export default {
  name: "PortfolioPage",
  components: {
    PortfolioList
  },
  props: {
    authority: {
      type: String
    }
  },
  methods: {
    isGuest() {
      return this.authority;
    },
    movePortfolioWriter(){
      this.$router.push('/portfoliowrite');
    }
  },

   data() {
    return {
      user:{}
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
#Portfolio{
  margin: 100px 0px;
}
</style>
