<template>
  <v-container>
    <v-layout row wrap>
      <div class="flip-card" style="width:250px; height:187px;">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img
              src="../assets/profile/avocado.jpeg"
              alt="Joowon"
              style="width:250px; height:auto;"
            />
          </div>
          <div class="flip-card-back">
            <h4>
              <b>이주원</b>
            </h4>
            <p>과카몰리 먹고싶어요</p>
          </div>
        </div>
      </div>

      <div class="flip-card" style="width:250px; height:187px;">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img
              src="../assets/profile/stitch.jpeg"
              alt="Hyunho"
              style="width:250px; height: auto;"
            />
          </div>
          <div class="flip-card-back">
            <h4>
              <b>최현호</b>
            </h4>
            <p></p>
          </div>
        </div>
      </div>

      <div class="flip-card" style="width:250px; height:187px;">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img
              src="../assets/profile/peppe.jpeg"
              alt="Junho"
              style="width:250px; height: auto;"
            />
          </div>
          <div class="flip-card-back">
            <h4>
              <b>김준호</b>
            </h4>
            <p>나 준호쓰 30살인디</p>
            <p><marquee>
              <span style="color:red">@</span>
              <span style="color:yellow">@</span>
              <span style="color:green">@</span>
              <span style="color:blue">여</span>
              <span style="color:navy">친</span>
              <span style="color:violet">구</span>
              <span style="color:blue">함</span>
              <span style="color:green">@</span>
              <span style="color:yellow">@</span>
              <span style="color:red">@</span>
              </marquee></p>
          </div>
        </div>
      </div>
      <div class="flip-card" style="width:250px; height:187px;">
        <div class="flip-card-inner">
          <div class="flip-card-front">
            <img
              src="../assets/profile/pika.jpeg"
              alt="Kyungsoo"
              style="width:250px; height: auto;"
            />
          </div>
          <div class="flip-card-back">
            <h4>
              <b>김경수</b>
            </h4>
            <p>취직시켜주세요제발요</p>
          </div>
        </div>
      </div>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "AboutUs"
};
</script>
<style scoped>
.flip-card {
  border-radius: 50% !important;
  margin: auto;
  font-family: "Jua", sans-serif;
  background-color: transparent;
  width: 300px;
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  text-align: center;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
}

.flip-card-back {
  padding: 50px 0;
  font-size: 25px;
  margin: auto;
  background-color: #5CA3D5;
  color: white;
  transform: rotateY(180deg);
}
</style>
