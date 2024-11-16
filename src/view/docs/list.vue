<template>
    <div class="docs-list">
        <div class="search">
            <Input  v-model="form.key"  maxlength="50" placeholder="请输入关键字" clearable style="width: 140px;margin-right:10px" @on-enter="search()" />
            <eDatePicker v-model="form.date" placeholder="创建开始时间 至 结束时间"   style="margin-right:10px;width:204px" @change="search"></eDatePicker>
            <Button @click="search()">查询</Button>
        </div>
        <div style="text-align: right;">
            <Button @click="add">创建</Button>
            <!-- <Button @click="runmsg">runmsg</Button> -->
            <Button @click="delDoc0xCode">doc处理</Button>
            <!-- <Button @click="createDataBase">初始化数据库</Button> -->
        </div>
        <div class="table-box">
            <Table :columns="list.columns" :data="list.data" :loading="loading" stripe  width="calc(100% - 16px)" @on-selection-change="changeTableSelect">

                <template slot-scope="{ row, index }" slot="article">
                    <eTooltip :text="row.article.substr(0,200)">
                        <span>{{row.article.substr(0,40)}}</span>
                    </eTooltip> 
                    <!-- <Poptip trigger="hover"  :content="row.article.substr(0,200)">
                    </Poptip> -->
                </template>
                <template slot-scope="{ row, index }" slot="release_time">
                    <span>{{row.release_time}}</span>
                </template>
                <template slot-scope="{ row, index }" slot="created_at">
                    <span>{{$helper.getDateParams(row.created_at,'YYYY-MM-DD HH:mm')}}</span>
                </template>
                <template slot-scope="{ row, index }" slot="update_datetime">
                    <span :title="$helper.getDateParams(row.update_datetime,'YYYY-MM-DD HH:mm')">{{$helper.getDateParams(row.update_datetime,'YYYY-MM-DD')}}</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <span type="text" class="button-span button-color-edit" ghost style="margin-right: 5px"  @click.stop="open(row)">查看</span>
                    <span type="text" class="button-span button-color-edit" ghost style="margin-right: 5px"  @click.stop="edit(row)">编辑</span>
                    <span type="text" class="button-span button-color-edit" ghost style="margin-right: 5px"  @click.stop="editByMdEditor(row)">梳理</span>
                  
                    <Poptip confirm transfer placement="top-end" @on-ok="del(row)">
                        <div slot="title">
                            <div>
                                确认删除么?
                            </div>
                        </div>
                        <span type="text" class="button-span button-color-del" style="margin-right: 5px">删除</span>
                    </Poptip>
                </template>
            </Table>
        </div>
        <div class="page-box">
                <Page :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="changePageCurrent" @on-page-size-change="changeSizeCurrent" show-elevator show-sizer />
        </div>
        <bookFormDrawer ref="bookFormDrawer" @success="search"></bookFormDrawer>
    </div>
</template>
<script>
import bookFormDrawer from '@/view/docs/bookFormDrawer'
import eTooltip from "@/components/eTooltip";
import eDatePicker from "@/components/eDatePicker";

export default {
    components: {
        bookFormDrawer,
        eTooltip,
        eDatePicker,
    },
    data() {
        return {
            loading: false,
            form:{
                key:'',
                date:[]
            },
            list: {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: "编号",
                        minWidth: 90,
                        key: "id"
                    },
                    {
                        title: "标题",
                        minWidth: 140,
                        ellipsis:true,
                        tooltip:true,
                        key: "title"
                    },
                    {
                        title: "正文",
                        minWidth: 260,
                        slot: 'article',
                    },
                    {
                        title: '发布时间',
                        width: 140,
                        slot: 'release_time',
                    },
                    // {
                    //     title: '创建时间',
                    //     width: 180,
                    //     slot: 'created_at',
                    // },
                    {
                        title: '更新时间',
                        width: 140,
                        slot: 'update_datetime',
                    },
                    {
                        title: '操作',
                        width: 120,
                        fixed: 'right',
                        slot: 'action',
                    }
                    
                ],
                data: []
            },
            page: {
                total: 1,
                current: 1,
                pageSize: 20
            },
            userSel:[]
        }
    },
    created() {
        this.search();
    },
    methods:{
        changeTableSelect(arr){
            console.log(arr);
            this.userSel=arr.map(item=>{
                return item.id
            })
        },
        init(){
            Object.assign(this.$data, this.$options.data());
        },
        reset() {
            let redata = this.$options.data();
            Object.assign(this.$data.form, redata.form);
        },
        search() {
            console.log('run search')
            this.page.current = 1;
            this.getList();
        },
        changePageCurrent(val) {
            this.page.current = val;
            this.getList();
        },
        changeSizeCurrent(val) {
            this.page.current = 1;
            this.page.pageSize = val;
            this.getList();
        },
        getList() {
            let params = { ...this.form, ...{ pageNum: this.page.current, pageSize: this.page.pageSize } }
            // return ;
            if (this.spinShow) {
                return;
            }
            this.spinShow = true;

            this.$api.getNotesList(params).then(res => {
                this.spinShow = false;
                console.log(res);
                this.list.data = res.object.list;
                this.page.total = res.object.total || 0;
            });
        },
        createDataBase(){
            this.$api.initDataBase().then(res => {
               
            });
        },
        add() {
            this.$refs.bookFormDrawer.init();
        },
        edit(item) {
            this.$refs.bookFormDrawer.edit(item.id);
        },
        del(item){
            if(item.id){
                this.loading = true;
                this.$api.delNotes(item.id).then(res => {
                    this.loading = false;
                    this.search();
                })
            }
        },
        open(row){
            this.$router.push(`/docs/${row.id}`)
        },
        editByMdEditor(row){
            this.$router.push(`/work/${row.id}`)
        },
        runmsg(){
            let funName='controller.demo.framework.hello';
            funName='controller.demo.os.messageShow';
            // console.log('runmsg=>',this.$ipc,this.$ipc.invoke)
            this.$ipc.invoke(funName, 'imyar un').then(r => {
                console.log(r)
            })
        },
        async delDoc0xCode(){
            if(this.userSel.length==0){
                return ;
            }
            let serves=[]
            this.userSel.map(item=>{
                serves.push(this.$api.delNotes0xcode({id:item}))
            })
            Promise.all(serves).then(v=>{
                let y=0,n=0;
                v.map(i=>{
                    if(i.code==1){
                        y++;
                    }else{
                        n++;
                    }
                })
                if(y==serves.length){
                    this.$Message.success('操作成功')
                }else{
                    this.$Message.info(`操作存在问题!成功:${y};失败:${n}`)
                }
            });
        }
    }
}
</script>
<style lang="scss">
.docs-list{
    padding: 16px 16px 0 16px;
    height: 100%;
    overflow: auto;
    .page-box{
        text-align: right;
        padding: 12px 0;
    }
}
</style>