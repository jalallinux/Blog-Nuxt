<template>
  <v-row justify="center" align="center">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-container v-if="!posts.length" style="height: 300px;">
          <v-row
            class="fill-height"
            align-content="center"
            justify="center"
          >
            <v-col
              class="subtitle-1 text-center"
              cols="12"
            >
              در حال دریافت اطلاعات
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="primary"
                indeterminate
                rounded
                height="6"
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-container>
        <PostList v-else :title="categoryTitle" :posts="posts"/>
        <CategoryList />
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
  fetchOnServer: false,
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

  async fetch() {
    this.init()
  },

  methods: {
    init() {
      this.setCurrentCategory()
      this.getPosts()
    },
    setCurrentCategory() {
      const slug = this.$route.query.category || ''
      this.category = this.$store.state.category.categories
        .find(category => category.slug === slug) || null
    },
    getPosts() {
      this.$store.dispatch('post/index', { page: this.page, category: this.category })
        .then(({ posts, meta }) => {
          console.log(meta)
          this.posts = posts
          this.maxPage = meta.last_page
          this.page = meta.current_page
        })
    }
  },

  computed: {
    categoryTitle() {
      return this.category ? `سوالات دسته ${this.category.name}` : `آخرین سوالات`
    },
  },

  watch: {
    page(toPage, fromPage) {
      this.getPosts()
    },
    $route(toUrl, fromUrl) {
      // fetch only when category changed
      if (toUrl.path === fromUrl.path) this.init()
    },
  },
}
</script>

<style scoped>
</style>
