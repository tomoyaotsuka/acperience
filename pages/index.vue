<template>
  <main class="index">
    <PostList :posts="posts"></PostList>
  </main>
</template>

<script>
  import { createClient } from '~/plugins/contentful.js'
  import PostList from '~/components/PostList.vue'

  const client = createClient()
  export default {
    components: {
      PostList
    },
    asyncData ({ env }) {
      return client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        // order: '-sys.createdAt',
        'order': '-fields.publicationDate'
        // 'limit': 3
      }).then(entries => {
        return {
          posts: entries.items
        }
      }).catch(console.error)
    }
  }
</script>

<style lang="scss">
@import '~assets/styles/_common/fonts';
@import '~assets/styles/_common/functions';
@import '~assets/styles/_common/mixin';
@import '~assets/styles/_common/variables';

.index {
  margin: $row6 0;
}
</style>
