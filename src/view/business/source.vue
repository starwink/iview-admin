<template>
    <div class="source">
        数据源
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
.source{

}
</style>