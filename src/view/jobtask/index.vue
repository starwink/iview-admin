<template>
    <div class="jobtask">
        任务管理
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
.jobtask{

}
</style>