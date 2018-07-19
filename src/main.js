import Vue from 'vue'
import App from './App'
import setWindowVideoPlayingDefault from './utils/IdleTimer'

Vue.config.productionTip = false

setWindowVideoPlayingDefault()

const videoKiosk = new Vue({
  render: h => h(App)
}).$mount('#app')

window.videoKiosk = videoKiosk
