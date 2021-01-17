<template>
  <div>
    <v-container v-if="!post" style="height: 300px;">
      <v-row
        class="fill-height"
        align-content="center"
        justify="center"
      >
        <v-col
          class="subtitle-1 text-center"
          cols="12"
        >
          در حال دریافت اطلاعات
        </v-col>
        <v-col cols="6">
          <v-progress-linear
            color="primary"
            indeterminate
            rounded
            height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
    <v-card
      color="blue-grey lighten-5 pa-3"
      v-if="post"
      class="mx-auto"
    >

      <v-list-item three-line>
        <v-list-item-avatar rounded size="120" color="grey">
          <v-img :src="post.cover"/>
        </v-list-item-avatar>

        <v-list-item-content class="align-content-start">
          <v-list-item-title class="headline text-wrap mt-2" v-text="post.title"/>
          <v-list-item-subtitle class="py-2">
            <b>نوشته شده توسط </b> {{ post.user.fullName }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <b>در دسته </b> {{ post.category.name }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>

      </v-card-actions>

      <v-divider class="mx-4"/>

      <MarkdownPreview :markdown="post.body"/>

    </v-card>
    <v-col v-if="withComments">
      <v-container class="max-width">
        <v-pagination circle v-model="page" :length="maxPage"/>
      </v-container>
    </v-col>
  </div>
</template>

<script>
import MarkdownPreview from "~/components/app/MarkdownPreview";

export default {
  name: "PostBox",
  components: {
    MarkdownPreview
  },

  props: {
    post: {
      type: Object,
      default: null
    },
    withComments: {
      type: Boolean,
      default: false
    },
  },

  data() {
    return {
      page: 1,
      maxPage: 1
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
