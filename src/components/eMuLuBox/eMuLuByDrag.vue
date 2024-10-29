<template>
    <div class="catalogue-box" ref="catalogueBox" :style="{ left: currentX + 'px', top: currentY + 'px' }">

        <div class="catalogue-body">
            <div class="title" @mousedown="handleDragStart">

                <span>目录<Icon type="ios-search" /></span>
                <span class="search-input">
                    <Input v-model="form.key" size="small" placeholder="搜索..." style="width: 120px" />
                </span>

            </div>

            <ul class="menu-list">
                <a v-for="(item, index) of options.mulu" href="javascript:;" @click="clickItem(item, index)">
                    <li v-show="filterKey(item.text)" :class="'catalogue-lv-' + item.level" :title="item.text">{{
                        item.text }}</li>
                </a>
            </ul>
        </div>
        <div class="box-bg" @mousedown="handleDragStart"></div>
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
        justify-content: flex-start;
        padding: 6px 12px;

        .title {
            font-size: 14px;
            text-align: left;
            font-weight: 600;
            padding: 6px 0;
            border-bottom: solid 1px #eee;
            cursor: move;
            height: 34px;

            .search-input {
                margin-left: 10px;
                // display: flex;

                display: none;
                // display: inline-block
            }

            &:hover {
                .search-input {
                    display: inline-block;
                }
            }
        }

        .menu-list {
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

    .box-bg {
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
        placement: {
            type: String,
            default: 'left'
        }

    },
    components: {

    },
    data() {
        return {
            options: {
                // mulu: mulu
                mulu: []
            },
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            originalX: 0,
            originalY: 0,
            form: {
                key: ''
            }
        }
    },
    methods: {
        init(list = []) {
            Object.assign(this.$data, this.$options.data());
            this.$nextTick(() => {
                console.log('this.placement', this.placement)
                if (this.placement == 'left') {
                    this.currentX = parseInt(this.leftPadding);
                } else {
                    this.currentX = window.innerWidth - parseInt(this.leftPadding) - this.$refs.catalogueBox.clientWidth;
                }
                this.currentY = parseInt(this.top);
                this.originalX = this.currentX;
                this.originalY = this.currentY;
                this.options.mulu = list;
            })
        },

        handleDragStart(event) {
            // 记录拖拽开始时的坐标
            this.startX = event.clientX;
            this.startY = event.clientY;
            document.addEventListener('mousemove', this.handleDragging);
            document.addEventListener('mouseup', this.handleDragEnd);
        },
        handleDragging(event) {
            // 计算当前拖拽的距离
            const dx = event.clientX - this.startX;
            const dy = event.clientY - this.startY;
            // 更新拖拽元素的位置
            this.currentX = this.originalX + dx;
            this.currentY = this.originalY + dy;
        },
        handleDragEnd() {
            this.originalX = this.currentX
            this.originalY = this.currentY
            document.removeEventListener('mousemove', this.handleDragging);
            document.removeEventListener('mouseup', this.handleDragEnd);
            // 可以在这里进行拖拽结束后的其他处理，如碰撞检测、吸附逻辑等
        },
        clickItem(item, index) {
            this.$emit('click', item, index)
            console.log('ci', item, index)
        },
        filterKey(str) {
            let status = true;
            if (str && this.form.key) {
                if (str?.toLocaleLowerCase().indexOf(this.form.key?.toLocaleLowerCase()) == -1) {
                    status = false;
                }
            }
            return status;
        }
    },
    created() {
    }
}
</script>