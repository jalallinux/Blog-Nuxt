<template>
  <v-row justify="center" align="center">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <PostList :title="categoryTitle" :posts="questions" />
        <CategoryList />
      </v-layout>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination circle v-model="page" :length="maxPage"></v-pagination>
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
      questions: [],
      page: 1,
      maxPage: 1,
    }
  },

  created() {
    this.init()
  },

  methods: {
    async init() {
      await this.fetchCurrentCategory(this.$route.query.category || '')
      this.fetchPosts()
    },

    async fetchCurrentCategory(slug) {
      if (!slug) {
        this.category = null
        return
      }
      await this.$api
        .$get(`/category/${slug}`)
        .then(({ data }) => {
          this.category = data;
        })
        .catch(err => {
          this.$router.push('/')
        })
    },
    fetchPosts() {
      this.$api
        .$get(`/post?page=${this.page}&per_page=40&&category=${this.category ? this.category.slug : ''}`)
        .then(({ data, meta }) => {
          this.questions = data;
          this.maxPage = meta.last_page;
        })
        .catch((err) => {
          console.log(err)
          this.$notify.error({
            message: err.response.data.message || err.message
          })
        });
    },
  },

  computed: {
    categoryTitle() {
      return this.category ? `سوالات دسته ${this.category.name}` : `آخرین سوالات`
    }
  },

  watch: {
    page(newValue, oldValue) {
      this.fetchPosts();
    },
    $route(to, from) {
      this.init()
    }
  },
}
</script>

<style scoped>
</style>
