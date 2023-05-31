<template>
    <div class="swiper_image">
        <t-swiper :duration="300" :interval="2000" trigger="click">
            <t-swiper-item class="t_swiper_item" v-for="item in swiper_image" :key="item.index">
                <!-- <div class="swiper_image_item" :style="swiper_image" /> -->
                <img class="swiper_image_item" :style="swiper_image" :src="item.content" />
            </t-swiper-item>
        </t-swiper>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 首页轮播图
            swiper_image: [
                { content: 'https://ts1.cn.mm.bing.net/th/id/R-C.d3ef462947fff8d83636ac61063133fe?rik=WvjhjdLrj5xPLQ&riu=http%3a%2f%2fwww.nc5z.com%2fwp-content%2fuploads%2f2017%2f05%2funnamed-file-19.jpg&ehk=HVs5tYt%2bIsGT%2fc%2bzfSnp16mmir4MuWGdxMiMELFGo3s%3d&risl=&pid=ImgRaw&r=0', index: 1 },
                { content: 'https://ts1.cn.mm.bing.net/th/id/R-C.b5ec6614e8e2e6345a3794813a2bd33f?rik=MGt7lONPwbiMXQ&riu=http%3a%2f%2fnews.lzu.edu.cn%2fUploadFiles%2fImage%2f201212%2f20121218171256.jpg&ehk=eMdq2TWZnygSeg3fbrPff%2b8SynhfZMQddz1Qw6xQXoY%3d&risl=&pid=ImgRaw&r=0', index: 2 },
                { content: 'https://ts1.cn.mm.bing.net/th/id/R-C.f265678d14c9c935709618d9a4c30dee?rik=DkAqqF6xUKLA8g&riu=http%3a%2f%2fnews.lzu.edu.cn%2fUploadFiles%2fImage%2f201212%2f20121218171234.jpg&ehk=7QqngDuNhR5HgYaKrlXrQa1rndaqhg7qtyXqlmtiKuQ%3d&risl=&pid=ImgRaw&r=0', index: 3 },
                { content: 'https://ts1.cn.mm.bing.net/th/id/R-C.ccd2d9eb6be113913018a14a99d5056f?rik=fYoHZZ1affBG2A&riu=http%3a%2f%2fimg.lanimg.com%2ftuku%2fyulantu%2f110107%2f1615-11010H0530199.jpg&ehk=hKf9GmW6KrWL2h0FEhSqB77qxaFwjhW7pXbeUNoC8a4%3d&risl=&pid=ImgRaw&r=0', index: 4 },
            ],
        }
    }
}
</script>

<style lang="less" scoped>
.swiper_image {
    width: 50%;
    display: flex;
    position: absolute;
    display: flex;
    top: 50%;
    transform: translate(-15%, -50%);
}

.swiper_image_item {
    width: 100%;
    border-radius: 5px;
    height: 80%;
}

.t_swiper_item {
    height: 800px;
}
</style>