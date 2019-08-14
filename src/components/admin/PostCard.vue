<template>
  <v-card height="100%">
    <v-toolbar color="orange" flat>
      <v-toolbar-title>Posts 최근 게시물</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(item, index) in parsedData">
        <v-divider v-if="item.divider && index !== parsedData.length - 1" :inset="item.inset" :key="index"></v-divider>

        <v-list-tile v-else-if="item.avatar" :key="item.title" avatar>
          <v-list-tile-avatar>
            <img :src="item.avatar" />
          </v-list-tile-avatar>
          
          <v-list-tile-content>
            <v-list-tile-title v-html="item.title"></v-list-tile-title>
            <v-list-tile-sub-title v-html="item.body"></v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
</template>

<script>
import FirebaseService from '@/services/FirebaseService';
import guest from '../../assets/icon/guest.png'

export default {
  name: "PostCard",
  mounted() {
    this.getPosts().then(() => {
      this.loadPosts()
    })
  },
  methods: {
    async getPosts() {
      this.posts = await FirebaseService.getPosts()
    },
    async loadPosts() {
      const length = this.posts.length > 3 ? 3 : this.posts.length;
      for (let i = 0; i < length; i++) {
        await FirebaseService.getUserDatabyQuery('email', this.posts[i].uid)
        .then((docSnapshots) => {
          docSnapshots.docs.map((doc) => {
            let data = doc.data()
            this.parsedData.push({
              avatar: data.photoURL === "" ? guest : data.photoURL,
              title: this.posts[i].title,
              body: "<span class='text--primary'>" + data.email + "</span> - " + this.posts[i].body
            })
            this.parsedData.push({ divider: true, inset: true })
          })
        })
      }
    }
  },
  data() {
    return {
      posts : [],
      parsedData : []
    };
  }
};
</script>