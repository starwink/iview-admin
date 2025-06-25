<template>
    <div class="index">
        业务数据表
    </div>
</template>
<script>
export default {
    data(){
        return {
            form:{
                
            }
        }
    },
    methods:{
        init(){
            Object.assign(this.data, this.options.data());
            
        }
    },
}
</script>
<style lang="scss" scoped>
.index{

}
</style>