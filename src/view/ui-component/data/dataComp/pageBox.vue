<template>
    <div class="pageBox">
        <p>pageBox:<b>{{pageStep}}</b></p>
    </div>
</template>
<script>
import { globalState } from '../state.data'
export default {
    computed:{
        pageStep(){
            return globalState.step
        }
    },
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
.pageBox{

}
</style>