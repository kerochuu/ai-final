<template>
  <div>
    <v-container>
      <div>
        <h1 style="text-align:center; font-size:8vh; margin-top:100px">Signup Page</h1>
      </div>
      <v-layout style="margin-top: 30%">
        <h5>* 는 필수항목입니다.</h5>
      </v-layout>
      <v-layout style="margin-top: 10px">
        <h4>이메일 *</h4>
        <input v-model="email" type="email" />
      </v-layout>
      <v-layout style="margin-top: 20px">
        <h4>비밀번호 *</h4>
        <input v-model="password" type="password" />
      </v-layout>
      <v-layout style="margin-top: 20px">
        <h4>닉네임 *</h4>
        <input v-model="displayName" />
      </v-layout>
      <v-layout>
        <v-btn @click="checkOverlap">아이디 중복 확인</v-btn>
      </v-layout>
      <v-layout style="margin-top: 20px">
        <h4>전화번호</h4>
        <input v-model="phoneNumber" />
      </v-layout>
      <v-layout style="margin-top: 20px" wrap>
        <h4>프로필</h4>
        <input
          class="v-btn v-btn--flat"
          outline
          type="file"
          id="file"
          ref="file"
          @change="handleFileUpload()"
        />
      </v-layout>
      <v-layout xs5>
        <v-flex>
          <div>
            <img id="preview" src height="200px" style="display: block" />
          </div>
        </v-flex>
      </v-layout>
      <v-layout style="margin-top: 20px">
        <button @click="signup">Sign Up</button>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "SignUpPage",
  data() {
    return {
      email: "",
      password: "",
      displayName: "",
      phoneNumber: "",
      photoURL: "",
      isOverlap: false,
      checkNickname: false
    };
  },
  methods: {
    signup: function() {
      if (this.displayName === "") {
        alert("닉네임은 필수로 입력해야 합니다.");
      } else if (!this.checkNickname) {
        alert("닉네임 중복체크를 해주세요.");
      } else if (!this.isOverlap) {
        alert("닉네임을 다시 설정해주세요.");
        this.checkNickname = false;
      } else {
        FirebaseService.signupInFirebase(
          this.email,
          this.password,
          this.displayName,
          this.phoneNumber,
          this.photoURL
        );
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
      console.log(this.$refs.file.files.length);

      if (this.$refs.file.files.length == 0) {
        // 파일 선택 취소 할 시 섬네일 안보임
        document.getElementById("preview").src = "";
        this.photoURL = "";
        return;
      }

      let reader = new FileReader();
      reader.readAsDataURL(this.file);
      //로드 한 후
      reader.onload = function() {
        //로컬 이미지를 보여주기
        document.querySelector("#preview").src = reader.result;
        this.photoURL = reader.result;
        // document.getElementById('preview').style.display = "block"; // 섬네일 이미지 보임
      };
    },
    checkOverlap() {
      FirebaseService.getUserDatabyQuery("displayName", this.displayName).then(
        snapshot => {
          this.isOverlap = snapshot.empty;
          this.checkNickname = true;
          if (this.isOverlap) {
            alert("사용 가능한 닉네임입니다.");
          } else {
            alert("이미 사용중인 닉네임입니다.");
          }
        }
      );
    }
  }
};
</script>

<style scoped>
.layout > input {
  border: solid 1px #333;
  border-radius: 5px;
  margin-left: 20px;
}

#file {
  border: none;
}

#randomImage {
  display: none;
}
</style>
