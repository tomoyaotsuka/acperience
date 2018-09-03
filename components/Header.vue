<template>
  <header class="header">
    <h1 class="title">
      <nuxt-link to="/">Acperience</nuxt-link>
    </h1>
  </header>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '~assets/styles/_common/fonts';
@import '~assets/styles/_common/functions';
@import '~assets/styles/_common/mixin';
@import '~assets/styles/_common/variables';

.header {
  position: relative;
  margin: 0 $col1;
  padding: $row6 0 0;
}

.title {
  @include text-crop(1.6);

  a {
    border-bottom: none;
  }
}
</style>
