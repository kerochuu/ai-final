<template>
  <v-app>
    <Header :user="user" :classname="classname" />
    <Scroll />
    <v-content id="body">
      <router-view :user="user" :classname="classname" />
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
      classname: "",
    };
  },
  components: {
    Header,
    Footer,
    Scroll
  },
  mounted() {
    this.$router.push("/pass");
  },
  methods: {
    getAuthority: async function(param){
      let data = await FirebaseService.getUserAuthority(param)
      return data;
    }
  },
  watch: {
    $route() {
      if (window.location.pathname !== '/pass') {
        this.user = FirebaseService.getUserInfo();
        let userId =''
        if (this.user) {
          userId = this.user.uid;
        } else {
          userId = "unauthenticated";
        }
        if (userId === "unauthenticated") {
          this.classname = "Anonymous"
        } else {
          console.log(this.user.uid)
          FirebaseService.getUserAuthority(this.user.uid)
          .then((doc) => {
				    if (doc.exists) {
              console.log(doc.data()['class'])
              this.classname = doc.data()['class']
            } else {
              this.classname = undefined
            }
          })
          console.log(this.classname)
          if (this.classname == undefined) {
            FirebaseService.changeAuthority(this.user, 'Visitor')
            this.classname = 'Visitor'
          }
        }
        FirebaseService.addPageLog(userId);
        console.log(this.user.uid)
        console.log(this.classname)
        console.log(this.user)
      }
      
    }
  }
};

//<!-- Channel Plugin Scripts -->
;window.channelPluginSettings = {
    "pluginKey": "4be11479-22fc-46d6-8fb1-fca4277072d2"
  };
  (function() {
    var w = window;
    if (w.ChannelIO) {
      return (window.console.error || window.console.log || function(){})('ChannelIO script included twice.');
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
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      s.charset = 'UTF-8';
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
    if (document.readyState === 'complete') {
      l();
    } else if (window.attachEvent) {
      window.attachEvent('onload', l);
    } else {
      window.addEventListener('DOMContentLoaded', l, false);
      window.addEventListener('load', l, false);
    }
  })();
  
//<!-- End Channel Plugin -->

</script>

<style>
#body {
  background-image: linear-gradient(to bottom right, #e39b82, #fef3cb);
}
div {
  font-family: "Montserrat", sans-serif;
}
@media screen and(max-width:48px) {
  #content {
    margin-top: 48px;
  }
}

@media screen and(max-width:56px) {
  #content {
    margin-top: 56px;
  }
}
@media screen and(max-width:1092) {
  #content {
    margin-top: 64px;
  }
}
</style>
