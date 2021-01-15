<template>
  <v-navigation-drawer
    @input="atInput"
    color="brown darken-4"
    :value="toggle"
    :right="true"
    temporary
    app
  >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar rounded size="50" color="primary">
          <v-img :lazy-src="$auth.user.avatar" :src="$auth.user.avatar" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="white--text font-weight-bold" v-text="$auth.user.family" />
          <v-list-item-subtitle class="white--text font-weight-light" v-text="$auth.user.name" />
        </v-list-item-content>
      </v-list-item>
    </template>
    <v-divider color="white" />
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        color="amber"
        dark
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn @click="logout" block color="red darken-3" class="white--text">
          خروج
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",

  props: {
    toggle: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      items: [
        {
          icon: 'mdi-apps',
          title: 'داشبورد',
          to: '/'
        },
        {
          icon: 'mdi-card-account-details',
          title: 'حساب کاربری',
          to: '/account'
        }
      ],
    }
  },

  methods: {
    atInput(value) {
      this.$emit('toggle', value)
    },
    logout() {
      this.$auth.logout()
        .then(() => {
          this.$notify.success({
            message: 'با موفقیت از حساب خود خارج شدید.'
          })
        })
    }
  },
}
</script>

<style scoped>
</style>
