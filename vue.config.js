module.exports = {
	devServer: {
		host: "127.0.0.1",
	},
  css: {
    sourceMap: true,
    loaderOptions: {
      sass: {
        data: `@import "@/styles/global.scss";`
      }
    }
  }
}