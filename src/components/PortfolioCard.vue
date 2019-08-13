<template>
  <v-layout mt-5 wrap>
    <v-flex xs12 sm6 md3
    v-for="i in portfolios.length > limits ? limits : portfolios.length" >
      <Portfolios class="ma-3"
              :date="portfolios[i - 1].created_at.toString()"
              :title="portfolios[i - 1].title"
              :body="portfolios[i - 1].body"
              :imgSrc="portfolios[i - 1].img"
              :pid="portfolios[i-1].pid"
      ></Portfolios>
    </v-flex>

    <v-flex xs12 text-xs-center round my-5 v-if="loadMore">
      <v-btn color="info" dark v-on:click="loadMorePortfolios"><v-icon size="25" class="mr-2">fa-plus</v-icon> 더 보기</v-btn>
    </v-flex>
  </v-layout>
</template>
<script>
import Portfolios from '@/components/Portfolios'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'PortfolioCard',
	props: {
		limits: {type: Number, default: 4},
    loadMore: {type: Boolean, default: false}
	},
	data() {
		return {
			portfolios: []
		}
	},
	components: {
		Portfolios
	},
	mounted() {
		this.getPortfolios()
	},
	methods: {
		async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios()
		},
		loadMorePortfolios() {
      this.limits += 4;

      if(this.limits >= this.portfolios.length)
        this.loadMore = false;
    }
	},
}
</script>
<style>
  .mw-700 {
    max-width: 700px;
    margin: auto;
  }
</style>
