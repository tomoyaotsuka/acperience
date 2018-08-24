<template>
  <main class="post">
    <h2 class="headline">
      {{ currentPost.fields.title }}
      </h2>
    <p class="date">
      {{ currentPost.fields.publicationDate | formatDate }}
    </p>
    <div class="visual">
      <img
        v-if="currentPost.fields.thumbnail"
        :src="currentPost.fields.thumbnail.fields.file.url"
      >
    </div>
    <div class="bodycopy">
      <vue-markdown>{{ currentPost.fields.body }}</vue-markdown>
    </div>
    <div v-if="currentPost.fields.associateName" class="babylink-box">
      <div class="babylink-image">
        <a :href="currentPost.fields.associateUrl" rel="nofollow" target="_blank">
          <img :src="currentPost.fields.associateImage" width="51" height="75">
        </a>
      </div>
      <div class="babylink-info">
        <div class="babylink-title">
          <a :href="currentPost.fields.associateUrl" rel="nofollow" target="_blank">
            {{ currentPost.fields.associateName }}
          </a>
        </div>
        <div class="babylink-manufacturer">
          {{ currentPost.fields.associateAuthor }}
        </div>
      </div>
      <!-- <div class="booklink-footer" style="clear: left"></div> -->
    </div>
    <nav class="pagination">
      <ul>
        <li v-if="prevPost" class="prev">
          <nuxt-link :to="'/posts/'+prevPost.fields.slug">
          <!-- <a :href="'./'+prevPost.fields.slug"> -->
            &laquo; {{ prevPost.fields.title }}
          <!-- </a> -->
          </nuxt-link>
        </li>
        <li v-if="nextPost" class="next">
          <nuxt-link :to="'/posts/'+nextPost.fields.slug">
          <!-- <a :href="'./'+nextPost.fields.slug"> -->
            &raquo; {{ nextPost.fields.title }}
          <!-- </a> -->
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </main>
</template>

<script>
import { createClient } from '~/plugins/contentful.js'
import VueMarkdown from 'vue-markdown'

const client = createClient()

export default {
  head () {
    return {
      title: this.currentPost.fields.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.currentPost.fields.description
        },
        {
          property: 'og:url',
          content: `https://tomoyaotsuka.github.io/acperience${this.$route.path}`
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: this.currentPost.fields.title
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.currentPost.fields.description
        },
        {
          property: 'og:image',
          content: `https://tomoyaotsuka.github.io/acperience/images/posts/${this.currentPost.fields.slug}/thumbnail.jpg`
        },
        {
          property: 'twitter:url',
          content: `https://tomoyaotsuka.github.io/acperience${this.$route.path}/?share=tw`
        }
      ]
    }
  },
  data () {
    return {
      allPosts: [],
      currentPost: []
    }
  },
  components: {
    VueMarkdown
  },
  asyncData ({ env, params }) {
    return client.getEntries({
      'content_type': env.CTF_BLOG_POST_TYPE_ID,
      'order': '-fields.publicationDate'
    }).then(entries => {
      const posts = entries.items
      const current = posts.filter(function (item) {
        return item.fields.slug === params.slug
      })
      return {
        allPosts: posts,
        currentPost: current[0]
      }
    }).catch(console.error)
  },
  computed: {
    dateOrder: function () {
      for (let i = 0; i < this.allPosts.length; i++) {
        if (this.allPosts[i].fields.publicationDate === this.currentPost.fields.publicationDate) {
          return i
        }
      }
    },
    nextPost: function () {
      if (this.dateOrder === 0) {
        return false
      } else {
        return this.allPosts[this.dateOrder - 1]
      }
    },
    prevPost: function () {
      if (this.dateOrder === this.allPosts.length - 1) {
        return false
      } else {
        return this.allPosts[this.dateOrder + 1]
      }
    }
  },
  filters: {
    formatDate: function (date) {
      const D = new Date(date)
      const y = D.getFullYear()
      const m = D.getMonth()
      const d = D.getDate()
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ];
      return `${months[m]} ${d}, ${y}`
    }
  }
}
</script>

<style lang="scss">
@import '~assets/styles/_common/fonts';
@import '~assets/styles/_common/functions';
@import '~assets/styles/_common/mixin';
@import '~assets/styles/_common/variables';

.post {
  margin: $row6 0;
}

.headline {
  @include text-crop(1.6);
  margin: 0 $col1 $row2;
}

.date {
  @include text-crop(1.1);
  margin: 0 $col1 $row4;
  color: $gray50;
}

.visual {
  margin: 0 0 $row5;
}

.bodycopy {
  margin: 0 $col1 $row6;

  h3 {
    @include text-crop(1.3);
    margin-top: $row8;
    margin-bottom: $row4;
    font-weight: bold;
  }

  h4 {
    @include text-crop(1.3);
    margin-top: $row4;
    margin-bottom: $row1;
    font-weight: bold;
  }

  p {
    margin-bottom: $row2;
  }

  ul,
  ol {
    margin-top: $row4;
    margin-bottom: $row4;
  }
}

.pagination {
  margin: 0 $col1;
}

.babylink-box {
  @include clearfix();
  overflow: hidden;
  margin: $row4 0;
  border: 1px solid $gray10;
  border-radius: 1px;

  .babylink-image {
    float: left;
    width: auto;
    height: auto;
    margin: 0 $col1;
    padding: $row2 $col1 $row2 0;
    border-right: 1px solid $gray10;
    text-align: center;
  }

  .babylink-info {
    padding: $row2 $col1 $row2 0;
    .babylink-title,
    .babylink-manufacturer,
    .babylink-description {
      margin-bottom: $row1;
      font-size: 1.3rem;
      line-height: 1.414;
    }
  }
}

@media screen and (min-width: 769px) {
}
</style>
