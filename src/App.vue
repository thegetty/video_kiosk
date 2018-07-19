<template>
  <div id="app" v-if="config" :style="{backgroundImage: 'url(' + bgImage + ')'}">

    <PlayerScreen v-if="videoToPlay"
      :videoURL="videoToPlay"
      :captionsURL="captions"
      @endOfVideo="onVideoEnd"/>

    <div v-else id="home-screen-container" :class="count">
      <HomeScreen v-for="(video, index) in videos"
        :key="index"
        :vindex="index"
        :config="video"
        @playVideo="handlePlayVideo"/>
      <div id="gg-content-message">
        <p>Watch videos about art and artists in the Museum's collection.</p>
      </div>
    </div>

    <ConfigError v-show="error" />
  </div>
</template>

<script>
import axios from 'axios'
import HomeScreen from './components/HomeScreen'
import PlayerScreen from './components/PlayerScreen'
import ConfigError from './components/ConfigError'
import Analytics from './utils/Analytics'
import setVideoKioskPlaying from './utils/IdleTimer'

export default {
  name: 'app',

  data () {
    return {
      config: null,
      count: 'videoCount0',
      videos: null,
      error: false,
      bgImage: '/images/home-default-bg.jpg',
      videoToPlay: null,
      captions: null,
      videoPlaying: false,
      analytics: null
    }
  },

  beforeCreate () {
    axios.get('/config.json')
      .then(res => {
        this.config = res.data
        this.count = 'videoCount' + this.config.videoCount
        this.videos = this.config.videos

        let id = this.config.ga
        let kiosk = this.config.kiosk
        this.analytics = new Analytics(id, kiosk)
      })
      .catch(err => {
        this.error = true
        console.error(`Error getting config file:\n${err}`)
      })
  },

  methods: {
    handlePlayVideo: function (index) {
      let video = this.videos[index]
      this.videoToPlay = video.video
      this.captions = video.captions
      this.videoPlaying = true

      this.analytics.videoPlayEvent(video.homeScreen.title)
    },
    onVideoEnd: function () {
      this.videoToPlay = null
      this.captions = null
      this.videoPlaying = false
    }
  },

  watch: {
    videoPlaying: function (newVal, oldVal) {
      setVideoKioskPlaying(newVal)
    }
  },

  components: {
    HomeScreen,
    ConfigError,
    PlayerScreen
  }
}
</script>

<style lang="scss">
@font-face {
  font-family: "Univers";
  src: url(/fonts/UniversNextPro-Regular.otf) format("opentype");
}

@font-face {
  font-family: "Minion";
  src: url(/fonts/MinionPro-Regular.otf) format("opentype");
}

@import "~normalize.css/normalize";
@import "./styles/typography";

#app {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;
  background: {
    size: cover;
    repeat: no-repeat;
  }

  #home-screen-container {
    display: grid;
    width: 100%;
    height: 100%;

    &.videoCount4 {
      grid-template-rows: 1fr 100px 1fr;
      grid-template-columns: 1fr 1fr;
    }
  }

  #gg-content-message {
    grid-row-start: 2;
    grid-column-start: span 2;
    justify-self: center;
    align-self: center;
    max-width: 75%;
    color: $text-primary-color;
    text-align: center;
    text-shadow: 2px 2px 2px rgba(#222222, 0.5);
  }
}
</style>
