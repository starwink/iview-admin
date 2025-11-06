<template>
    <div class="debugIcon" title="异常日志" @click="openLogModal">
        <Badge :count="errLogNum" :offset=[12,-8]>
            <Icon class="debug-icon"  type="ios-bug" />
        </Badge>
        <logsModal ref="logsModal" />
    </div>
</template>
<script>
import { globalState , actions  } from './log.data'
import logsModal from './logsModal'
export default {
    components:{
        logsModal
    },
    data(){
        return {
            form:{
                errList:[]
            }
        }
    },
    computed:{
        errLogNum:function(){
            return globalState.list?.length || 0;
        }
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());
        },
        openLogModal(){
            this.$refs.logsModal.init();
        }
    },
    created(){
        this.init()
    }
}
</script>
<style lang="scss" scoped>
.debugIcon{
   
    font-size: 18px;
    color:#fff;
    position: relative;
    height: 100%;
    display: flex;
    // justify-content: center;
    // align-items: center;
    margin: 0 16px;

   cursor: pointer;
   &:hover{
    color: $primary-color;
   }
 
}
</style>