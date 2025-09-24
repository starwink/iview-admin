<template>
    <div class="index">
        <h2>observable 测试示例</h2>
        <h3>简单示例</h3>
        <span>step:{{form.step}}</span>
        <Button @click="addStep">addStep</Button>
        <div>
            <pageBox />
        </div>

         <Divider />
        <h3>单层对象示例</h3>
        <Button @click="setAPIData">setAPIData</Button>
        <showAPIData />
        
         <Divider />
         <h3>新增编辑对象</h3>
         <Button @click="setNewObj">setNewObj</Button>

    </div>
</template>
<script>
import { globalState, actions } from './state.data'
import pageBox from './dataComp/pageBox.vue'
import showAPIData from './dataComp/showAPIData.vue'

export default {
    computed(){},
    components:{
        pageBox,
        showAPIData,
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
            console.log('globalState',globalState)
            
            this.form=globalState;
        },
        addStep(){
            this.form.step++;
            console.log(this.form)
            console.log(globalState.step)
        },
        setAPIData(){
            globalState.apiData={
                name:1,age:18,sex:0,infoList:[
                    {name:'a',value:1},
                    {name:'b',value:1},
                ]
            }
        },
        setNewObj(){
            console.log('setNewObj',globalState)
            let val={
                id:1,
                trark_id:'fdski12321k31'
            }

            actions.addItem('testData',val)
           /*  this.$set(globalState,'testData',{
                id:1,
                trark_id:'fdski12321k31'
            }) */
            // globalState['testData']={
            //     id:1,
            //     trark_id:'fdski12321k31'
            // }
        }
    },
    created(){
        this.init()
    }
}
</script>
<style lang="scss" scoped>
.index{

}
</style>