
<template>
    <div class="" >
        <Tabs value="Buttons">
        <TabPane label="按钮" name="Buttons">
            <Buttons />
        </TabPane>
        <TabPane label="换肤" name="colorTheme">
            <ColorTheme /> 
        </TabPane>
        <TabPane label="标签三" name="name3">
            <countTo :end='100' :decimals="2" :duration=5 delay=1 />
            {{this.$store.state.menu.routes}}
        </TabPane>
    </Tabs>
    </div>
</template>
<script>
import Buttons from './component/buttons.vue'
import ColorTheme from './component/colorTheme.vue'
import countTo from '@/components/count-to/count-to.vue'
export default {
    components: {
        Buttons,
        ColorTheme,
        countTo,
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