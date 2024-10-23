<template>
    <div>
        loading...
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    methods:{
        init(){
            let params={
                title:'',
                // article:'',
                release_time:'',
                // remark:'',
            }
            params.release_time=this.$helper.getDate('','YYYYMMDD');
            this.$api.saveNotes(params).then(res=>{
                if(res.code==1){
                    this.$router.push('/work/'+res.object.id)
                }
            })
        }
    },
    created(){
        this.init();
    }
}
</script>