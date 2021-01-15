<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="post.cover"
      height="200px"
    ></v-img>

    <v-card-title v-text="post.title" />

    <v-card-subtitle v-text="post.category" />

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        ادامه مطلب
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text v-text="post.caption" />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "PostCard",

  data() {
    return {
      show: false
    }
  },
  
  props: {
    post: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>
</style>
