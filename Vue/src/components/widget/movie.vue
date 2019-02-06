<template>
  <v-layout v-if="enable" style="border-radius: 15px;">
    <v-flex xl12 offset-xl12 style="border-radius: 15px;">
      <v-hover>
        <v-card slot-scope="{ hover }">
          <v-carousel>
            <v-carousel-item v-for="(item, i) in content.results" :src="item.poster_path" :key="i">
              <v-expand-transition>
                <div
                  v-if="hover"
                  class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                  style="height: 100%;"
                >
                  {{item.title}}
                </div>
              </v-expand-transition>
            </v-carousel-item>
          </v-carousel>

        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>

</template>

<script>

  import axios from 'axios'

    export default {
        name: "movie",
      data: () => ({
        content: {},
        enable: false,
      }),
      props: {
        config: Object
      },
      methods: {
        updateStuff: function () {
          var token = localStorage.getItem("jwtToken");
          if (!token) {
            this.$router.push({
              name: 'Login'
            })
          }
          var req = "https://api.themoviedb.org/3/movie/" + this.config.config.link + "?api_key=a1c14134509b23ad6677add27506a063&language=fr&page=1"
          axios.get(req,
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(response => {
              for (var i in response.data.results) {
                response.data.results[i].poster_path = "https://image.tmdb.org/t/p/original" + response.data.results[i].poster_path;
              }
              this.content = response.data;
              this.enable = true
            })
            .catch(e => {
              console.log(e)
            });
          setTimeout(this.updateStuff, this.config.config.timer);
        }
      },
      created() {
        this.updateStuff();

      }
    }
</script>

<style scoped>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
  }
</style>
