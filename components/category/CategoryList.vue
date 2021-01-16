<template>
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
            <v-icon large>{{ `mdi-alpha-${category.name.toLowerCase().charAt(0)}` }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="ucFirst(category.name)" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: "CategoryList",
  data() {
    return {
      categories: [],
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      this.fetchCategories()
    },
    fetchCategories() {
      console.log(this.$store.getters.categories)
      !this.$store.state.category.categories.length
        ? this.$store.dispatch('category/fetch').then(({ data }) => this.categories = data)
        : this.categories = this.$store.state.category.categories
    },
    ucFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },

  computed: {
    categoryTitle() {
      return this.category ? `سوالات دسته ${this.category.name}` : `آخرین سوالات`
    }
  },

}
</script>

<style scoped>

</style>
