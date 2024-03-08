<template>
    <div class="darg-box-page">
        <div >
            <draggable v-model="list"  ghost-class="mover-out-box" class="darg-box" draggable=".item" @end="onEnd" @change="changeVal" :emptyInsertThreshold="12">
                <!-- <transition-group> -->
                    <div v-for="element in list" :key="element" class="item">
                        {{element}}
                    </div>
                <!-- </transition-group> -->
                
            </draggable>
        </div>
        
        <div>
            <p>{{ list }}</p>
        </div>
        
    </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
    components: {
        draggable
    },
    data(){
        return {
          
            list:[]
        }
    },
    mounted(){
        this.init();
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());
            let list=[];
            for(let i=0;i<100;i++){
                list.push(i)
            }
            this.list=list;
        },
        onEnd(...e){
            console.log('eee',e)
        },
        changeVal(...e){
            console.log('changeVal',e)
        }
    }
}
</script>

<style lang="scss" scoped>
.darg-box{
    display: flex;
    justify-content: flex-start;
    width:100%;
    .item{
        padding: 4px 12px ;
        border-radius: 4px;
        background-color: #999;
        margin: 0 4px;
        cursor: move;
    }
    .mover-out-box{
        background-color: #666;
        color:#fff;
        opacity: 0.6;
    }
}
</style>