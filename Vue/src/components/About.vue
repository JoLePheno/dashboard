<template>
  <div>
    <print-object :printable-object="content"></print-object>

  </div>
</template>

<script>
  import axios from 'axios'
  import PrintObject from 'vue-print-object'
  import 'vue-print-object/dist/vue-print-object.css'

  export default {
    name: "About",
    data: function() {
      return {
        content: {}
      }
    },
    components: {'PrintObject': PrintObject},
    created() {
        var token = localStorage.getItem("jwtToken");
        if (!token) {
          this.$router.push({
            name: 'Login'
          })
        }
        axios.get("http://0.0.0.0:3000/api/widget/about",
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
          .then(response => {
            this.content = response.data.about;
          })
          .catch(e => {
            console.log(e)
          });
        //setTimeout(this.updateStuff, this.config.config.timer);
      }
  }
</script>

<style scoped>

</style>
