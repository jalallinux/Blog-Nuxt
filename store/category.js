export const state = () => ({
  categories: []
})

export const mutations = {
  set(state, data) {
    state.categories = data
  }
}

export const actions = {
  fetch(context) {
    return this.$api.$get('/category').then(({ data }) => {
      context.commit('set', data)
      return data
    })
  }
}

