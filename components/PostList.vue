<template>
  <ul class="post-list">
    <li class="item" v-for="post in posts" :key="post.id">
      <nuxt-link :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}">
        <!-- <div class="thumbnail"
          :style="'background-image: url(./images/posts/' + post.fields.slug + '/thumbnail.jpg);'"
        > -->
          <!-- <img v-if="post.fields.thumbnail" :src="post.fields.thumbnail.fields.file.url" :alt=""> -->
        <div class="thumbnail">
          <img
            v-if="post.fields.thumbnail"
            :src="post.fields.thumbnail.fields.file.url"
          >
        </div>
        <h3 class="headline">{{ post.fields.title }}</h3>
        <!-- <p>{{ post.fields.publicationDate | formatDate }}</p> -->
        <!-- → Read More -->
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ['posts']
}
</script>

<style lang="scss">
@import '~assets/styles/_common/fonts';
@import '~assets/styles/_common/functions';
@import '~assets/styles/_common/mixin';
@import '~assets/styles/_common/variables';

.item {
  margin: 0 0 $row4;

  .thumbnail {
    @include metallic-ratio('golden');
    margin: 0 0 $row4;
    background-position: center;
    background-size: cover;
  }

  .headline {
    @include text-crop(1.3);
    margin: 0 $col1;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

@media screen and (min-width: 769px) {

  .item {

    .thumbnail {
      margin-left: $col1;
      margin-right: $col1;
    }
  }
}
</style>

