<template>
  <v-footer
    app
    fixed
    color="primary"
  >
    <span> {{ text }} &copy; {{ new Date().getFullYear() }}</span>
  </v-footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      text: 'انجمن تخصصی برنامه نویسان'
    }
  },
}
</script>

<style scoped>
</style>
