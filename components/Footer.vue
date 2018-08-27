<template>
  <footer class="footer">
    <section class="about">
      <h2 class="headline">About</h2>
      <h3 class="subheads">
        Tomoya Otsuka<br>
        Designer, Planner
      </h3>
      <p class="description">
        TOKYO, JAPAN. FROM KAGOSHIMA.<br>
        BIRTHDAY...1987.05.12<br>
        BLOODTYPE...A
      </p>
      <ul class="sns-accounts">
        <li><a href="https://www.pinterest.jp/tomoyaotsuka/" target="_blank">Pinterest</a></li>
        <li><a href="https://www.instagram.com/tomoyaotsuka/" target="_blank">Instagram</a></li>
        <li><a href="https://twitter.com/tomoya_otsuka" target="_blank">Twitter</a></li>
      </ul>
    </section>
    <p class="copyright"><small>© 2018 Tomoya Otsuka.</small></p>
  </footer>
</template>

<style lang="scss" scoped>
@import '~assets/styles/_common/fonts';
@import '~assets/styles/_common/functions';
@import '~assets/styles/_common/mixin';
@import '~assets/styles/_common/variables';

.footer {
  margin: 0 $col1;
  padding: 0 0 $row6;
}

.about {
  margin: 0 0 $row5;
  padding: $row6 0 0;
  box-sizing: border-box;
  border-top: 1px solid $gray10;

  .headline {
    margin: 0 0 $row4;
  }

  .subheads {
    margin: 0 0 $row2;
    font-size: 1.3rem;
  }

  .description {
    margin: 0 0 $row2;
    font-size: 1.1rem;
  }

  .sns-accounts {
    a {
      border-bottom: 1px solid $black;
    }
  }
}

.copyright {
  margin: 0;
  color: $gray50;
}
</style>
