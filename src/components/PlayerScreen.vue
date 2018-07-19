<template>
  <div id="video-container">
    <video playsinline>
      <source :src="'/video/' + videoURL" type="video/mp4">
        <track :src="'/video/' + captionsURL" kind="subtitles" srclang="en" label="English" default>
    </video>
    <img src="/images/close.png" alt="Close" class="close-btn" @click="emitEndOfVideo">
  </div>
</template>

<script>
import Plyr from 'plyr'

export default {

  name: 'PlayerScreen',

  data () {
    return {
      player: {},
      pauseIdleTimer: null
    }
  },

  mounted () {
    const videoEl = this.$el.firstChild
    this.player = new Plyr(videoEl, {
      controls: ['play', 'progress', 'current-time', 'restart'],
      muted: true,
      captions: {
        active: true,
        language: 'auto',
        update: false
      }
    })

    // Webkit may diable autoplay, so wait until mp4 is ready then play
    this.player.on('ready', this.playAndGoFullscreen)
    // Only called after a pause event
    this.player.on('play', this.handleVideoPlay)
    // On pause we want to start a timer to revert back to home
    this.player.on('pause', this.handleVideoPause)
    // On end go back to home
    this.player.on('ended', this.emitEndOfVideo)
  },

  beforeDestroy () {
    this.player.destroy()
  },

  methods: {
    playAndGoFullscreen () {
      this.player.play()
      // this.player.fullscreen.enter()
    },
    handleVideoPause () {
      // On a pause wait a minute then go home
      this.pauseIdleTimer = setTimeout(() => {
        this.emitEndOfIdleTimer()
      }, 60000)
    },
    handleVideoPlay () {
      clearTimeout(this.pauseIdleTimer)
    },
    emitEndOfIdleTimer () {
      this.$emit('endOfVideo')
    },
    emitEndOfVideo () {
      this.$emit('endOfVideo')
    }
  },

  props: {
    videoURL: {
      type: String,
      required: true
    },
    captionsURL: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import "../styles/vendor/plyr/plyr";
</style>

<style lang="scss" scoped>
#video-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #000;
  z-index: 10;
  display: flex;
  align-items: center;

  .close-btn {
    position: absolute;
    top: 0;
    right: 0;
    width: 30px;
    padding: 20px 30px;
  }
}

.plyr + img {
  opacity: 1;
  transition: opacity 0.4s ease-in-out;
}

.plyr.plyr--hide-controls + img {
  opacity: 0;
}

video {
  width: 100vw;
}
</style>
