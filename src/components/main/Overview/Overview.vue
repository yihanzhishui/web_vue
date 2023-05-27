<template>
    <t-card :title="title" header-bordered class="t_card_main">
        <template>
            <t-card :title="my_book" header-bordered>
                <!-- 我的预约-表格 -->
                <t-table rowKey="index" :data="my_book_content" :columns="my_book_columns" :stripe="true" :bordered="true"
                    :hover="true" cellEmptyContent="-" resizable></t-table>
            </t-card>
            <t-card :title="empty_room" header-bordered style="margin-top:20px">
                <!-- 空教室-表格 -->
                <t-table rowKey="index" :data="empty_room_content" :columns="empty_room_columns" :stripe="true"
                    :bordered="true" :hover="true" cellEmptyContent="-" resizable></t-table>
            </t-card>
            <t-card :title="recommend" header-bordered style="margin-top:20px">
                <!-- 推荐预约-表格 -->
                <t-table rowKey="index" :data="recommend_content" :columns="recommend_columns" :stripe="true"
                    :bordered="true" :hover="true" cellEmptyContent="-" resizable></t-table>
            </t-card>
        </template>
    </t-card>
</template>

<script>

export default {
    data() {
        return {
            title: '概览',
            my_book: '我的预约',
            empty_room: '空教室',
            recommend: '推荐预约',
            // 表头
            my_book_columns: [
                { colKey: 'classroom', title: '教室', },
                { colKey: 'status', title: '是否预约', },
                { colKey: 'address', title: '地址' },
                { colKey: 'time', title: '预约时间段' },
            ],
            empty_room_columns: [
                { colKey: 'classroom', title: '教室', },
                { colKey: 'empty_status', title: '空闲状态', },
                { colKey: 'operate', title: '操作', fixed: 'right', },
            ],
            recommend_columns: [
                { colKey: 'classroom', title: '教室', },
                { colKey: 'empty_status', title: '空闲状态', },
                { colKey: 'address', title: '地址' },
                { colKey: 'operate', title: '操作', fixed: 'right', },
            ],
            // 表格内容
            my_book_content: [],
            empty_room_content: [],
            recommend_content: [],
        }
    },

    methods: {
        // 获取我的预约表格数据
        async getMyBook() {
            const { data: res } = await this.$http.post("", {
                // username: LOGIN.account,
                // password: LOGIN.password,
            });
            if (res.meta.status === 400) {
                this.$message.error({ content: "获取数据失败", closeBtn: true });
            } else if (res.meta.status === 200) {
                this.$message.success({ content: "获取数据成功", closeBtn: true });
            }
        },

        // 获取空教室数据
        async getEmptyRoom() {
            const { data: res } = await this.$http.post("", {
                // username: LOGIN.account,
                // password: LOGIN.password,
            });
            if (res.meta.status === 400) {
                this.$message.error({ content: "获取数据失败", closeBtn: true });
            } else if (res.meta.status === 200) {
                this.$message.success({ content: "获取数据成功", closeBtn: true });
            }
        },


        // 获取推荐预约教室
        async getRecomandBook() {
            const { data: res } = await this.$http.post("", {
                // username: LOGIN.account,
                // password: LOGIN.password,
            });
            if (res.meta.status === 400) {
                this.$message.error({ content: "获取数据失败", closeBtn: true });
            } else if (res.meta.status === 200) {
                this.$message.success({ content: "获取数据成功", closeBtn: true });
            }
        }
    }
};


</script>

<style lang="less" scoped>
.t_card_main {
    height: 100%;
}
</style>