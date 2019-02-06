<template>
  <v-layout v-if="reqDone" style="background-color: white; border-radius: 15px">
    <weather
      api-key="8c8019ede5b587bf7463f3a8c17b32d8"
      title="Weather"
      :latitude="position.lat"
      :longitude="position.long"
      language="en"
      units="uk">
    </weather>
  </v-layout>
</template>

<script>
  import axios from 'axios'
  import VueWeatherWidget from 'vue-weather-widget';
  import 'vue-weather-widget/dist/css/vue-weather-widget.css';

  export default {
    name: "Weather",
    props: ['config'],
    data: function () {
      return {
        position: {},
        reqDone: false
      }
    },
    components: {
      'weather': VueWeatherWidget
    },
    methods: {
      getPosition: function(position) {
        this.position.lat = position.coords.latitude.toString();
        this.position.long = position.coords.longitude.toString();
        this.reqDone = true;
      },
    },
    created() {

      if (this.config.config.latitude !== 0) {
        this.position.lat = this.config.config.latitude;
        this.position.long = this.config.config.longitude;
        this.reqDone = true;
      } else  {
        navigator.geolocation.watchPosition(this.getPosition);
      }
      let ckeditor = document.createElement('script');
      ckeditor.setAttribute('src',"http://widget.meteocity.com/js/Njc0ODJ8NXwyfDV8NXxGRkZGRkZ8M3xGRkZGRkZ8Y3wx");
      document.head.appendChild(ckeditor);
    }
  }
</script>

<style scoped>
  .main {
    background-color: blue;
  }
</style>
