<template>
    <div class="pageBox">
        <p>pageData:<b>{{pageData}}</b></p>
        <label>name:</label>
        <Input v-model="pageData.name" />
        <p>allData:<b>{{allData}}</b></p>
    </div>
</template>
<script>
import { globalState } from '../state.data'
export default {
    computed:{
        pageData(){
            return globalState.apiData
        },
        allData(){
            return globalState;
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