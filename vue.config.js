const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        // 请求的代称，写在Axios里的BaseUrl
        target: "http://localhost:8081/", // 真实请求URl
        ws: true,
        changeOrigin: true, // 允许跨域
        pathRewrite: {
          //替换，通配/api的替换成对应字符
          "^/api": "", //当你的接口中没有/api字眼时，采用这种，直接替换成空即可
        },
      },
    },
  },
});
