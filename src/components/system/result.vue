<template>
    <div class="result-container">
        <div class="result-bg-img">
            <t-image :src="dynamicImg" />
        </div>
        <div class="result-title">{{ title }}</div>
        <div class="result-tip">{{ tip }}</div>
        <slot />
    </div>
</template>
<script>
import Vue from 'vue';

export default Vue.extend({
    name: 'Result',
    props: {
        bgUrl: {
            type: String,
            default: '',
        },
        title: {
            type: String,
            default: '',
        },
        tip: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            default: '',
        },
    },
    computed: {
        dynamicImg() {
            switch (this.type) {
                case '403':
                    return 'https://raw.githubusercontent.com/yihanzhishui/PicGo/e429205aa0e79591a0bd32e053698a9c46b481f5/assets-result-403.svg';
                case '404':
                    return 'https://raw.githubusercontent.com/yihanzhishui/PicGo/e429205aa0e79591a0bd32e053698a9c46b481f5/assets-result-404.svg';
                case '500':
                    return 'https://raw.githubusercontent.com/yihanzhishui/PicGo/e429205aa0e79591a0bd32e053698a9c46b481f5/assets-result-500.svg';
                case 'ie':
                    return 'https://raw.githubusercontent.com/yihanzhishui/PicGo/e429205aa0e79591a0bd32e053698a9c46b481f5/assets-result-ie.svg';
                case 'wifi':
                    return 'https://raw.githubusercontent.com/yihanzhishui/PicGo/e429205aa0e79591a0bd32e053698a9c46b481f5/assets-result-wifi.svg';
                case 'maintenance':
                    return 'https://raw.githubusercontent.com/yihanzhishui/PicGo/e429205aa0e79591a0bd32e053698a9c46b481f5/assets-result-maintenance.svg';
                default:
                    return 'https://raw.githubusercontent.com/yihanzhishui/PicGo/e429205aa0e79591a0bd32e053698a9c46b481f5/assets-result-403.svg';
            }
        },
    },
});
</script>
<style lang="less" scoped>
@import '@/style/variables';

.result {
    &-link {
        color: var(--td-brand-color);
        text-decoration: none;
        cursor: pointer;

        &:hover {
            color: var(--td-brand-color);
        }

        &:active {
            color: var(--td-brand-color);
        }

        &--active {
            color: var(--td-brand-color);
        }

        &:focus {
            text-decoration: none;
        }
    }

    &-container {
        min-height: 400px;
        height: 75vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 24px;
    }

    &-bg-img {
        width: 200px;
        color: var(--td-brand-color);
    }

    &-title {
        color: var(--td-text-color-primary);
        font: var(--td-font-title-large);
        font-weight: 500;
        font-style: normal;
        margin-top: 8px;
    }

    &-tip {
        margin: 8px 0 32px;
        font: var(--td-font-body-medium);
        color: var(--td-text-color-secondary);
    }
}
</style>