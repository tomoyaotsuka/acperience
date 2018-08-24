<template>
  <div class="app">
    <Header></Header>
    <nuxt/>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'

  export default {
    components: {
      Header,
      Footer
    }
  }
</script>


<style lang="scss">
@import '~assets/styles/_common/fonts';
@import '~assets/styles/_common/functions';
@import '~assets/styles/_common/mixin';
@import '~assets/styles/_common/variables';
@import '~assets/styles/_common/reboot';
@import '~assets/styles/_foundation/base';

.app {
  max-width: 1024px;
  margin: 0 auto;
}
</style>

