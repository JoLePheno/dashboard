<template>
  <v-content>

  <div>
      <v-card>
        <v-list two-line>
          <template v-for="(item, index) in widgets">
            <v-subheader
              v-if="item.header"
              :key="item.header"
            >
              {{ item.header }}
            </v-subheader>

            <v-divider
              v-else-if="item.divider"
              :inset="item.inset"
              :key="index"
            ></v-divider>

            <v-list-tile
              v-else
              :key="item.widget"
              avatar

            >
              <v-list-tile-avatar>
                <v-icon>
                  settings
                </v-icon>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title v-html="item.service"> </v-list-tile-title>
                <v-list-tile-title v-if="item.service !== 'Weather'" v-html="item.widget"> </v-list-tile-title>
                <v-list-tile-sub-title v-html="SettingsStore.getDesc(item.widget)"></v-list-tile-sub-title>
              </v-list-tile-content>
              <v-icon @click="deleteWidget(item)">
                clear
              </v-icon>
              <v-icon @click="updateWidget(item)" v-if="item.config.visible">
                visibility
              </v-icon>
              <v-icon  @click="updateWidget(item)" v-if="!item.config.visible">
                visibility_off
              </v-icon>
            </v-list-tile>
          </template>
        </v-list>
      </v-card>
    </div>
  </v-content>
</template>

<script>
  import axios from 'axios'
  import SettingsStore from '@/components/Store/SettingsStore'

  export default {
        name: "Settings",
      data () {
        return {
          SettingsStore: SettingsStore,
          widgets: [],
          componentNames: []
        }
      },
      methods: {
        deleteWidget: function(widget) {

          var token = localStorage.getItem("jwtToken");
          if (!token) {
            this.$router.push({
              name: 'Login'
            })
          }
          var obj = {"_id": widget._id}
          axios.post("http://localhost:3000/api/widget/delete", obj,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(response => {
              this.getWidgets();

            })
            .catch(e => {
              console.log(e)
            });
        },
          updateWidget: function(widget) {
            widget.config.visible = !widget.config.visible;
            var token = localStorage.getItem("jwtToken");
            if (!token) {
              this.$router.push({
                name: 'Login'
              })
            }
            axios.put(`http://0.0.0.0:3000/api/widget/update`, widget,
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
