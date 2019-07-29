<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <div class="modal-container">
        <div class="modal-header">
          <!-- <slot name="header"> -->
          <h1>
            Sign In
            <button style="float:right;" @click="close">
              <v-icon>fa-times</v-icon>
            </button>
          </h1>
          <!-- </slot> -->
        </div>

        <div class="modal-body">
          <slot name="body">
            <div class="inputform">
              <v-icon class="signIn-icon" size="24">fa-user</v-icon>
              <input v-model="email" type="email" placeholder="   Email" @keyup.enter="login" />
            </div>
            <hr />
            <br />
            <div class="inputform">
              <v-icon size="26" class="signIn-icon">fa-lock</v-icon>
              <input
                v-model="password"
                type="password"
                placeholder="   Password"
                @keyup.enter="login"
              />
            </div>
            <hr />
            <br />
            <div id="sign-in" @click="login">Sign In</div>
          </slot>
          <br>
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
          
          <router-link to="/signup">
            <div>Don't have an account? </div>
            <div id="signUp">Create one</div>
          </router-link>
        </div>

        <!-- <div class="modal-footer">
        <slot name="footer">-->
        <!-- <button class="modal-default-button" @click="close">Cancel</button>
        <button class="modal-default-button" @click="close">-->
        <!-- <router-link to="/signup">Sign Up</router-link> -->
        <!-- </button> -->
        <!-- </slot>
        </div>-->
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
    close: function() {
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
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  height: 400px;
  margin: 0px auto;
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

/* .inputform {
  padding-bottom: 10px;
} */

i {
  width: 16px;
}

input {
  display: inline-block;
  margin: 4px 0 0 0;
  width: 90%;
  height: 30px;
}

#x-button {
  width: 1rem;
  float: right;
}
#x-button hover {
  filter: brightness(0);
}
#signUp {
  text-align: center;
  font-size: 18px;
}
a {
  text-decoration: none;
  margin: auto;
  color: #039be5;
}
#sign-in {
  border: 2px solid #039be5;
  border-radius: 5px;
  padding: 3px;
  text-align: center;
  font-weight: bold;
  background-color: #039be5;
  color: #f0f0f0;
}
.signIn-icon {
  margin: 0
}
.container {
  padding: 4px 16px;
}
</style>