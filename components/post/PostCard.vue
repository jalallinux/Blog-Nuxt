<template>
  <v-card
    class="mx-auto"
    max-width="344"
    :to="{ path: `/post/${post.slug}` }"
  >
    <v-img
      :src="post.cover"
      height="200px"
    ></v-img>

    <v-card-title v-text="post.title" />

    <v-card-subtitle v-text="post.caption" />

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        ادامه مطلب
      </v-btn>
    </v-card-actions>
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
