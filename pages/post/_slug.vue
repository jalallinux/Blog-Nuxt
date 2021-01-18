<template>
  <v-row v-else justify="center" align="center">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex md9>
          <v-subheader>مطلب اصلی</v-subheader>
          <PostBox :post="post" />
        </v-flex>
        <v-flex md3>
          <v-subheader>مطالب مشابه</v-subheader>
          <v-card class="mb-3" v-for="(post, i) in samePosts" :key="i" :to="`/post/${post.slug}`">
            <v-list-item two-line class="px-2">
              <v-list-item-avatar rounded class="ma-2" size="100" color="grey">
                <v-img :src="post.cover" />
              </v-list-item-avatar>
              <v-list-item-content>
                <v-card-text class="pa-0" v-html="post.title" />
                <v-card-subtitle class="grey--text pa-0" v-text="post.created_at" />
              </v-list-item-content>
            </v-list-item>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-row>
</template>

<script>
import PostBox from "@/components/post/PostBox";
export default {
  name: "slug",
  components: {PostBox},
  auth: false,
  fetchOnServer: false,

  data() {
    return {
      post: null,
      samePosts: [],
    }
  },

  async fetch() {
    this.$store.dispatch('post/show', this.$route.params.slug)
      .then(data => {
        this.post = data
        this.fetchSamePosts()
      }).catch(err => this.redirect('/'))
  },

  methods: {
    fetchSamePosts() {
      this.$store.dispatch('post/index', { page: 1, category: this.post.category })
        .then(({ posts, meta }) => {
          this.samePosts = posts.filter(post => post.slug !== this.post.slug)
        })
    }
  },
}
</script>

<style scoped>
</style>
