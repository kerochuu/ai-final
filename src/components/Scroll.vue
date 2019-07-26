<template>
    <!-- show일 때만 버튼이 보이도록 설정 -->
    <div v-bind:class="{ active : show }" v-if="show">
      <!-- 최상단 이동 버튼 -->
      <v-btn dark fixed fab right bottom color="#039BE5" @click="$vuetify.goTo(0, 'linear')" style="position:fixed; z-index:4" >
       <v-icon dark>keyboard_arrow_up</v-icon>
      </v-btn>

    </div>
</template>

<script>
export default {
    name: "Scroll",
    data() {
        return {
            show: false
        }
    },
    methods: {
        CheckScroll: function() {
            if (window.scrollY === 0) {
                this.show = false
            } else {
                this.show = true
            }
        }
    },
    created: function() {
        window.addEventListener('scroll', this.CheckScroll)
    }
}
</script>

<style scoped>


</style>
