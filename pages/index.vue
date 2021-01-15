<template>
  <v-row justify="center" align="center">
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <PostList :title="categoryTitle" :posts="questions" />
        <v-flex md2>
          <v-subheader>دسته بندی ها</v-subheader>
          <v-card class="mb-3">
            <v-list>
              <v-list-item
                v-for="(category, i) in categories"
                :key="i"
                :to="{ path: `?category=${category.slug}` }"
                color="red"
                router
                exact
              >
                <v-list-item-action>
                  <v-icon>{{ `mdi-alpha-${category.name.toLowerCase().charAt(0)}` }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title v-text="ucfirst(category.name)" />
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-flex>
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

export default {
  name: 'index',
  components: {
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
      categories: [],
      questions: [],
      page: 1,
      maxPage: 1,
    }
  },

  created() {
    this.init(true)
  },

  methods: {
    async init(withCategories = false) {
      await this.fetchCurrentCategory(this.$route.query.category || '')
      this.fetchPosts()
      if (withCategories) this.fetchCategories()
    },
    fetchCategories() {
      this.$axios
        .get('/api/category')
        .then(({ data }) => {
          this.categories = data.data;
        })
    },
    async fetchCurrentCategory(slug) {
      if (!slug) {
        this.category = null
        return
      }
      await this.$axios
        .get(`/api/category/${slug}`)
        .then(({ data }) => {
          this.category = data.data;
        })
        .catch(err => {
          this.$router.push('/')
          this.$notify.error({
            message: err.response.data.message || err.message
          })
        })
    },
    fetchPosts() {
      this.$axios
        .get(`/api/post?page=${this.page}&per_page=40&&category=${this.category ? this.category.slug : ''}`)
        .then(({ data }) => {
          this.questions = data.data;
          this.maxPage = data.meta.last_page;
        })
        .catch((err) => {
          this.$notify.error({
            message: err.response.data.message || err.message
          })
        });
    },
    ucfirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
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
