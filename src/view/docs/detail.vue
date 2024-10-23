<template>
    <div class="docs-detail">
        <div class="detail-title">{{ data.title }}</div>
        <div class="detail-info">
            <div class="release_time"><span>发布时间：</span><span>{{ data.release_time }}</span></div>
            <div class="create-time"><span>更新时间：</span><span>{{$helper.getDateParams(data.update_datetime,'YYYY-MM-DD HH:mm')}}</span></div>
            <div class="update-time"><span>创始时间：</span><span>{{$helper.getDateParams(data.created_at,'YYYY-MM-DD HH:mm')}}</span></div>
        </div>
       <div class="conter">
       <!-- {{ data.article }} -->
        <mdComp ref="mdComp" :height="100" :overflowHeight="76" @setMuLu="setMuLu" />
       </div>
       <eMuLuBox ref="eMuLuBox"  placement="right" top="0" leftPadding="0" @click="clicmMuLu" />
    </div>
</template>
<script>
import mdComp from './detail/mdCompByRead'
import eMuLuBox from '@/components/eMuLuBox/eMuLuByDrag'
var md5 = require('md5');
export default {
    components: {
        mdComp,
        eMuLuBox,
    },
    data() {
        return {
            loading: false,
            form:{
                id:''
            },
            data:{}
            
        }
    },
    created() {
        this.init();
    },
    methods:{
        init(){
            Object.assign(this.$data, this.$options.data());
            // console.log(this.$route.query)
            // console.log(this.$route.params)
            this.form.id=this.$route.params.id;
            this.getDetail();
        },
        getDetail(){
            this.$api.getNotesDetail(this.form.id).then(res=>{
                this.data=res.object;
                document.title=res?.object?.title || '详情';
                this.$refs?.mdComp?.runView(this.data.article);
            })
        },
        reset() {
            let redata = this.$options.data();
            Object.assign(this.$data.form, redata.form);
        },
        setMuLu(list){
            console.log('list',list)
            this.$refs.eMuLuBox.init(list);
        },
        scrollTo(item) {
            // this.active_link = active;
            if (active == 0) {
                this.$refs['preview'].scrollTop = 0;
            } else {
                this.$refs['preview'].scrollTop = this.$refs[active + ''].offsetTop;
            }
        },
        clicmMuLu(item,index){
            let  scrollTop=0;
            let id=`title-lv${item.level}-${md5(item.text)}`;
            scrollTop=document.getElementById(id).offsetTop

            this.$refs.mdComp.$refs.comp.getElementsByClassName('markdown-main')[0].scrollTop=scrollTop
           
           
        }
       
       
    }
}
</script>
<style lang="scss">
.docs-detail{
    height: 100%;
    overflow: hidden;
    padding: 16px;
    .detail-title{
        font-size: 16px;
        text-align: center;
        font-weight: 600;
    }
    .detail-info{
        display: flex;
        justify-content: space-between;
        align-items: center;
        color:#999;
        font-size: 14px;
        margin: 12px 8px;
    }
    .conter{
        background-color: #f5f5f5;
        padding:0;
        border-radius:4px;
    }
}
</style>