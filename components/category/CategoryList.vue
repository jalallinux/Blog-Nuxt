<template>
  <v-flex md2>
    <v-subheader v-text="title" />
    <v-card class="mb-3">
      <v-list>
        <v-list-item
          v-for="(category, i) in categories"
          :key="i"
          :to="{ query: { category: category.slug } }"
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


  props: {
    title: {
      type: String,
      default: 'دسته بندی ها'
    },
  },

  created() {
    this.fetchCategories()
  },

  methods: {
    fetchCategories() {
      !this.$store.state.category.categories.length
        ? this.$store.dispatch('category/fetch').then(({ data }) => this.categories = data)
        : this.categories = this.$store.state.category.categories
    },
    ucFirst(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  watch: {
    categories(newValue, oldValue) {
      if (newValue.length) this.$emit('fetched')
    }
  },
}
</script>

<style scoped>

</style>
