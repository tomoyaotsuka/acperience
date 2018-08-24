import Vue from 'vue'

export default ({app}) => {
  const DELAY_CHANGE_URL = 500
  let created = false
  const gtm = app.gtm = {
    push (object = {}) {
      if (process.browser) {
        if (!window.dataLayer) return
        window.dataLayer.push(object)
      }
    }
  }

  gtm.push({event: 'pageview'})

  app.router.afterEach(() => {
    Vue.nextTick(() => {
      setTimeout(() => {
        if (created) gtm.push({event: 'changeurl'})
        created = true
      }, DELAY_CHANGE_URL)
    })
  })
}