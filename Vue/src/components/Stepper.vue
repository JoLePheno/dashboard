<template>
  <v-stepper  v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Choose service</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Choose widget</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Choose options</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">

        <v-select
          :items="services"
          label="Standard"
          v-model="step1"
        ></v-select>

        <v-flex xs12 sm6 md3>
          <v-text-field
            type="number"
            label="Refresh timer"
            v-model="config['timer']"
            box
          ></v-text-field>
        </v-flex>

        <v-btn v-if="step1 !== ''"
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="2">


        <v-select v-if="step1 === 'Media'"
                  :items="listData.listMedia"
                  label="Standard"
                  v-model="step2"
        ></v-select>
        <v-select v-if="step1 === 'Weather'"
                  :items="listData.listWeather"
                  label="Standard"
                  v-model="step2"
        ></v-select>
        <v-select v-if="step1 === 'Clock'"
                  :items="listData.listClock"
                  label="Standard"
                  v-model="step2"
        ></v-select>
          <v-text-field v-if="step1 === 'Weather'"
            label="latitude"
            v-model="config['latitude']"
            box
          ></v-text-field>
          <v-text-field v-if="step1 === 'Weather'"
            label="latitude"
            v-model="config['longitude']"
            box
          ></v-text-field>
        <v-btn v-if="step2 !== ''"
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

      </v-stepper-content>

      <v-stepper-content step="3">
        <v-select  v-if="step2 === 'media'"
                   :items="listData.listMediaApi"
                   label="Standard"
                   v-model="config['link']"
        ></v-select>

        <v-select  v-if="step2 === 'movie'"
                   :items="listData.listMediaMovie"
                   label="Standard"
                   v-model="config['link']"
        ></v-select>

        <v-btn
          color="primary"
          @click="e1 = 1, addNewWidget()"
        >
          Validate
        </v-btn>

      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>

</template>

<script>
  import axios from 'axios'
  import ListData from '@/components/widget/storeData'

  export default {
    name: "Stepper",
    data: function()  {
      return {
        show: true,
        e1: 0,
        step1: '',
        step2: '',
        step3: '',
        timer: 50000,
        listData: ListData,
        services: ListData.listService,
        config: {
          timer: 50000,
          visible: true
        }
        }
      },
    methods: {
      updateComponent(){
        Object.assign(this.$data, this.$options.data.call(this))
      },
      addNewWidget() {

        var token = localStorage.getItem("jwtToken");
        var obj = {
          "service": this.step1,
          "widget": this.step2,
          "x": "0",
          "y": "0",
          "w": ListData.getSizeW(this.step2),
          "h": ListData.getSizeH(this.step2),
          "config": this.config
        }
        //this.dialog = false;
        this.step1 = '';
        this.step2 = '';
        axios.post(`http://0.0.0.0:3000/api/widget/add`, obj,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(response => {
            this.$emit('send', true)
          })
          .catch(e => {
            console.log(e)
          })
      }
    }
  }
</script>

<style scoped>

</style>
