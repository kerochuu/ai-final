<template>
<div class="py-3">
  <v-layout>

    <v-flex xs12>

      <div @click='detailRepository(repos.web_url)'>
        <div class="repoDiv" style="float: left;">
          <h2 class="font-weight-regular">{{repos.path_with_namespace}}</h2>
          <p class="subheading mb-1 grey--text text--darken-1 font-weight-light">{{repos.namespace.name}}</p>
        </div>
        <!--https://vuetifyjs.com/ko/components/sparklines-->
        <v-flex hidden-xs-only>
          <div class="repoDiv" style="float: right;">
            <v-card max-width="400">
              <v-sparkline :labels="labels" :value="modifyValue()" color="black" line-width="2" padding="16" auto-draw></v-sparkline>
            </v-card>
          </div>
        </v-flex>
      </div>


    </v-flex>
  </v-layout>

</div>
</template>


<script>
import GitlabService from '@/services/GitlabService'

export default {
  name: 'Repository',
  props: {
    repos: {
      type: null
    }
  },
  data: () => ({
    labels: [
      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'
    ],
    // value: [0,0,0,0,0,0,0,0,0,0,0,0],
    commits: []
  }),
  mounted() {
    this.drawStatGraph()
  },
  methods: {
    async drawStatGraph() {
      const response = await GitlabService.getCommits(this.repos.id);
      if (response.status !== 200) {
        return
      }
      // console.log(response.data)
      this.commits = response.data;
      this.modifyValue();

    },
    modifyValue() {
      var value = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (var i = 0; i < this.commits.length; i++) {
        let date = new Date(this.commits[i].committed_date);
        value[date.getMonth()] += 1;
      }
      return value;
    },
    detailRepository(input) { //레파지토리 가기
      window.location = input;
    },

  }


}
</script>
<style>
.font-weight-regular {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;

}

.repoDiv {
  display: inline-block;
  /* padding-right:50px;
   padding-left:50px */
}
</style>
