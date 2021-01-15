<template>
  <div class="pa-5" v-html="processMarkdown" />
</template>

<script>
import marked from 'marked'
import highlight from 'highlightjs'
import "highlight.js/styles/atom-one-dark-reasonable.css"

export default {
  name: "MarkdownPreview",

  props: {
    markdown: {
      type: String,
      default: ''
    },
    theme: {
      type: String,
      default: 'railscasts'
    },
  },

  computed: {
    processMarkdown() {
      return marked(this.markdown, {
        highlight(md) {
          return highlight.highlightAuto(md).value
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
