<template>
    <div class="custom-list-review">
        <template v-if="!config.id">
            <div class="empty">请选择需要查看的列表</div>
        </template>
        <template v-else >
            <div class="search-where" ref="where" >
                <Form :model="form" ref="searchForm" :label-width="0" @submit.native.prevent @keydown.native.enter.prevent="search">
                    <Row :gutter="32">
                        <Col span="24">
                            <whereForm ref="whereForm"  @search="search" />
                        </Col>
                    </Row>
                </Form>
            </div>
            <div class="table-box" ref="page">
                <Table stripe :columns="list.columns" :data="list.data" width="calc(100% - 16px)" :height="tableHeight">
                    <template slot-scope="{ row }" slot="action">
                        <span  @click="openUrl(row)" class="button-span button-color-edit">查看</span>
                    </template>
                </Table>
            </div>
            <div class="page-box" ref="page">
                <Row>
                    <Col span="24">
                        <Page :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="changePageCurrent" show-elevator show-total />
                    </Col>
                </Row>
            </div>
            <Spin size="large" fix v-if="loading.list"></Spin>
        </template>
        
    </div>
</template>
<style lang="scss" scoped>

.custom-list-review{
    width:100%;
    height: 100%;
    overflow: hidden;
    .empty{
        display: flex;
        justify-content: center;
        align-items:center;
        height: calc( 100% - 20px);
        color:#999;
        font-size: 24px;
    }
    .search-where{
        padding: 12px 16px;
    }
    .table-box{
        margin: 0 auto;
        width: calc(100% - 24px);
    }
    .page-box{
        // position: absolute;
        padding: 8px 16px;
        width: 100%;
        // bottom: 0;
        margin-top: 0;
        text-align: right;
        background-color: #fff;
    }
}
</style>
<script>
import whereForm from '@/view/custom-list/components/listReview/whereForm'
import customFun from '@/view/custom-list/components/custom.fun'
export default {
    components: {
        whereForm,
    },
    props:{
        boxHight:{
            type:Number,
            default:144,
        },
    },
    data(){
        return {
            loading:{
                config:false,
                list:false,
            },
            form: {
                key:'',
            },
            searchParamsList:[],
            page: {
                total: 1,
                current: 1,
                pageSize: 20
            },
            list: {
                columns: [],
                data:[]
            },
            config:{},
            tableHeight:0,
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.$_resizeHandler)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resizeHandler)
    },
    methods: {
        $_resizeHandler() {
            let whereH=this.$refs?.where?.clientHeight || 0;
            let pageH=this.$refs?.page?.clientHeight || 0;
            let viewHeiht=document.getElementById(this.appId).clientHeight
            // window.innerHeight
            // this.tableHeight=viewHeiht - whereH -pageH -this.boxHight 
            this.tableHeight=viewHeiht - whereH -pageH -55; 
        },
        init(data) {
            Object.assign(this.$data.form, this.$options.data())
            this.$_resizeHandler();
            this.config={...data};
            this.page.pageSize=this.config.pageSize
            this.$nextTick(()=>{
                this.$refs.whereForm.init(this.config);
                this.search()
            })
        },
        search() {
            this.page.current = 1
            this.searchParamsList=this.$refs.whereForm.getParams();
            this.getList()
        },
        changePageCurrent(val) {
            this.page.current = val
            this.getList()
        },
        
        getList() {
            

            if (this.loading.list) {
                return;
            }
            this.loading.list = true
            let params={
                id:this.config.id,
                currentPage:this.page.current,
                searchParamsList:this.searchParamsList
            }
            this.$api.getCustomTableData(params).then(res => {
               
                this.loading.list = false
                if(res.code==1){
                    let buttonsColum=[];
                    if(this.config.isJump=='Y'){
                        buttonsColum=[{
                            title: '操作',
                            width: 90,
                            fixed: 'right',
                            slot: 'action',
                        }]
                    }
                    let columns=this.formatUserColumns(res.object.columns);
                    this.list.columns=[
                        ...columns,...buttonsColum
                    ]
                    this.list.data = res.object.data || []
                    this.page.total = res.object.count || 0
                   
                }else{
                    // console.log('231')
                    this.list.columns=[]
                    this.list.data=[];
                    this.page.total=0;
                }
                this.$nextTick(()=>{
                    this.$_resizeHandler();
                })
            })
        },
        formatUserColumns(columns=[]){
            let list=[];
            if(columns && columns.length>0){
                columns.map(res=>{
                    list.push({
                        ...res,
                        ...{
                            minWidth:res.title.length*16+32
                        }
                    })
                })
            }
            
            return list;
        },
        openUrl(item){
            let url=customFun.getOpenUri(this.config.jumpUrl,item);
            console.log('tourl',url)
            window.open(url)
        }
    },
}
</script>
