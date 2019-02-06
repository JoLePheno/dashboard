<template>

  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Register form</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <div v-if="errors !== ''">{{errors}}</div>
                <v-text-field
                  v-model="register.email"
                  :rules="emailRules"
                  :counter="20"
                  label="Email"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="register.username"
                  :rules="nameRules"
                  :counter="10"
                  label="Username"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="register.password"
                  :type="'password'"
                  label="Password"
                  required
                ></v-text-field>

                <v-btn
                  :disabled="!valid"
                  @click="submit"
                >
                  submit
                </v-btn>
                <v-btn @click="clear">clear</v-btn>
                <v-btn @click="back">Back</v-btn>

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
  name: 'Register',
  data () {
    return {
      register: {},
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
    loginIn() {
      var postData = {
        "email": this.register.email,
        "password": this.register.password
      };
      axios.post(`http://localhost:3000/api/auth/login`, postData,
        {
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          this.posts = response.data

          localStorage.setItem("jwtToken", response.data.token);
          this.$router.push({
            name: 'Dashboard'
          })
        })
        .catch(e => {
          this.errors =
          console.log(e)
        })
    },
    submit (evt) {
      evt.preventDefault()
      axios.post(`http://0.0.0.0:3000/api/auth/register/`, this.register)
      .then(response => {
        if (!response.data.success) {
          this.errors = response.data.msg;
          return;
        }
        this.loginIn();
      })
      .catch(e => {
        console.log(e)
        this.errors = e.response.data.msg;
      })
    },
    clear() {
      this.$refs.form.reset();
    },
    back() {
      this.$router.push({
        name: 'Login'
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
