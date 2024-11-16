<template>
    <div class="wordForm">
        <Breadcrumb style="margin: 8px ;" >
            <BreadcrumbItem to="/docs">列表</BreadcrumbItem>
            <BreadcrumbItem>{{form.title}}</BreadcrumbItem>
        </Breadcrumb>
        <div class="work-editor">
            
            <div class="work-body">
                
                <mdComp ref="mdComp"  :height="100" :overflowHeight="141" @setMuLu="setMuLu" @save="setArticle" />
            </div>
            <div class="work-info" v-if="false">
                <!-- <Icon custom="bookeditor-font icon-arrowdown" size="24" /> -->
                <!-- <Icon custom="i-icon  bookeditor-font icon-arrowdown" size="24" /> -->
                <!-- <div class="bookeditor-font icon-arrowdown" /> -->
                <!-- <eMuLuBox ref="eMuLuBox" /> -->
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
import eMuLuBox from '@/components/eMuLuBox/eMuLuByStaticsPage'
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
                    this.$Message.success('保存成功!')
                    // this.$emit('success')
                    // this.close();
                }
            })
        },
        setArticle(text){
            this.form.article=text;
            this.save();
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