<template>
  <v-app dark>

    <Sidebar
      v-if="$auth.$state.loggedIn"
      :toggle="toggleSidebar"
      @toggle="updateSidebarToggle"
    />

    <v-app-bar
      color="primary"
      fixed
      app
    >
      <v-app-bar-nav-icon v-if="$auth.loggedIn" @click.stop="toggleSidebar = !toggleSidebar" />

      <v-toolbar-title class="red--text">
        <nuxt-link :to="{ path: '/' }">
          <Logo />
          {{ title }}
        </nuxt-link>
      </v-toolbar-title>

      <v-spacer />

      <v-btn
        icon
        color="black"
      >
        <v-icon>mdi-head-question-outline</v-icon>
      </v-btn>

      <v-btn icon v-if="$auth.loggedIn" @click.stop="toggleNotificationBar = !toggleNotificationBar">
        <v-icon v-if="Math.random() < 0.5" color="red">mdi-bell-ring</v-icon>
        <v-icon v-else>mdi-bell</v-icon>
      </v-btn>

      <v-btn
        v-else
        icon
        :to="{ path: '/auth' }"
      >
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>

    <NotificationBar v-if="$auth.loggedIn" :toggle="toggleNotificationBar" @toggle="updateNotificationBarToggle" />

    <Footer />
  </v-app>
</template>

<script>
import Sidebar from "~/components/app/Sidebar";
import NotificationBar from "~/components/app/Notificationbar";
import Logo from "~/components/app/Logo";
import Footer from "~/components/app/Footer";


export default {
  components: {Footer, Logo, NotificationBar, Sidebar},
  data () {
    return {
      toggleSidebar: false,
      toggleNotificationBar: false,
      title: 'انجمن تخصصی برنامه نویسان'
    }
  },
  methods: {
    updateSidebarToggle(value) {
      this.toggleSidebar = value
    },
    updateNotificationBarToggle(value) {
      this.toggleNotificationBar = value
    }
  },
}
</script>

<style>
.v-toolbar__title > a {
  text-decoration: none;
  color: #211607 !important;
}
.v-list-item > .v-list-item__action {
  margin-left: 8px !important;
}
footer > span > a {
  text-decoration: none;
}
</style>
