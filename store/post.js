export const state = () => ({
  posts: [],
  meta:  {},
  category: null
})

export const mutations = {
  set(state, data) {
    state.posts = data.data
    state.meta = data.meta
    state.category = data.category
  }
}

export const actions = {
  fetch(context, payload) {
    return this.$api.$get(`/post?page=${payload.page}&category=${payload.category ? payload.category.slug : ''}`).then((data) => {
      context.commit('set', {
        ...data, category: payload.category
      })
      return data
    })
  }
}
