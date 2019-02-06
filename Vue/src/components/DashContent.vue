<template>

  <v-content style="background-color: #e8e9ea">
    <stepper v-if="dialog" v-on:send="getUpdate"></stepper>
    <grid-layout
      :layout="widgets"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="false"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
      :auto-size="true"
    >
      <div v-if="tab === 'Home'">

      <grid-item v-for="item in widgets" v-if="item.config.visible"
                 :key="item._id"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 @moved="movedEvent(item)">
        <component v-bind:is="componentNames[item.i]" v-bind:config="item"  v-on:send="getUpdate"></component>
      </grid-item>
      </div>

      <div v-if="tab !== 'Home'">

        <grid-item v-for="item in widgets" v-if="item.config.visible && tab === item.service"
                   :key="item._id"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   @moved="movedEvent(item)">
          <component v-bind:is="componentNames[item.i]" v-bind:config="item"  v-on:send="getUpdate"></component>
        </grid-item>
      </div>
    </grid-layout>

    <v-btn v-if="!dialog"
      fab
      bottom
      right
      color="pink"
      dark
      fixed
      @click="dialog = !dialog"
    >
      <v-icon>add</v-icon>
    </v-btn>

    <v-btn v-if="dialog"
           fab
           bottom
           right
           color="red"
           dark
           fixed
           @click="dialog = !dialog"
    >
      <v-icon>clear</v-icon>
    </v-btn>
  </v-content>
</template>

<script>
  import axios from 'axios'
  import weather from '@/components/widget/Weather'
  import media from '@/components/widget/media'
  import movie from '@/components/widget/movie'
  import dashcontent from '@/components/DashContent'
  import stepper from '@/components/Stepper'
  import clock from '@/components/widget/Clock'

    export default {
        name: "DashContent",
        data: function()  {
          return {
            widgets: [],
            componentNames: [],
            dialog: false,
            services: [],
            config: {}
          }},
        components: {
          'weather': weather,
          'media': media,
          'movie': movie,
          'dashcontent': dashcontent,
          'stepper': stepper,
          'clock': clock
        },
        props: {
          source: String,
          tab: String
        },
        methods: {
          movedEvent: function(obj){
            this.updateWidget(obj);
          },
          updateWidget: function(widget) {
            var token = localStorage.getItem("jwtToken");
            if (!token) {
              this.$router.push({
                name: 'Login'
              })
            }
            axios.put(`http://localhost:3000/api/widget/update`, widget,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                }
              })
              .then(response => {
              })
              .catch(e => {
                console.log(e)
              })
          },
          getUpdate(value) {
            if (value)
              this.dialog = false;
            this.getWidgets();
          },
          getWidgets: function() {
            var token = localStorage.getItem("jwtToken");
            if (!token) {
              this.$router.push({
                name: 'Login'
              })
            }
            axios.get(`http://localhost:3000/api/widget/widgets`,
              {
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token
                }
              })
              .then(response => {
                console.log(response.data);
                var outputData = [];
                for (var i in response.data.widget) {
                  outputData.push(response.data.widget[i]);
                }
                this.widgets = outputData;
                var arr = [];
                var i = 0;
                this.widgets.forEach(function (elem) {
                    elem['i'] = i++;
                    arr.push(elem.widget)
                  }
                )
                this.componentNames = arr;
              })
              .catch(e => {
                console.log(e)
              })
          }
        },
      created() {
          this.getWidgets();
        }
    }
</script>

<style scoped>

</style>
