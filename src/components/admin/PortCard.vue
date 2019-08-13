<template>
  <v-card height="100%">
    <v-toolbar color="orange" flat>
      <v-toolbar-title>Portfolios 최근 게시물</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-list two-line>
      <template v-for="(item, index) in parsedData">
        <v-divider v-if="item.divider" :inset="item.inset" :key="index"></v-divider>

        <v-list-tile v-else :key="item.title" avatar>
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

export default {
  name: "PortCard",
  mounted() {
    this.getPortfolios().then(() => {
      this.loadPortfolios()
    })
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios()
    },
    loadPortfolios() {
      const length = this.portfolios.length > 3 ? 3 : this.portfolios.length;
      for (let i = 0; i < length; i++) {
        console.log(this.portfolios[i].uid)
        FirebaseService.getUserDatabyQuery('email', this.portfolios[i].uid)
        .then((docSnapshots) => {
          docSnapshots.docs.map((doc) => {
            let data = doc.data()
            this.parsedData.push({
              avatar: data.photoURL === "" ? "img/guest.6e699da6.png" : data.photoURL,
              title: this.portfolios[i].title,
              body: "<span class='text--primary'>" + data.email + "</span> - " + this.portfolios[i].body
            })
          })
          if(i !== length - 1) {
            this.parsedData.push({ divider: true, inset: true })
          }
        })
      }
    }
  },
  data() {
    return {
      portfolios : [],
      parsedData : []
    };
  }
};
</script>