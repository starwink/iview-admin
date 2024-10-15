<template>
    <div class="docs-list">
        <div class="search">
            <Input  v-model="form.key"  maxlength="50" placeholder="请输入关键字" clearable style="width: 140px;margin-right:10px" @on-enter="search()" />
            <Button @click="search()">查询</Button>
        </div>
        <div style="text-align: right;">
            <Button @click="add">创建</Button>
            <!-- <Button @click="createDataBase">初始化数据库</Button> -->
        </div>
        <div class="table-box">
            <Table :columns="list.columns" :data="list.data" :loading="loading" stripe  width="calc(100% - 16px)">

                
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
                    <span>{{$helper.getDateParams(row.update_datetime,'YYYY-MM-DD HH:mm')}}</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <span type="text" class="button-span button-color-edit" ghost style="margin-right: 5px"  @click.stop="open(row)">查看</span>
                    <span type="text" class="button-span button-color-edit" ghost style="margin-right: 5px"  @click.stop="edit(row)">编辑</span>
                  
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
            <Row>
                <Col span="24">
                    <Page :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="changePageCurrent" @on-page-size-change="changeSizeCurrent" show-elevator show-sizer />
                </Col>
            </Row>
        </div>
        <formModal ref="formModal" @success="search"></formModal>
        <bookFormDrawer ref="bookFormDrawer" @success="search"></bookFormDrawer>
    </div>
</template>
<script>
import formModal from '@/view/sqlite/components/formModal'
import bookFormDrawer from '@/view/docs/bookFormDrawer'
import eTooltip from "@/components/eTooltip";
export default {
    components: {
        formModal,
        bookFormDrawer,
        eTooltip,
    },
    data() {
        return {
            loading: false,
            form:{
                key:''
            },
            list: {
                columns: [
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
                        width: 160,
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
        }
    },
    created() {
        this.search();
    },
    methods:{
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

            // this.$api.openPath(row).then(res=>{})
        }
    }
}
</script>
<style lang="scss">
.docs-list{
    padding: 16px;
    overflow: auto;
}
</style>