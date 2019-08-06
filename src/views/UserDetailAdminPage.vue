<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
        <h4>userData</h4>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex>
          <UserDetailAdmin></UserDetailAdmin>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
​
​
<script>
import FirebaseService from '@/services/FirebaseService';
import UserDetailAdmin from '@/components/UserDetailAdmin';

export default {
  name: "UserDetailAdminPage",
  components: {
    UserDetailAdmin
  },
  data() {
    return {
      userData : {},
      uid : ""
    };
  },
  mounted() {
    this.getuserid();
    console.log(" id.. ")
    this.getuserdata();
    console.log(" data...? ")
  },
  methods: {
    getuserid() {
      this.uid = this.$route.params.uid
    },
    getuserdata() {
      this.userData = FirebaseService.getUserData(this.uid)
      console.log(this.userData)
    }
  }
}
</script>