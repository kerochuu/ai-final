<template>
  <div style="margin: 100px 0px;">
    <v-container>
      <div>
        <h1 style="text-align:center; font-size:8vh;">Post Page</h1>
      </div>
      <!-- Post -->
      <v-layout>
        <v-flex sm12>
          <PostList :limits="4" :load-more="true"></PostList>
        </v-flex>
      </v-layout>

      <v-btn v-if="'Anonymous' != isGuest()" class="mx-2" style="margin:0%, 5%, 0%, 80%;" color="info" fab dark small @click="movePostWriter">
                <v-icon dark>edit</v-icon>
       </v-btn>

    </v-container>
  </div>
</template>

<script>
import PostList from "../components/PostList";
import FirebaseService from "../services/FirebaseService";
export default {
  name: "PostPage",
  components: {
    PostList
  },
   methods: {
    isGuest() {
      return this.authority;
    },
    movePostWriter(){
      this.$router.push('/postwrite');
    }
  },
  props: {
    authority: { type: String }
  },
   data() {
    return {
      user:{}
    };
  },
  mounted() {
   
    FirebaseService.getInfo().then(res => {
      this.user = res;
      alert(user);
    });

  }
};
</script>
