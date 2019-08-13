<template>
  <v-app>
    <Header :user="user" :authority="authority" />
    <Scroll />
    <v-content id="body">
      <router-view :user="user" :authority="authority" :cookie="cookie" />
    </v-content>

    <Footer />
  </v-app>
</template>

<script>
import store from "./store";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Scroll from "./components/Scroll";
import FirebaseService from "./services/FirebaseService";

if (
  !window.chrome ||
  navigator.userAgent.indexOf("Edge") !== -1 ||
  navigator.userAgent.indexOf("OPR") !== -1 ||
  navigator.userAgent.indexOf("Version") !== -1
) {
  alert("이 사이트는 크롬에 최적화 되어 있읍니다. 크롬을 깔아주세욥");
}

export default {
  name: "App",
  store,
  data() {
    return {
      user: "",
      authority: "",
      cookie: false
    };
  },
  components: {
    Header,
    Footer,
    Scroll
  },
  mounted() {
    this.$router.push("/pass");
    Notification.requestPermission().then(result => {
      console.log(result);
    });
  },
  methods: {
    getCookie() {
      let falseList = [];
      let trueList = [];
      FirebaseService.getAllCookie()
        .then(snapshot => {
          falseList = snapshot.docs[0].data()["UserList"];
          trueList = snapshot.docs[1].data()["UserList"];
        })
        .then(() => {
          if (this.user) {
            const trueIndex = trueList.indexOf(this.user.uid);
            const falseIndex = falseList.indexOf(this.user.uid);
            if (trueIndex + falseIndex == -2) {
              if (confirm("이 사이트에서 사용자에 알림을 보내고자 합니다.")) {
                trueList.push(this.user.uid);
                FirebaseService.updateCookie("True", { UserList: trueList });
                this.cookie = true;
              } else {
                falseList.push(this.user.uid);
                FirebaseService.updateCookie("False", { UserList: falseList });
                this.cookie = false;
              }
            } else {
              if (trueIndex > falseIndex) {
                this.cookie = true;
              } else {
                this.cookie = false;
              }
            }
          }
        });
    }
  },
  watch: {
    $route() {
      if (window.location.pathname !== "/pass") {
        this.user = FirebaseService.getUserInfo();
        let userId = "";
        if (this.user) {
          userId = this.user.uid;
        } else {
          userId = "unauthenticated";
        }
        if (userId === "unauthenticated") {
          this.authority = "Anonymous";
        } else {
          // console.log(this.user.uid)
          FirebaseService.getUserData(this.user.uid).then(doc => {
            if (doc.exists) {
              // console.log(doc.data())
              // console.log(doc.data()['authority'])
              this.authority = doc.data()["authority"];
            } else {
              this.authority = undefined;
            }
          });
          // console.log(this.authority)
          if (this.authority == undefined) {
            FirebaseService.changeAuthority(this.user, "Visitor");
            this.authority = "Visitor";
          }
        }
        FirebaseService.addPageLog(userId);
        // console.log(this.user.uid)
        // console.log(this.authority)
        // console.log(this.user)
        this.getCookie();
      }
    }
  }
};

// <!-- Channel Plugin Scripts -->
// 무료체험판 종료. 변경필요
window.channelPluginSettings = {
  pluginKey: "4be11479-22fc-46d6-8fb1-fca4277072d2"
};
(function() {
  var w = window;
  if (w.ChannelIO) {
    return (window.console.error || window.console.log || function() {})(
      "ChannelIO script included twice."
    );
  }
  var d = window.document;
  var ch = function() {
    ch.c(arguments);
  };
  ch.q = [];
  ch.c = function(args) {
    ch.q.push(args);
  };
  w.ChannelIO = ch;
  function l() {
    if (w.ChannelIOInitialized) {
      return;
    }
    w.ChannelIOInitialized = true;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.async = true;
    s.src = "https://cdn.channel.io/plugin/ch-plugin-web.js";
    s.charset = "UTF-8";
    var x = document.getElementsByTagName("script")[0];
    x.parentNode.insertBefore(s, x);
  }
  if (document.readyState === "complete") {
    l();
  } else if (window.attachEvent) {
    window.attachEvent("onload", l);
  } else {
    window.addEventListener("DOMContentLoaded", l, false);
    window.addEventListener("load", l, false);
  }
})();

//<!-- End Channel Plugin -->
</script>

<style>
h1 {
  font-family: "Jua", sans-serif;
  letter-spacing: 3px;
}
h2 {
  font-family: "Do Hyeon", sans-serif;
}
#body {
  /* background-image: linear-gradient(to bottom right, #29b6f6 , #FFFFFF); */
  background-color: #ece1d4;
  font-family: "Jua", sans-serif;

}
/* div {
  font-family: "Montserrat", sans-serif;
} */
</style>  
