<template>
  <v-app id="inspire">
    <v-navigation-drawer style="background-color: #c7c9cc"
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            v-model="item.model"
            :key="item.service"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.service }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              @click="changeState(item.service)"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.service }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.service" @click="changeState(item.service)">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.service }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="#595959"
      dark
      app
      fixed
    >


      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Dashboard</span>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn icon @click="settings = !settings">
        <v-icon>settings</v-icon>
      </v-btn>
      <v-btn icon @click="disconnect()">
        <v-icon>input</v-icon>
      </v-btn>
      <v-btn icon large>
        <v-avatar size="32px" tile>
          <img
            src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
            alt="Vuetify"
          >
        </v-avatar>
      </v-btn>
    </v-toolbar>
    <dashcontent v-if="!settings" :tab="itemSelected"></dashcontent>
    <settings v-if="settings"></settings>



  </v-app>
</template>

<script>
  import axios from 'axios'
  import VueGridLayout from 'vue-grid-layout'
  import weather from '@/components/widget/Weather'
  import media from '@/components/widget/media'
  import ListData from '@/components/widget/storeData'
  import movie from '@/components/widget/movie'
  import dashcontent from '@/components/DashContent'
  import Settings from '@/components/Settings'

  export default {
    data: function()  {
      return {
      drawer: null,
        settings: false,
      items: ListData.itemList,
        itemSelected: 'Home'
    }},
    methods: {
      changeState: function(newState) {
        this.settings = false;
        this.itemSelected = newState;
        console.log("New state" + newState)
      },
      disconnect: function () {
        localStorage.removeItem("jwtToken");
        this.$router.push({
          name: 'Login'
        })

      }
    },
    components: {
      'weather': weather,
      'media': media,
      'movie': movie,
      'dashcontent': dashcontent,
      'settings': Settings
    },
    props: {
      source: String
    },

  }
</script>
