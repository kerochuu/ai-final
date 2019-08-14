<template>
  <v-container style="width:70%; margin: 100px auto;" fluid :grid-list-md="!$vuetify.breakpoint.xs">
    <v-layout wrap row>
      <v-flex xs12 sm6 md3 class="pb-2">
        <SmallCard
          title="Post"
          :number="postsLength"
          tIcon="list"
          tIconColor="success"
          bIcon="update"
          bIconColor="primary"
          bText="2시간 전"
        ></SmallCard>
      </v-flex>
      <v-flex xs12 sm6 md3 class="pb-2">
        <SmallCard
          title="Portfolio"
          :number="portfoliosLength"
          tIcon="person"
          tIconColor="primary"
          bIcon="trending_up"
          bIconColor="success"
          bText="13 증가"
        ></SmallCard>
      </v-flex>
      
      <v-flex xs12 sm6 md3 class="pb-2" @click='moveUserAdmin'>
        <SmallCard
          title="User"
          :number="usersLength"
          tIcon="visibility"
          tIconColor="info"
          bIcon="group"
          bIconColor="success"
          bText="2명 접속중"
        ></SmallCard>
      </v-flex>
​
      <v-flex xs12 sm6 md3 class="pb-2">
        <SmallCard
          title="Alarm"
          :number="subscriberLength"
          tIcon="view_module"
          tIconColor="warning"
          bIcon="trending_up"
          bIconColor="success"
          bText="12 증가"
        ></SmallCard>
      </v-flex>
​
      <v-flex xs12 sm4 class="pb-2">
        <TrendCard
          title="주간 게시물 현황"
          :data="[4, 7, 9, 5, 6, 4, 5]"
          :gradient="['#6fa8dc', '#42b983', '#2c3e50']"
        ></TrendCard>
      </v-flex>
      <v-flex xs12 sm4 class="pb-2">
        <TrendCard
          title="주간 사용자 현황"
          :data="[3, 1, 2, 1, 0, 4, 2]"
          :gradient="['red', 'orange', 'yellow']"
        ></TrendCard>
      </v-flex>
      <v-flex xs12 sm4 class="pb-2">
        <TrendCard
          title="주간 조회수 현황"
          :data="[33, 22, 2, 43, 33, 1, 55]"
          :gradient="['blue', 'green', 'sky']"
        ></TrendCard>
      </v-flex>
​
      <v-flex xs12 sm6 class="pb-2">
        <PostCard></PostCard>
      </v-flex>
​
      <v-flex xs12 sm6 class="pb-2">
        <PortCard></PortCard>
      </v-flex>
    </v-layout>
  </v-container>
</template>
​
​
<script>
import PostCard from '@/components/admin/PostCard'
import PortCard from '@/components/admin/PortCard'
import TrendCard from '@/components/admin/TrendCard'
import SmallCard from '@/components/admin/SmallCard'
import FirebaseService from '@/services/FirebaseService'

export default {
  name: "AdminPage",
  components: {
    PostCard,
    PortCard,
    TrendCard,
    SmallCard
  },
  props: {
    authority: { type: String }
  },
  created() {
    if (this.authority != "Admin") {
      alert("관리자만 접근 가능한 페이지입니다.");
      this.$router.back(1);
    }
  },
  mounted() {
    FirebaseService.getPosts()
    .then(res => {
      this.postsLength = res.length
    })
    FirebaseService.getPortfolios()
    .then(res => {
      this.portfoliosLength = res.length
    })
    FirebaseService.getAllUserData()
    .then(res => {
      this.usersLength = res.length
    })
    FirebaseService.getSubscribers()
    .then(res => {
      this.subscriberLength = res.length
    })
  },
  methods: {
    moveUserAdmin() {
      this.$router.push('/admin/user')
    }
  },
  data () {
    return {
      postsLength: 0,
      portfoliosLength: 0,
      usersLength: 0,
      subscriberLength: 0,
    }
  }
};
</script>

<style scoped>

.v-card {
  border-radius: 5px;
}

</style>