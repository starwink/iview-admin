<template>
    <div class="json-tree">
        <div v-for="(item, index) in data" :key="`${item.key}-${index}`" @mouseenter="getCurrentLine(item,'enter')" @mouseleave="getCurrentLine(item,'leave')" class="json-tree-item">
            <p class="json-tree-line flex-sb" :class="{'active': item.active }" @click.stop="setCurrentLine(item)">
                <span>
                    {{ item.key }}
                    <span v-if="item.type === 'object'">
                        <span v-text="': \{'"></span>
                    </span>
                    <span v-else-if="item.type === 'array'">
                        <span v-text="': \['"></span>
                    </span>
                    <span v-else>
                        <span v-pre>:</span>
                        <span style="margin-left: 15px;">
                            {{ item.type === 'string' ? `"${item.value}"` : `${item.value}` }}
                        </span>
                        <span v-if="index < data.length-1">,</span>
                    </span>
                </span>
                <Select v-show="item.active && !(item.leaf && Number.isInteger(item.key))" value-key="id" @change="changeCurrentPath(item)" v-model="item.filedCodeObj" placeholder="请选择" size="mini" style="width: 200px; margin-left: 20px;">
                    <Option v-for="itm in storageFieldList" :key="itm.id" :label="itm.filedName" :value="itm">
                    </Option>
                </Select>
                <!-- <el-tooltip class="item" effect="dark" :content="item.path" placement="top-start">
                    <span class="path-btn" @click="getPath(item.path)">path</span>
                </el-tooltip> -->
            </p>
            <div v-if="item.leaf" class="children-tree">
                <json-tree :data="item.children"></json-tree>
            </div>
            <span v-if="item.type === 'object'">
                <span v-text="'\}'"></span>
                <span v-if="index < data.length-1">,</span>
            </span>
            <span v-else-if="item.type === 'array'">
                <span v-text="'\]'"></span>
                <span v-if="index < data.length-1">,</span>
            </span>
        </div>
    </div>
</template>

<script>
// import bus from '@/utils/bus'

export default {
    name: 'jsonTree',
    props: {
        data: {
            type: Array ,
            default: () => ([])
        }
    },
    data () {
        return {
            storageFieldList: [
                {
                    id: '685272ec921eed594cd853aa',
                    filedCode: 'patientName',
                    filedName: '患者名称'
                },
                {
                    id: '685272ec921eed594cd853ab',
                    filedCode: 'patientId',
                    filedName: '患者唯一标识'
                },
                {
                    id: '685272ec921eed594cd853ac',
                    filedCode: 'age',
                    filedName: '年龄'
                },
                {
                    id: '685272ec921eed594cd853ae',
                    filedCode: 'sex',
                    filedName: '性别'
                }
            ]
        };
    },

    mounted () {
        console.log(this.data);
    },

    methods: {
        // 获取当前路径
        getPath (path) {
            this.$bus.$emit('handlePath', path);
        },
        // 鼠标悬浮，设置当前行特殊标识
        getCurrentLine (item, type) {
            if (type === 'enter') {
                this.$set(item, 'hover', true);
            } else {
                this.$set(item, 'hover', false);
            }
        },
        // 设置当前点击行特殊标识
        setCurrentLine (item) {
            this.getPath(item.path);
            // 判断点击的当前行数据是否为数组的key[0]，如果不是是才进行处理
            if (item.leaf && Number.isInteger(item.key)) {
                return false;
            }
            this.$set(item, 'active', !item.active);

        },
        // 改变当前选中行的路径
        changeCurrentPath (item) {
            console.log('[ item.path ] >', item);
            // 设置当前的配置结果数据
            this.$bus.$emit('getConfigResult', item);
        }
    },
};
</script>

<style lang="scss" scoped>
// 选中背景色
$active-bg-color: #e4f9f0;
// 选中文字颜色
$active-font-color: #13939E;
.json-tree {
  .json-tree-item {
    margin: 20px 0px;
    .json-tree-line {
      cursor: pointer;
      &.active {
        background-color: $active-bg-color;
        color: $active-font-color;
      }
      .path-btn {
        background: #37f;
        color: #fff;
        padding: 2px 6px;
        font-size: 12px;
        cursor: pointer;
        border-radius: 3px;
        margin-left: 20px;
      }
    }

    .children-tree {
      margin-left: 20px;
    }
  }
}
</style>