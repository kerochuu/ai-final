<template>
  <v-card height="100%">
    <v-toolbar color="blue" flat>
      <v-toolbar-title>User</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(item, index) in items">
​
        <v-divider v-if="item.divider" :inset="item.inset" :key="index"></v-divider>
        <v-list-tile v-else :key="item.title" avatar>
          <v-list-tile-avatar>
            <img :src="item.avatar" />
          </v-list-tile-avatar>
​

          <v-layout>
            <v-flex xs8>
              <v-list-tile-content>
                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
              </v-list-tile-content>
            </v-flex>
          </v-layout>
          
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>
​
<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "UserList",
  data() {
    return {
      users: [],
      items: []
    };
  },
  mounted() {
    this.getUsers()
        .then(() => {
            this.loadUsers()
        })
  },
  methods: {
    async getUsers() {
      this.users = await FirebaseService.getAllUserData()
    },
    loadUsers() {
      const length = this.users.length;
      for(let i = 0; i < length; i++) {
        this.items.push({
          avatar: this.users[i].photoURL,
          title: this.users[i].displayName,
          subtitle: this.users[i].authority + ' - ' + this.users[i].email
        }),
        this.items.push({
          divider: true, inset: true
        })
      }
      this.items.pop()
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