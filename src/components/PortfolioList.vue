<!--portfoiloList: 홈페이지에서 보여줄 포트폴리오 슬라이드-->
<template>
  <md-card>
    <md-card-media>
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide v-for="i in range">
          <div class="swiper-container" style="width:100%; height:400px;">
            <Portfolio
              :date="portfolios[i - 1].created_at.toString()"
              :title="portfolios[i - 1].title"
              :body="portfolios[i - 1].body"
              :imgSrc="portfolios[i - 1].img"
              :pid="portfolios[i-1].pid"
            />
          </div>
          <span class="titleTooltip">{{portfolios[i-1].title}}</span>
        </swiper-slide>
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
  },
  data() {
    return {
      portfolios: [],
      range: [],
      swiperOption: {
        // 카드 사이즈 줄이고 각 사진간 간격 늘리기
        mousewheel: {
          invert: true
        },
        autoplay: {
          delay: 1000,
          stopOnLastSlide: true,
          disableOnInteraction: true
        },
        slidesPerView: 5,
        spaceBetween: 20,
        grabCursor: true,
        slidesPerGroup: 1,
        loop: true,
        loopSlides: 1,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        keyboard: {
          enabled: true,
          onlyInViewPort: false
        },

        // responsive breakpoints
        breakpoints: {
          1264: {
            slidesPerView: 4
          },
          960: {
            slidesPerView: 2
          },
          600: {
            slidesPerView: 1
          }
        }
      }
    };
  }
};
</script>
<style>
.swiper-container {
  width: 100%;
  height: 250px;
}
@media screen and (min-width: 1264px) {
  .swiper-container {
    width: 80%;
  }
}

.swiper-slide > div:hover {
  filter: brightness(30%);
}
#portfoiloCard {
  width: 200px;
}

</style>
