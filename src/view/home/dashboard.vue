<template>
    <div class="dashboard">
        <h3>dashboard</h3>
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
.dashboard{

}
</style>