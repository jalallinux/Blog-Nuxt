<template>
  <v-flex md10>
    <v-subheader v-text="title" />
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="post in posts"
          :key="post.id"
        >
          <PostCard
            :post="post"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-flex>
</template>

<script>
import PostCard from "~/components/post/PostCard";

export default {
  name: "PostList",
  components: {
    PostCard
  },

  props: {
    title: {
      type: String,
      default: 'آخرین مطالب'
    },
    posts: {
      type: Array,
      default: []
    },
  },
}
</script>

<style scoped>

</style>
