
<template>
    <div class="" >
        <Tabs value="Buttons">
        <TabPane label="按钮" name="Buttons">
            <Buttons />
        </TabPane>
        <TabPane label="换肤" name="colorTheme">
            <ColorTheme /> 
        </TabPane>
        <TabPane label="标签三" name="name3">标签三的内容</TabPane>
    </Tabs>
    </div>
</template>
<script>
import Buttons from './component/buttons.vue'
import ColorTheme from './component/colorTheme.vue'
export default {
    components: {
        Buttons,
        ColorTheme,
    },
   
   
    data() {
        return {
            form: {

            },
        }
    },
    methods: {
        init() {
            Object.assign(this.data, this.options.data());
        },
    },
    mounted(){

    },
    created() {
        
    },
}
</script>
<style lang="scss" scoped>

    
</style>