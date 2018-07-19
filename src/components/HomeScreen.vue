<template>
  <div class="home-container">
    <div class="home-main-content" @click="$emit('playVideo', vindex)">
      <div class="home-main-img-container">
        <img :src="mainImage">
      </div>
      <div class="home-info">
        <h2 class="title" v-html="title"></h2>
        <p class="trt" v-if="runTime">{{ runTime }}</p>
        <img src="/images/info.png" class="creditsOverlayToggle" @click="handleCreditsToggle" v-if="credits.length > 0">
      </div>
    </div>
    <HomeOverlay
      v-show="(showCreditsOverlay && credits.length > 0)"
      :credits="credits"
      :onCloseOverlay="handleCloseOverlay"/>
  </div>
</template>

<script>
import HomeOverlay from './home/HomeOverlay'

export default {

  name: 'HomeScreen',

  components: {
    HomeOverlay
  },

  data () {
    return {
      showCreditsOverlay: false,
      mainImage: this.config.homeScreen.image,
      title: this.config.homeScreen.title,
      runTime: this.config.homeScreen.runTime,
      credits: this.config.homeScreen.credits
    }
  },

  methods: {
    handleCreditsToggle () {
      this.showCreditsOverlay = !this.showCreditsOverlay
    },
    handleCloseOverlay () {
      this.showCreditsOverlay = !this.showCreditsOverlay
    }
  },

  props: {
    config: {
      type: Object,
      required: true
    },
    vindex: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

$main-image-max-height: 325px;

.home-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .home-main-content {
    background: rgba(0,0,0,0.5);
    border-radius: 12px;
    width: 95%;
    height: 95%;
    padding: 10px;
    @include box-sizing();
    display: grid;
    grid: $main-image-max-height auto / 100%;

    .home-main-img-container {
      position: relative;
      overflow: hidden;
      border-radius: 6px 6px 0 0;

      img {
        width: 100%;
        position: absolute;
        top: 50%;
        @include transform(translateY(-50%));
      }

      &:after {
        content: ' ';
        position: absolute;
        background: {
          image: url(./home/assets/Play_Button.png);
          size: 100% 100%;
          repeat: no-repeat;
        }
        width: 50px;
        height: 50px;
        bottom: 10px;
        right: 10px;
      }
    }

    .home-info {
      position: relative;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .title {
        color: $text-primary-color;
        margin: 0;
        text-align: center;
        font-size: 35px;
        padding-top: 3px;
      }

      .trt {
        position: absolute;
        bottom: -2px;
        left: 0;
        color: $text-primary-color;
        font-size: 1.2em;
      }
    }
  }
}
</style>
