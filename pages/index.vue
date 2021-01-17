<template>
  <v-row justify="center" align="center">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <PostList :title="categoryTitle" :posts="posts"/>
        <CategoryList @fetched="init" />
      </v-layout>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination circle v-model="page" :length="maxPage"/>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </v-row>
</template>

<script>
import PostList from "~/components/post/PostList";
import CategoryList from "@/components/category/CategoryList";

export default {
  name: 'index',
  components: {
    CategoryList,
    PostList
  },
  auth: false,
  head: {
    title: 'Home',
    meta: [
      {
        hid: 'description',
        name: 'description',
        content: 'Forum page description'
      }
    ],
  },

  data() {
    return {
      category: null,
      posts: [],
      page: 1,
      maxPage: 1,
    }
  },

  methods: {
    init() {
      this.setCurrentCategory()
      this.$store.state.post.posts.length ? this.setPosts() : this.fetchPosts()
    },
    setCurrentCategory() {
      const slug = this.$route.query.category || ''
      this.category = this.$store.state.category.categories
        .find(category => category.slug === slug) || null
    },
    fetchPosts() {
      // fetch posts from API
      this.$store.dispatch('post/fetch', { page: this.page, category: this.category })
        .then(({data, meta}) => {
          this.posts = data
          this.maxPage = meta.last_page
        })
    },
    setPosts() {
      // set posts from post store
      this.posts = this.$store.state.post.posts
      this.category = this.$store.state.post.category
      this.maxPage = this.$store.state.post.meta.last_page
      this.page = this.$store.state.post.meta.current_page
    }
  },

  computed: {
    categoryTitle() {
      return this.category ? `سوالات دسته ${this.category.name}` : `آخرین سوالات`
    },
  },

  watch: {
    page(toPage, fromPage) {
      // fetch only when set new page
      if (this.page !== this.$store.state.post.current_page) this.fetchPosts();
    },
    $route(toUrl, fromUrl) {
      // fetch only when category changed
      if (toUrl.path === fromUrl.path) {
        this.page = 1
        this.setCurrentCategory()
        this.fetchPosts()
      }
    },
  },
}
</script>

<style scoped>
</style>
