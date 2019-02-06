<template>
    <v-layout v-if="enable">
      <v-flex xl10 offset-xl8>
        <v-card style="border-radius: 15px;">
          <v-layout fill-height>
            <v-flex md12 align-end flexbox>
              <span class="headline">{{content.articles[0].title}}</span>
            </v-flex>
          </v-layout>
          <v-img
            class="white--text"
            height="250px"
            v-bind:src="content.articles[0].urlToImage"
          >

          </v-img>
          <v-card-title>
            <div>
              <span class="grey--text">Auteur: {{content.articles[0].author}}</span><br>
              <span>{{content.articles[0].content}}</span>
            </div>
          </v-card-title>
          <v-card-actions>
            <a v-bind:href="content.articles[0].url">
              <v-btn flat color="orange">Open</v-btn>
            </a>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
</template>

<script>
  import axios from 'axios'

  export default {
    name: "media",

    data: function () {
      return {
        content: {},
        enable: false
      }
    },
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
        var req = "https://newsapi.org/v2/top-headlines?sources=" + this.config.config.link + ",&apiKey=8bec9cc95fd84aaab796d721182afeab"
        axios.get(req,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(response => {
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
  .headline {
    color: black;
  }

  v-layout {

  }

</style>
