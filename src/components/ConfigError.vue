<template>
  <div>
    <div id="error-box">
      There was an error retriving the config.json file
    </div>
  </div>
</template>

<script>
export default {

  name: 'ConfigError'
}
</script>

<style lang="scss" scoped>
  #error-box {
    position: fixed;
    top: 0;
    left: 0;
    padding: 20px 50px 20px 20px;
    background: #EF7674;
    color: #fff;
    border-bottom-right-radius: 58px;
    border: {
      bottom: 2px solid #DE1A1A;
      right: 2px solid #DE1A1A;
    }
    z-index: 1000;
  }
</style>
