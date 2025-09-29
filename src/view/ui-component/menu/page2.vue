<template>
    <div class="page2">
        <h3> page 2</h3>
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

</style>