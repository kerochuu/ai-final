<template>
  <v-card id="userCard">
    <router-link :to="{name:'userDetailAdmin', params: {uid}}">
        <v-card-title primary-title>
        <div>
            <div id="title" class="headline">{{number}} : {{displayName}}</div>
            <span id="content" class="grey--text">E-mail : {{email}} / Authority : {{authority}}</span>
        </div>
        </v-card-title>
    </router-link>
  </v-card>
</template>
​
<script>
export default {
  name: "User",
  props: {
    number : { type : Number },
    displayName : { type : String },
    email : { type : String },
    photoURL : { type : String },
    phoneNumber : { type : String },
    authority : { type : String },
    created_at : { type : Date },
    uid : { type : String }
  },
  data() {
    return {
      //
    };
  }
};
</script>
​
<style scoped>
#userCard{
  border-radius: 4px;
  border: 5px solid #2D0E0E;
}
</style>