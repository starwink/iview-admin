<template>
    <div>
        <div class="header"></div>
        <div class="body">
            <Row>
                <Col span="2">
                <!-- {{ form.md }} -->
                    <eMuLuBox ref="eMuLuBox" top="32" leftPadding="0"  />
                </Col>
                <Col span="22">
                    <mdComp ref="mdComp"  :height="100" :overflowHeight="80" />
                </Col>
            </Row>
        </div>
        <div class="footer"></div>
    </div>
</template>

<style lang="scss" scoped>
.header,.footer{
    height: 40px;
    background-color: antiquewhite;
}
.body{
    position: relative;
    overflow: hidden;
    // height: calc(100% - 80px);
    height: calc(100vh - 80px);
}
.catalogue-box{
    position: fixed;
    z-index: 1;
    left: 16;
    top: 32;
    width: 220px;
    background-color: #fff;
    border: solid 1px #eee;
    border-radius: 2px;
    .title{

    }
    a{
        color:#f08c00;
    }
    li{
        padding:6px 2px;
        list-style-type: none;
        &:hover{
            background-color: #fff3bf;
        }
    }
    .catalogue-lv-1{
        padding-left: 12px;
    }
    .catalogue-lv-2{
        padding-left: 24px;
    }
    .catalogue-lv-3{
        padding-left: 36px;
    }
    
}
</style>
<script>
import mdComp from './mdComp'
import eMuLuBox from '@/components/eMuLuBox'
export default {
    components:{
        mdComp,
        eMuLuBox,
    },
    data(){
        
        return {
            form:{
                md:'fdsfdsfdsf'
            },
            
        }
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());

        },
       
        handleDragStart(event) {
            // 记录拖拽开始时的坐标
            this.startX = event.clientX;
            this.startY = event.clientY;
            document.addEventListener('mousemove', this.handleDragging);
            document.addEventListener('mouseup', this.handleDragEnd);
        },
        handleDragging(event) {
            // 计算当前拖拽的距离
            const dx = event.clientX - this.startX;
            const dy = event.clientY - this.startY;
            // 更新拖拽元素的位置
            this.currentX = this.originalX + dx;
            this.currentY = this.originalY + dy;
        },
        handleDragEnd() {
            this.originalX=this.currentX
            this.originalY=this.currentY
            document.removeEventListener('mousemove', this.handleDragging);
            document.removeEventListener('mouseup', this.handleDragEnd);
            // 可以在这里进行拖拽结束后的其他处理，如碰撞检测、吸附逻辑等
        },
    },
    mounted(){
       
    },
    created(){
        this.$nextTick(()=>{
            this.init();
        })
    }
}

</script>