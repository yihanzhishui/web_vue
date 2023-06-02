<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template class="main_content">
            <t-layout class="result_content">
                <t-aside class="building">
                    <t-dropdown trigger="click" :options="buiding_options" @click="onChooseBuilding">
                        <t-button variant="outline">
                            <span class="dropdown__text">
                                {{ building_select_default }}
                                <chevron-down-icon size="20" />
                            </span>
                        </t-button>
                    </t-dropdown>
                </t-aside>
                <t-layout>
                    <t-content>
                        <t-layout v-show="is_classromm_show">
                            <t-aside class="classroom">
                                <t-dropdown :options="classroom_options" trigger="click" @click="onChooseClassRoom">
                                    <t-button variant="outline">
                                        <span class="dropdown__text">
                                            {{ classroom_select_default }}
                                            <chevron-down-icon size="20" />
                                        </span>
                                    </t-button>
                                </t-dropdown>
                            </t-aside>
                            <t-layout>
                                <t-content>
                                    <!-- 查询结果 -->
                                    <t-card :cover="classroom_info.cover" title="查询" description="查询结果" class="result_card"
                                        v-show="is_result_show">
                                        <template #footer>
                                            <span style="font-size:20px;display:flex;margin-top:10px">
                                                教室空闲状态: {{ classroom_info.class_empty_status }}
                                            </span>
                                            <span style="font-size:20px;display:flex;margin-top:10px">
                                                现有人数: {{ classroom_info.now_people_num }}
                                            </span>
                                        </template>
                                    </t-card>
                                </t-content>
                            </t-layout>
                        </t-layout>
                    </t-content>
                </t-layout>
            </t-layout>
        </template>
    </t-card>
</template>

<script>
import { ChevronDownIcon, HeartIcon, ChatIcon, ShareIcon, MoreIcon, } from 'tdesign-icons-vue';
export default {
    components: {
        ChevronDownIcon,
        HeartIcon,
        ChatIcon,
        ShareIcon,
        MoreIcon,
    },
    data() {
        return {
            title: '查询',
            is_classromm_show: false,
            is_result_show: false,
            building_select_default: '请选择楼栋',
            classroom_select_default: '请选择教室',

            buiding_options: [],
            classroom_options: [],
            // 存储一下教室的id
            classroom_id: [],
            classroom_info: {
                address: '---',
                class_empty_status: '---',
                now_people_num: 0,
                cover: 'https://tdesign.gtimg.com/site/source/card-demo.png',
            }
        }
    },

    mounted() {
        this.getBuildings();
    },

    methods: {

        async getBuildings() {
            let that = this;
            await this.$http.post("queryBuilding")
                .then(function (res) {
                    // 请求成功
                    for (let i = 0; i < res.data.length; i++) {
                        that.buiding_options.push({ 'content': res.data[i], value: i })
                    }
                })
                .catch(function (error) {
                    // 请求失败的处理
                    that.$message.error('获取信息失败, 请稍后重试！')
                    that.$router.replace('/403')
                });
        },

        // 查找教室
        async onChooseBuilding(option) {
            this.is_classromm_show = true;
            this.building_select_default = option.content;
            let that = this;
            await this.$http.post("queryRoomsInBuilding", {
                building: option.content
            })
                .then(function (res) {
                    // 请求成功
                    // that.my_book_content = res.data
                    for (let i = 0; i < res.data.length; i++) {
                        that.classroom_options.push({ 'content': res.data[i].room, 'value': i });
                        that.classroom_id.push({ 'cid': res.data[i].cid, 'value': i })
                    }
                })
                .catch(function (error) {
                    // 请求失败的处理
                    that.$message.error('获取信息失败, 请稍后重试！')
                    that.$router.replace('/403')
                });
        },


        // 查找教室详情
        async onChooseClassRoom(option) {
            this.is_result_show = true;
            this.classroom_select_default = option.content;
            let that = this;
            await this.$http.post("findClassroomByCid", {
                cid: that.classroom_id[option.value].cid
            })
                .then(function (res) {
                    // 请求成功
                    console.log(res.data)
                    that.classroom_info.address = res.data.building + '-' + res.data.room;
                    that.classroom_info.now_people_num = res.data.people_number;

                    that.classroom_info.cover = res.data.picture == null ? 'https://tdesign.gtimg.com/site/source/card-demo.png' : res.data.picture;

                    let temp = res.data.people_number;
                    if (temp < 30) {
                        that.classroom_info.class_empty_status = '教室人数较少'
                        return
                    } else if (temp < 60) {
                        that.classroom_info.class_empty_status = '教室人数未过半'
                        return
                    } else if (temp < 90) {
                        that.classroom_info.class_empty_status = '教室空位剩余不足一半'
                        return
                    } else if (temp < 120) {
                        that.classroom_info.class_empty_status = '教室几乎没有空位了'
                        return
                    }
                })
                .catch(function (error) {
                    // 请求失败的处理
                    that.$message.error('获取信息失败, 请稍后重试！')
                    that.$router.replace('/403')
                });
        },

        // 获取格式化后的时间字符串
        formatDate() {
            let date = new Date();
            let year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate()
            let newTime = year + '-' + month + '-' + day
            return newTime;
        },

    }
};


</script>

<style lang="less" scoped>
.t_card_main {
    width: 100%;
    height: 100%;
}

.building {
    border-right: 1px;
}

.main_content {
    height: 100%;
}

.result_card {
    width: 100%;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.result_content {
    height: 100%;
}

.t_dropdown_button {
    margin: 0;
    width: 100%;
    height: 100%;

}

.dropdown__text {
    margin: 0;
    width: 100%;
    height: 100%;
}
</style>