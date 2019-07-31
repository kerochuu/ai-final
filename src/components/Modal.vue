<template>
  <div class="modal-mask">
    <div class="modal-wrapper" @click="close">
      <div class="modal-container">
        <div class="modal-header">
          <h1>
            Sign In
            <button style="float:right;" @click="closeButton">
              <v-icon>fa-times</v-icon>
            </button>
          </h1>
        </div>

        <div class="modal-body">
          <slot name="body">
            <div class="inputform">
              <label for="email">
                <v-icon class="signIn-icon" size="24">fa-user</v-icon>
              </label>
              <input
                v-model="email"
                id="email"
                type="email"
                placeholder="Email"
                @keyup.enter="login"
              />
            </div>
            <hr />
            <br />
            <div class="inputform">
              <label for="password">
                <v-icon size="26" class="signIn-icon">fa-lock</v-icon>
              </label>
              <input
                id="password"
                v-model="password"
                type="password"
                placeholder="Password"
                @keyup.enter="login"
              />
            </div>
            <hr />
            <br />
            <div id="sign-in" @click="login">Sign In</div>
          </slot>
          <br />
          <div style="text-align:center;">or Login with</div>
          <v-container>
            <v-layout>
              <v-flex xs6 text-xs-center>
                <v-btn round color="#df4a31" dark v-on:click="loginWithGoogle" style="width:50%;">
                  <v-icon size="25" align-content-center>fa-google</v-icon>
                </v-btn>
              </v-flex>
              <v-flex xs6 text-xs-center>
                <v-btn round color="#3b5998" dark v-on:click="loginWithFacebook" style="width:50%;">
                  <v-icon size="25" align-content-center>fa-facebook</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <br />
          <div>
            Don't have an account?
            <router-link to="/signup" style="margin-left:10px;">
              <span @click="close" id="signUp">Sign up</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import FirebaseService from "@/services/FirebaseService";

export default {
  name: "Modal",
  data() {
    return {
      showsignup: false,
      email: "",
      password: ""
    };
  },
  methods: {
    close: function(e) {
      if (
        e.target["className"] === "modal-wrapper" ||
        e.target["id"] === "signUp"
      ) {
        this.$emit("update");
      }
    },
    closeButton: function() {
      this.$emit("update");
    },
    async loginWithGoogle() {
      const result = await FirebaseService.loginWithGoogle();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user;
      this.$router.push("/pass");
      this.$emit("update");
    },
    async loginWithFacebook() {
      const result = await FirebaseService.loginWithFacebook();
      this.$store.state.accessToken = result.credential.accessToken;
      this.$store.state.user = result.user;
      this.$router.push("/pass");
      this.$emit("update");
    },
    login: async function() {
      var data = await FirebaseService.signinFirebase(
        this.email,
        this.password
      );
      if (data) {
        this.$router.push("/pass");
        this.$emit("update");
      }
    }
  }
};
</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-container {
  width: 300px;
  height: 400px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h1 {
  text-align: center;
}

.modal-body {
  margin: 30px 0;
}

.modal-body > input {
  width: 100%;
}

.modal-default-button {
  float: right;
  padding-left: 10px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.inputform > input {
  display: inline-block;
  width: 85%;
  height: 30px;
  margin-left: 10px;
}

i {
  width: 16px;
}

#x-button {
  width: 1rem;
  float: right;
}
#x-button hover {
  filter: brightness(0);
}

a {
  text-decoration: none;
  margin: auto;
  color: #039be5;
}
#sign-in {
  border: 2px solid #039be5;
  cursor: pointer;
  border-radius: 5px;
  padding: 3px;
  text-align: center;
  font-weight: bold;
  background-color: #039be5;
  color: #f0f0f0;
}
.signIn-icon {
  cursor: pointer;
  margin-bottom: -4px;
  margin-left: 2px;
}
.container {
  padding: 4px 16px;
}
</style>