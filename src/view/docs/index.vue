<template>
    <div>
        <div class="header"></div>
        <div class="body">
            <Row>
                <Col span="10">
                {{ form.md }}
                </Col>
                <Col span="14">
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
</style>
<script>
import mdComp from './mdComp'
export default {
    components:{
        mdComp,
    },
    data(){
        return {
            form:{
                md:'fdsfdsfdsf'
            }
        }
    },
    methods:{
        init(){
            this.$refs.mdComp.setValue(this.form.md)
        }
    },
    created(){
        console.log('123');
        this.$nextTick(()=>{
            this.init();
        })
    }
}

</script>