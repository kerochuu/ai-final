<template>
    <md-card>
      <md-card-media>
        <!-- swiper -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="i in range">
            <Portfolio
              class="ma-5"
              :date="portfolios[i - 1].created_at.toString()"
              :title="portfolios[i - 1].title"
              :body="portfolios[i - 1].body"
              :imgSrc="portfolios[i - 1].img"
              :pid="portfolios[i-1].pid"
            />
          </swiper-slide>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </md-card-media>
    </md-card>
</template>

<script>
import Portfolio from "@/components/Portfolio";
import FirebaseService from "@/services/FirebaseService";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "PortfoliosList",
  props: {
    // limits: { type: Number, default: 3 },
    // loadMore: { type: Boolean, default: false }
  },
  components: {
    Portfolio,
    swiper,
    swiperSlide
  },
  mounted() {
    this.getPortfolios();
    console.log(this.range);
  },
  methods: {
    async getPortfolios() {
      this.portfolios = await FirebaseService.getPortfolios();
      const length = this.portfolios.length > 15 ? 15 : this.portfolios.length;
      for (let i = 1; i <= length; i++) {
        this.range.push(i);
      }
    }
    // loadMorePortfolios() {
    //   this.limits += 3;
    //   if (this.limits >= this.portfolios.length) this.loadMore = false;
    // }
  },
  data() {
    return {
      portfolios: [],
      range: [],
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 20,
        slidesPerGroup: 3,
        loop: true,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"  
        }
      }
    };
  }
};
</script>
<style>

.mw-700 {
  max-width: 700px;
  margin: auto;
}

.swiper-slide > div:hover {
  filter: brightness(30%)
}
.swiper-wrapper > div {
  width: 23.7% !important;
}

@media(max-width:600px){
  .swiper-wrapper > div {
    width : 96% !important
  } 
}

@media(min-width:601px) and (max-width: 1080px){
  .swiper-wrapper > div {
    width : 48% !important
  }
}

@media(min-width:1081px) and (max-width: 1600px){
  .swiper-wrapper > div {
    width : 30% !important;
  }
}
</style>
