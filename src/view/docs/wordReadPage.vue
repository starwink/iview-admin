<template>
    <div class="wordForm">
        <div class="work-editor">
            <div class="work-body">
                <mdComp ref="mdComp"  :height="100" :overflowHeight="80" @setMuLu="setMuLu" />
            </div>
            <div class="work-info">
                <eMuLuBox ref="eMuLuBox" placement="right" :height="100" :overflowHeight="76" />
            </div>
        </div>
        <wordInfoDrawer ref="wordInfoDrawer" @success="saveInfoData" />
    </div> 
</template>
<style lang="scss" scoped>
.wordForm{
    .work-editor{
        display: flex;
        justify-content: space-between;
        .work-body{
            flex:1
        }
        .work-info{
            width:240px
        }
    }
}
</style>
<script>
import mdComp from './mdComp'
import eMuLuBox from '@/components/eMuLuBox/eMuLuByDrag'
import wordInfoDrawer from './wordForm/wordInfoDrawer'
export default {
    components: {
        mdComp,
        eMuLuBox,
        wordInfoDrawer,
    },
    data(){
        return {
            form: {
                title:'',
                article:'',
                release_time:'',
                remark:'',
            },
        }
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());
            let id=this.$route.params.id
            this.show=true;
            this.$api.getNotesDetail(id).then(res=>{
                this.form=res.object;
                document.title=res?.object?.title || '详情';
                this.$refs.mdComp.setValue(this.form.article);
            })
        },
       
        close(type) {
            if(type){return ;}
            this.show = false;
            this.$emit('close')
        },
        save() {
            // this.form.article=this.$refs.mdComp.setValue();
            console.log(this.form);
            this.$api.saveNotes(this.form).then(res=>{
                if(res.code==1){
                    this.$emit('success')
                    this.close();
                }
            })
        },
        saveInfoData(data){
            this.form=data;
        },
        openInfoData(){
            this.$refs.wordInfoDrawer.init(this.form);
        },
        setMuLu(list){
            console.log('list',list)
            this.$refs.eMuLuBox.init(list);

        }
    },
    created(){
        this.init()
    }
}
</script>