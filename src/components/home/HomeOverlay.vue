<template>
  <div id="credits-overlay">
    <div class="credits-container" @click="onCloseOverlay">
      <p v-for="(credit, index) in credits"
        :key="index"
        ref="p" >
        {{ credit }}
      </p>
      <img src="/images/close.png" alt="Close" class="close-btn">
    </div>
  </div>
</template>

<script>
export default {

  name: 'HomeOverlay',

  props: {
    credits: {
      type: Array,
      required: true
    },
    onCloseOverlay: {
      type: Function,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>

#credits-overlay {
  width: 100vw;
  height: 100vh;
  z-index: 2;
  background: {
    color: rgba(0,0,0,0.9);
  };
  position: fixed;
  top: 0;
  left: 0;

  .credits-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
      margin-bottom: 30px;
      color: $text-primary-color;
      width: 65%;
      font-size: 21pt;
      line-height: 1.6;
      text-align: left;
    }

    .close-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 30px;
      padding: 20px 30px;
    }
  }
}

</style>
