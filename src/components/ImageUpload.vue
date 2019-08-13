<template>
  <v-layout>
    <v-flex xs12 class="selectImage">
      <v-btn color="green" @click="randomImageUpload()" class="fileText">random</v-btn>
      <v-btn color="yellow">
        <label for="file" class="fileText" flat>Choose</label>
        <input
          class="v-btn v-btn--flat fileButton"
          outline
          type="file"
          id="file"
          ref="file"
          @change="handleFileUpload()"
        />
      </v-btn>
      <div>
        <img id="preview" src height="200px" style="display: none" />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "ImageUpload",
  props: {
    img: {
      type: String,
      default: ""
    },
    randomImage: {
      type: Boolean,
      default: false
    }
  },
  components: {},
  data() {
    return {
      file: ""
    };
  },
  methods: {
    async imageUpload() {
      console.log(this.$refs.file.files.length);
      console.log(this.randomImage);
      if (this.$refs.file.files.length == 0 && this.randomImage == false) {
        // 파일 선택 취소 할 시 섬네일 안보임
        document.getElementById("preview").style.display = "none";
        alert("이미지를 업로드 해주세요.");
        return;
      }
      if (this.randomImage) {
        this.img = document.getElementById("preview").getAttribute("src");
      } else {
        this.img = await FirebaseService.posterUpload(this.file);
      }
      FirebaseService.postImage(this.img); ////////////////////////////////////////////////////
      console.log("이미지URL : " + this.img);
      return this.img;
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.$refs.file.files.length);

      if (this.$refs.file.files.length == 0) {
        // 파일 선택 취소 할 시 섬네일 안보임
        document.getElementById("preview").style.display = "none";
        return;
      }

      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      //로드 한 후
      reader.onload = function() {
        //로컬 이미지를 보여주기
        document.querySelector("#preview").src = reader.result;
        document.getElementById("preview").style.display = "block"; // 섬네일 이미지 보임
      };
      this.randomImage = false;
    },
    randomImageUpload() {
      alert("!?!?!?!?!?!?!?!?!??!?!?!?!?!?!?!?!?!?!");
      const axios = require("axios");
      const instance = axios
        .get(
          "https://api.unsplash.com/photos/random/?query=nature&client_id=d1b20913bdc574be175e41b577d9b90cc41704df8e884379efb2d5dea0c39ed7&client_secret=13b1528997eb643e0b3d218f11f355c8e3573d390bcd5add02087ecc5b6fb8a4"
        )
        .then(response => {
          document.querySelector("#preview").src = response.data.urls.full;
          document.getElementById("preview").style.display = "block"; // 섬네일 이미지 보임
          this.randomImage = true;
        })
        .catch(error => {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.fileButton {
  position: absolute;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
.fileText{
  font-weight: bold;
}

/* .fileText {
  width: 100px;
  height: 50px;
  background-color: red;
  cursor: pointer;
} */

@media screen {
  .selectImage {
    margin: 5px 30px;
  }
}
@media screen and (min-width: 960px) {
  .selectImage {
    margin: 5px 50px;
  }
}
@media screen and (min-width: 1904px) {
  .selectImage {
    margin: 10px 80px;
  }
}
</style>