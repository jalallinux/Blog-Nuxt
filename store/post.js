export const state = () => ({
  posts: [],
  meta: {},
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
  async index(context, { category, page }) {
    try {
      if (JSON.stringify(context.state.category) !== JSON.stringify(category)
        || context.state.meta.current_page !== page) {
        const data = (await this.$axios.$get(`/post?page=${page}&category=${category ? category.slug : ''}`))
        context.commit('set', {
          ...data, category
        })
      }
      return {
        posts: context.state.posts,
        meta: context.state.meta
      }
    } catch (e) {
      return e
    }
  },
  async show(context, slug) {
    return context.state.posts.find(post => post.slug === slug)
      || (await this.$axios.get(`/post/${slug}`)).data.data
  },
}

