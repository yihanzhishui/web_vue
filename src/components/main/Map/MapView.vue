<template>
    <div id="container"></div>
</template>
  
<script>
export default {
    name: 'Map',

    mounted() {
        //页面加载完,开始异步引入高德地图
        //创建了一个回调函数,高德地图加载完毕会调用
        window.onLoad = function () {
            // 所有关于地图的逻辑全部都要写在这个回调里面
            // 保证高德地图加载完毕
            var map = new AMap.Map("container", {
                center: [104.149000, 30.676612],
                zoom: 16
            });
        };
        // key是申请的值
        let url =
            "https://webapi.amap.com/maps?v=1.4.15&key=0a72a0fa26c13e8fa8581cbe701c0620&callback=onLoad";
        //创建一个 script dom元素
        // doc需要补全document
        var jsapi = document.createElement("script");
        //设定script标签属性
        jsapi.charset = "utf-8";
        jsapi.src = url;
        //将API文件引入页面中,加载完毕以后会调用函数
        document.head.appendChild(jsapi);
    },
};
</script>

<style lang="less" scoped>
#container {
    width: 100%;
    height: 100%;
}

.t_card_main {
    width: 100%;
    height: 100%;
}
</style>

