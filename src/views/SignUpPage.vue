<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <div class="signup-div" style="margin:13vh 20vw 10vh; background-color: #ffffff;">
            <h1 style="text-align:center; font-size:8vh; padding-top:3vh;">Sign Up</h1>
            <div style="margin: 5vh 5vw;">
              <!-- <div style="margin-left:auto;"> -->
              <h5>* 는 필수항목입니다.</h5>
              <!-- </div> -->

              <!-- email -->
              <div class="menu">
                <label for="email">
                  <v-icon class="signIn-icon" size="25">fa-user</v-icon>
                </label>
                <input id="email" v-model="email" type="email" placeholder="Email *" />
                <hr />
              </div>

              <!-- password -->
              <div class="menu">
                <label for="password">
                  <v-icon size="25" class="signIn-icon">fa-lock</v-icon>
                </label>
                <input id="password" v-model="password" type="password" placeholder="Password *" />
                <hr class="pwhr"/>
              </div>

              <!-- 여기 간격이 이상함 수정할 것!! -->
              <!-- nickname -->
              <div class="menu nick-div">
                <label for="nickname">
                  <v-icon class="signIn-icon" size="25" style="margin-left:2px;">bookmark</v-icon>
                </label>
                <input id="nickname" v-model="displayName" placeholder="Nickname *"/>
                <button class="chkbtn" @click="checkOverlap">check</button>
                <hr />
              </div>

              <!--image file upload  -->
              <div class="menu">
                <v-layout style="margin-top: 20px" wrap>
                  <label for="file">
                    <v-icon class="signIn-icon" size="25">picture_in_picture</v-icon>
                  </label>
                  <input
                    class="v-btn v-btn--flat"
                    outline
                    type="file"
                    id="file"
                    ref="file"
                    @change="handleFileUpload()"
                  />
                </v-layout>
              </div>

              <!-- <v-layout xs5>
                <v-flex> -->
                  <div v-if="gotImg">
                    <img id="preview" src=""/>
                  </div>
                <!-- </v-flex>
              </v-layout> -->

              <!-- <v-layout style="margin-top: 20px"> -->
                <v-btn class="v-btn" id="signUpBtn" @click="signup"> Sign up</v-btn>
              <!-- </v-layout> -->
            </div>
          </div>
        </v-flex>
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
      checkNickname: false,
      gotImg: false,
    };
  },
  methods: {
    signup: function() {
      if (this.email === "") {
        alert("이메일은 필수로 입력해야 합니다.");
      } else if (this.password === "") {
        alert("비밀번호는 필수로 입력해야 합니다.");
      } else if (this.displayName === "") {
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
      this.gotImg = true;
      this.file = this.$refs.file.files[0];
      console.log(this.$refs.file.files.length);

      if (this.$refs.file.files.length == 0) {
        this.gotImg = false;
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
      if (!this.displayName) {
        alert("닉네임을 먼저 입력해주세요.");
        return;
      }
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
#nickname{
  margin-left: 5px;
  width: 40%;
}
.signup-div {
  border-radius: 10px;
}
i {
  cursor: pointer;
  margin-left: 8px;
  font-size: 16px;
}

.menu > input {
  border-radius: 5px;
  margin-left: 10px;
  padding: 3px;
  border: none;
  width: 60%;
}
.menu > input::placeholder {
  font-size: 16px;
}

.chkbtn {
  margin-left: 93px;
  margin-bottom: 10px;
  margin-top: 0;
}

#file {
  border: none;
}

#randomImage {
  display: none;
}

.menu {
  /* display: inline-block; */
  font-size: 20px;
  margin-top: 5vh;
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
}

#file{
  display:none;
}
#signUpBtn{
  width: 100%;
  margin-bottom: 20px;
  background-color: #039BE5;
  color: #ffffff;
}

#preview{
  display: flex;
  justify-content: center;
  height: 50px;
}
</style>
