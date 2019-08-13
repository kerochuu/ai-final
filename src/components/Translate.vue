<template>
  <div>
    <button color="#E5A388" id="google_translate_element" v-on:click="googleTranslateElementInit">Translate!</button>
  </div>
</template>

<script>
export default {
  name: "Translate",
  methods: {
    googleTranslateElementInit() {
      new google.translate.TranslateElement(
        {
          pageLanguage: "en, ko",
          includedLanguages: "ko,en",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: true
        },

        "google_translate_element"
      );
    }
  }
};
</script>

<style>
.goog-te-banner-frame{
  display:none !important;
}
#google_translate_element {
  font-weight: bold;
  border-radius: 5px;
  border: 5px solid #FFEE75;
  padding: 5px;
  background-color: #FFEE75;
  font-weight: bold;
  font-size:1.2rem;
  color: #333;
}
</style>
