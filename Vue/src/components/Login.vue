<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <div v-if="errors !== ''">{{errors}}</div>
                <v-text-field
                  v-model="login.email"
                  :rules="emailRules"
                  :counter="20"
                  label="Email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="login.password"
                  :type="'password'"
                  label="Password"
                  required
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  @click="loginIn"
                >
                  Login
                </v-btn>
                <v-btn @click="goRegister">Register</v-btn>
              </v-form>
            </v-card-text>

          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>

</template>

<script>

import axios from 'axios'

export default {
  name: 'Login',
  data() {
    return {
      login: {},
      errors: '',
      valid: true,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      nameRules: [
        v => !!v || 'Name is required',
        //v => v.length <= 10 || 'Name must be less than 10 characters'
      ],
      passRules: [
        v => v || 'Password il Required',
        //v => v.length >= 2 || 'Password must be more than 2 characters'
      ]
    }
  },
  methods: {
    goRegister() {
      this.$router.push({
        name: 'Register'
      })
    },
    loginIn() {
      var postData = {
        "email": this.login.email,
        "password": this.login.password
      };
      axios.post(`http://0.0.0.0:3000/api/auth/login`, postData,
      {
        headers: { 'Content-Type': 'application/json' }
      })
        .then(response => {
          if (!response.data.success) {
            this.errors = response.data.msg;
            return;
          }
          this.posts = response.data
          localStorage.setItem("jwtToken", response.data.token);
          this.$router.push({
            name: 'Dashboard'
          })
        })
        .catch(e => {
          this.errors = e.response.data.msg;
        })
    }
  }
}
</script>



<style>
  form {
    margin-left: 20%;
    margin-right: 20%;
  }
</style>
