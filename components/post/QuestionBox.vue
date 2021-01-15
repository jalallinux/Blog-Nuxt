<template>
  <v-card
    color="blue-grey lighten-5"
    v-if="question"
    class="mx-auto"
  >

    <v-list-item three-line>
      <v-list-item-avatar rounded size="80" color="grey">
        <v-img :src="question.user.avatar"/>
      </v-list-item-avatar>

      <v-list-item-content class="align-content-start">
        <small class="mb-4" v-text="categoryTitle"/>
        <v-list-item-title class="headline text-wrap mb-1" v-text="question.title"/>
        <v-list-item-subtitle v-text="question.short_description"/>
      </v-list-item-content>

      <v-spacer/>

      <div class="d-flex flex-column justify-content-start align-items-center rounded-b-xl primary">

        <v-btn
          small
          plain
          fab
          :disabled="!pointEnable"
          @click="pointIt"
        >
          <v-icon v-text="pointIcon" />
        </v-btn>

        <h2 class="text-center" v-text="question.point"/>

        <v-divider/>

        <v-btn
          small
          plain
          fab
          :disabled="!favoriteEnable"
          @click="favoriteIt"
        >
          <v-icon class="pa-2" v-text="favoriteIcon"/>
        </v-btn>

      </div>

    </v-list-item>

    <v-card-actions>

    </v-card-actions>

    <v-divider class="mx-4"/>

    <MarkdownPreview :markdown="question.body"/>

  </v-card>
</template>

<script>
import MarkdownPreview from "~/components/app/MarkdownPreview";

export default {
  name: "QuestionBox",
  components: {
    MarkdownPreview
  },

  props: {
    question: {
      type: Object,
      default: null
    },
  },

  data() {
    return {
      favoriteEnable: true,
      pointEnable: true
    }
  },

  methods: {
    favoriteIt() {
      this.favoriteEnable = false;
      this.$axios.post('/api/favorite', {
        question_id: this.question.id,
        favorite: !this.question.favorited
      }).then((response) => {
          this.question.favorited = (response.status === 201)
          this.question.favorited
            ? this.$notify.success({
              message: response.data.message,
              onClosing: () => this.favoriteEnable = true
            })
            : this.$notify.error({
              message: response.data.message,
              onClosing: () => this.favoriteEnable = true
            })
        }).catch(err => {
        this.favoriteEnable = true;
      })
    },
    pointIt() {
      this.pointEnable = false;
      this.$axios.post('/api/point/question', {
        question_id: this.question.id,
        point: !this.question.pointed
      }).then((response) => {
        this.question.pointed = (response.status === 201)
        this.question.point = response.data.data
        this.question.pointed
          ? this.$notify.success({
            message: response.data.message,
            onClosing: () => this.pointEnable = true
          })
          : this.$notify.error({
            message: response.data.message,
            onClosing: () => this.pointEnable = true
          })
      }).catch(err => {
        this.pointEnable = true;
      })
    }
  },

  computed: {
    categoryTitle() {
      return `دسته ${this.question.category}`
    },
    favoriteIcon() {
      return this.question.favorited ? 'mdi-star' : 'mdi-star-outline'
    },
    pointIcon() {
      return this.question.pointed ? 'mdi-minus' : 'mdi-plus'
    }
  },
}
</script>

<style scoped>
.v-list-item__title {
  font-size: 1.3rem !important;
}

.spacer {
  flex-grow: 0 !important;
}

.primary {
  border-bottom: 2px grey solid !important;
  border-right: 2px grey solid !important;
  border-left: 2px grey solid !important;
}
</style>
