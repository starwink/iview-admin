<template>
    <div class="page1">
        <h3> page1</h3>
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
            Object.assign(this.$data, this.$options.data());
            
        }
    },
}
</script>
<style lang="scss" scoped>
.page1{

}
</style>