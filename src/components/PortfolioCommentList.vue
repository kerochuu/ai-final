<template>
  <v-layout mt-5 wrap>
    <v-flex xs12 sm6 md3 >
      <Comment
      :writer="Comments[i-1].writer"
      :comment="Comments[i-1].comment"
      :pid="Comments[i-1].pid"
      ></Comment>
    </v-flex>
  </v-layout>
</template>
<script>
import Comment from '@/components/PortfolioComment'
import FirebaseService from '@/services/FirebaseService'

export default {
	name: 'CommentList',

	data() {
		return {
			Comments: []
		}
	},
	components: {
		Portfolio
	},
	mounted() {
		this.getPortfolioComment()
	},
	methods: {
		async getPortfolioComment() {
      this.Comments = await FirebaseService.getPortfolioComment()
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
