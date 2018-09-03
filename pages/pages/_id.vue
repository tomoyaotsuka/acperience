<template>
  <div>
    <ul>
      <li class="item"
        v-for="(post, i) in posts"
        v-if="Number(params) * 2 - 3 < i && i < Number(params) * 2"
        :key="post.id"
      >
        {{ post.fields.title }}
      </li>
    </ul>
    <ul class="pagenation"></ul>
    <div v-if="posts.length > Number(params) * 2">
      <a :href="Number(params) + 1">Next</a>
    </div>
  </div>
</template>

<script>
  import { createClient } from '~/plugins/contentful.js'
  import PostList from '~/components/PostList.vue'

  const client = createClient()
  export default {
    components: {
      PostList
    },
    asyncData ({ env, params }) {
      return client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        // order: '-sys.createdAt',
        'order': '-fields.publicationDate'
        // 'limit': 3
      }).then(entries => {
        return {
          posts: entries.items,
          params: params.id
        }
      }).catch(console.error)
    }
  }
</script>

<style lang="scss" scoped>
@import '~assets/styles/_common/fonts';
@import '~assets/styles/_common/functions';
@import '~assets/styles/_common/mixin';
@import '~assets/styles/_common/variables';

.index {
  margin: $row6 0;
}
</style>