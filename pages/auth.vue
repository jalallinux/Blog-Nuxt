<template>
  <client-only>
      <v-container>
        <v-row justify="center" align="center" class="py-6" v-if="!$auth.loggedIn">
          <v-col cols="12" md="6" xl="6">
            <v-hover v-slot="{ hover }" open-delay="100">
              <v-card :elevation="hover ? 16 : 2"
                      :class="{ 'on-hover': hover }"
                      outlined>
                <v-card-title>ورود به حساب کاربری</v-card-title>
                <v-form
                  :ref="loginForm"
                >

                  <v-card-text>
                    <v-text-field
                      name="email"
                      v-model="loginForm.email"
                      label="ایمیل"
                      :error-messages="doLogin && errors.email ? errors.email[0] : null"
                      required
                    />

                    <v-text-field
                      name="password"
                      type="password"
                      v-model="loginForm.password"
                      :error-messages="doLogin && errors.password ? errors.password[0] : null"
                      label="رمزعبور"
                      required
                    />
                  </v-card-text>

                  <v-card-actions>
                    <v-btn
                      color="success"
                      class="mr-4"
                      @click="login"
                      v-text="'ورود'"
                    />
                  </v-card-actions>

                </v-form>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12" md="6" xl="6">
          <v-hover v-slot="{ hover }" open-delay="100">
            <v-card :elevation="hover ? 16 : 2"
                    :class="{ 'on-hover': hover }"
                    outlined>
              <v-card-title>ثبت نام</v-card-title>
              <v-form :ref="registerForm">

                <v-card-text>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        name="name"
                        v-model="registerForm.name"
                        label="نام"
                        :error-messages="!doLogin && errors.name ? errors.name[0] : null"
                        required
                      />
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        name="email"
                        v-model="registerForm.email"
                        label="ایمیل"
                        :error-messages="!doLogin && errors.email ? errors.email[0] : null"
                        required
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        name="password"
                        type="password"
                        v-model="registerForm.password"
                        :error-messages="!doLogin && errors.password ? errors.password[0] : null"
                        label="رمزعبور"
                        required
                      />
                    </v-col>

                    <v-col cols="6">
                      <v-text-field
                        name="password_confirmation"
                        type="password"
                        v-model="registerForm.password_confirmation"
                        :error-messages="!doLogin && errors.password_confirmation ? errors.password_confirmation[0] : null"
                        label="تکرار رمزعبور"
                        required
                      />
                    </v-col>
                  </v-row>

                </v-card-text>

                <v-card-actions>
                  <v-btn
                    color="success"
                    class="mr-4"
                    @click="register"
                    v-text="'ثبت نام'"
                  />
                </v-card-actions>

              </v-form>
            </v-card>
          </v-hover>
        </v-col>
        </v-row>
      </v-container>
  </client-only>
</template>

<script>
export default {
  name: "auth",

  data() {
    return {
      doLogin: true,
      registerForm: {
        name: null,
        email: null,
        password: null,
        password_confirmation: null
      },
      loginForm: {
        email: null,
        password: null,
      }
    }
  },

  methods: {
    login() {
      this.doLogin = true;
      this.$auth.loginWith('laravelJWT', {
        data: {
          email: this.loginForm.email,
          password: this.loginForm.password
        }
      }).then(({ data }) => {
        this.$notify.success({
          message: `${data.user.fullName} خوش آمدید.`
        })
      })
    },
    register() {
      this.doLogin = false;
      this.$axios.post('/api/auth/register', {
        name: this.registerForm.name,
        email: this.registerForm.email,
        password: this.registerForm.password,
        password_confirmation: this.registerForm.password_confirmation
      }).then(({data}) => {
        this.loginForm.email = this.registerForm.email
        this.loginForm.password = this.registerForm.password
        this.login()
      })
    }
  },
}
</script>

<style scoped>

</style>
