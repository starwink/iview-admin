<template>
    <div class="editor_page">
        <p v-for="item,index of form.url" @click="openUri(item)" class="item-herf">
            <span>{{index+1}}.</span>
            <span>{{item.name}}</span>
            <span>{{item.uri}}</span>
        </p>
    </div>
</template>
<script>
export default {
    data(){
        return {
            form:{
                url:[
                    {name:'json编辑器',uri:'/editor/jsonpath'},
                    {name:'markdown编辑器',uri:'/editor/markdown'}
                ]
            }
        }
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());
            
        },
        openUri(item){
            console.log('it',item)
            this.$router.push(item.uri)
        }
    },
}
</script>
<style lang="scss" scoped>
.editor_page{
    background-color: #fff;
    .item-herf{
        cursor: pointer;
        padding:4px 12px;

        &:hover{
            color:var(--ivu-primary-color);
        }

        span{
            margin-right: 10px;
        }
    }
}
</style>