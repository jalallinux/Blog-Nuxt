export const state = () => ({
  categories: []
})

export const mutations = {
  set(state, data) {
    state.categories = data
  },
}

export const actions = {
  fetch(context) {
    return this.$axios.$get('/category').then((data) => {
      context.commit('set', data.data)
      return data
    })
  },
  async show(context, slug) {
    return context.state.categories.find(category => category.slug === slug)
      || (await this.$axios.get(`/category/${slug}`)).data.data
  },
}

