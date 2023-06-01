<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <Map />
    </t-card>
</template>
  
<script>
import Map from '@/components/main/Map/MapView.vue'

export default {
    name: 'Map',

    components: {
        Map
    },

    data() {
        return {
            title: '地图概览'
        }
    },
};
</script>

<style lang="less" scoped>
.t_card_main {
    width: 100%;
    height: 100%;
}
</style>

