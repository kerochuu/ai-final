<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
            <h1>Admin Page</h1>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "AdminPage",
  components: {
  },
  props: {
      classname: { type: String }
  },
  beforeCreate() {
      if (this.classname != 'Admin') {
          alert('관리자만 접근 가능한 페이지입니다.')
          this.$router.back(1)
      }
  }
};
</script>
