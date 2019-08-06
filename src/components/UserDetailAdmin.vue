<template>
  <v-layout style="margin-top: 500px">
    <v-flex>
      <h5>{{ userData.displayName }}</h5>
      <h5>{{ userData.photoURL }}</h5>
      <h5>{{ userData.phoneNumber }}</h5>
      <h5>{{ userData.uid }}</h5>
      <h5>{{ userData.email }}</h5>
      <h5>{{ userData.authority }}</h5>
      <select v-model="newAuth">
        <option disabled value="">Select User's Authority</option>
        <option>Admin</option>
        <option>Member</option>
        <option>Visitor</option>
      </select>
      <v-btn @click="changeAuthority">권한 변경</v-btn>
    </v-flex>
  </v-layout>
</template>
​

<script>
import FirebaseService from "@/services/FirebaseService";
import { mkdir } from 'fs';

export default {
  name: "UserDetailAdmin",
  data() {
    return {
      uid : "",
      userData : {},
      newAuth : "",
    };
  },
  mounted() {
    this.getuserid();
    this.getuserdata();
  },
  methods: {
    getuserid() {
      this.uid = this.$route.params.uid
    },
    getuserdata() {
      FirebaseService.getUserData(this.uid).then(
        snapshot => {
          this.userData = snapshot.data()
          this.userData.uid = this.uid
          this.userData.created_at = new Date(this.userData.created_at.toDate())
        }
      )
    },
    changeAuthority() {
      if (this.newAuth == "") {
        alert("권한을 설정해주세요.")
        return ;
      }
      FirebaseService.changeAuthority(this.userData, this.newAuth)
      alert("변경 완료!")
      this.$router.push('/pass')
    }
  }
};
</script>
<style>
.mw-700 {
  max-width: 700px;
  margin: auto;
}
</style>
