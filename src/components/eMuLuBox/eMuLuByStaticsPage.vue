<template>
    <div class="catalogue-box" ref="catalogueBox" >

        <div class="catalogue-body">
            <div class="title" >目录</div>
            <ul class="menu-list">
                <a v-for="item of options.mulu" :href="'#title-lv' + item.level + '-' + item.text">
                    <li :class="'catalogue-lv-' + item.level" :title="item.text">{{ item.text }}</li>
                </a>
            </ul>
        </div>
        <div class="box-bg"></div>
    </div>
</template>
<style lang="scss" scoped>
.catalogue-box {
    position: fixed;
    z-index: 1;
    width: 220px;
    .catalogue-body {
        background-color: #fff;
        border: solid 1px #eee;
        border-radius: 2px;
        .title {
            font-size: 14px;
            text-align: center;
            font-weight: 600;
            padding: 6px 0;
            border-bottom: solid 1px #eee;
            cursor: move;
        }
        .menu-list{
            max-height: calc(100vh - 116px);
            overflow: auto;
        }

        a {
            color: #f08c00;
        }

        li {
            padding: 6px 2px;
            list-style-type: none;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;

            &:hover {
                background-color: #fff3bf;
                background-color: #fff8d9;
            }
        }

        .catalogue-lv-1 {
            padding-left: 12px;
        }

        .catalogue-lv-2 {
            padding-left: 24px;
        }

        .catalogue-lv-3 {
            padding-left: 36px;
        }
    }
    .box-bg{
        position: absolute;
        height: calc(100% + 4px);
        width: calc(100% + 4px);
        top: -2px;
        left: -2px;
        z-index: -1;
        cursor: move;
    }
}
</style>
<script>
import mulu from './data/mulu.js'
export default {
    props: {
        top: {
            type: [String, Number],
            default: 42
        },
        leftPadding: {
            type: [String, Number],
            default: 16
        },
        
        
    },
    components:{
        
    },
    data() {
        return {
            options: {
                // mulu: mulu
                mulu: []
            },
        }
    },
    methods: {
        init(list=[]) {
            Object.assign(this.$data, this.$options.data());
            this.$nextTick(()=>{
                this.options.mulu=list;
            })
        },
    },
    created() {
       
    }
}
</script>