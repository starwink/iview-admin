<template>
    <div class="json">
        <p>json editor path配置</p>
        <div class="editor-box">
            <div class="editor-json">
                
            </div>
            <div class="line-options">

            </div>
        </div>
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
.json{

}
</style>