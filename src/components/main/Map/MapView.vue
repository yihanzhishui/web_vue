<template>
    <div id="container">
    </div>
</template>
  
<script>
import AMapLoader from '@amap/amap-jsapi-loader';

export default {
    name: 'Map',

    data() {
        return {
            infoWindow: null,
            map: null,// 存储上述坐标点
            position_list: [
                [104.15050919387815, 30.67794202667318],
                [104.14508576725004, 30.6750330695582],
                [104.14180810783384, 30.671842574159207],
                [104.15146942470548, 30.67614498897294],
                [104.14170081947324, 30.673725048406233]
            ],
            m_content: [
                '<div>地址：东区教学楼</div>',
                '<div>地址：第六教学楼</div>',
                '<div>地址：第九教学楼</div>',
                '<div>地址：东区图书馆</div>',
                '<div>地址：水上图书馆</div>'],
        }
    },

    mounted() {
        this.initMap();
    },

    methods: {
        initMap() {
            AMapLoader.load({
                key: "0a72a0fa26c13e8fa8581cbe701c0620",             // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: ['AMap.Scale'],       // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            }).then((AMap) => {
                this.map = new AMap.Map("container", {  //设置地图容器id
                    viewMode: "3D",    //是否为3D地图模式
                    zoom: 16,           //初始化地图级别
                    center: [104.149000, 30.676612], //初始化地图中心点位置
                });

                this.infoWindow = new AMap.InfoWindow({ offset: new AMap.Pixel(0, -30) });

                for (var i = 0, marker; i < this.position_list.length; i++) {
                    var marker = new AMap.Marker({
                        position: this.position_list[i],
                        map: this.map
                    });

                    marker.content = this.m_content[i];
                    marker.on('click', this.markerClick);
                    marker.emit('click', { target: marker });
                }

                // 调整缩放等级
                this.map.setFitView();

            }).catch(e => {
                console.log(e);
            });
        },

        markerClick(e) {
            this.infoWindow.setContent(e.target.content);
            this.infoWindow.open(this.map, e.target.getPosition());
        }
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

