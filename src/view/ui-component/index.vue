<template>
    <div class="ui-reivew">
        <ul class="model-box">
            <li v-for="item,index of option.model" :key="index" @click.stop="openPath(item.url)">
               {{index+1}}. {{item.name}}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data(){
        return {
            option:{
                model:[
                    {name:'框架主题',url:'/ui/uiframework'},
                    {name:'字体',url:'/ui/fonts'},
                    {name:'图标',url:'/ui/icons'},
                    {name:'搜索列表',url:'/ui/list'},
                    {name:'进阶表格',url:'/ui/table'},
                    {name:'抽屉弹窗',url:'/ui/modal'},
                ]
            }
        }
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());
            
        },
        openPath(url){
            this.$router.push(url)
        }
    },
}
</script>
<style lang="scss" scoped>
.ui-reivew{
    padding:16px;
    .model-box{
        display: flex;
        justify-content: flex-start;
        list-style: none;
        li{
            padding:12px 32px;
            background-color: #fff;
            border-radius: 4px;
            margin: 0 10px 10px 0;
            cursor: pointer;
            
            &:hover{
                color: var(--ivu-link-hover-color);
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.12);
            }
        }
    }
}
</style>