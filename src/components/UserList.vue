<template>
  <v-layout mt-5 wrap>
    <v-flex xs12 v-for="i in this.indexs">
      <User
        class="ma-3"
        :number="i"
        :displayName="users[i - 1].displayName"
        :email="users[i - 1].email"
        :photoURL="users[i - 1].photoURL"
        :phoneNumber="users[i-1].phoneNumber"
        :authority="users[i-1].authority"
        :created_at="users[i-1].created_at"
      ></User>
    </v-flex>

    <v-flex xs12 text-xs-center round my-5>
      <v-btn color="info" dark v-on:click="loadUsers(item, limits)" v-for="item in this.range">
        {{item}}
      </v-btn>
    </v-flex>
    <v-flex>
        <v-btn @click="consoleUser">버튼</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import User from "@/components/User";
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "UserList",
  props : {
      limits : { Type : Number , default : 10 }
  },
  data() {
    return {
      users: [],
      range: [],
      indexs: []
    };
  },
  components: {
    User
  },
  mounted() {
    this.getUsers()
        .then(() => {
            this.loadUsers(1, this.limits)
        })
  },
  methods: {
    async getUsers() {
      this.users = await FirebaseService.getAllUserData()
    },
    loadUsers(num, limit) {
        this.range = []
        this.indexs = []
        const stdNums = []
        for (let i = 0; i < limit; i++) {
            stdNums.push(i)
        }
        stdNums.forEach((stdNum) => {
            if (this.users.length - (num - 1) * limit - stdNum > 0) {
                this.indexs.push(this.users.length - (num - 1) * limit - stdNum)
            }
        })
        const maximum = parseInt(this.users.length / limit) + 1
        for (let j = 1; j <= maximum; j++) {
            this.range.push(j)
        }
    },
    consoleUser() {
        console.log(this.users)
        console.log(this.indexs)
        console.log(this.range)
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
