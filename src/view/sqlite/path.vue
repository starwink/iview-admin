<template>
    <div class="sqlite">
        <div class="search">
            <Input  v-model="form.key"  maxlength="50" placeholder="请输入关键字" clearable style="width: 140px;margin-right:10px" @on-enter="search()" />
            <Button @click="search()">查询</Button>
        </div>
        <div style="text-align: right;">
            <Button @click="add">创建</Button>
        </div>
        <div class="table-box">
            <Table :columns="list.columns" :data="list.data" :loading="loading" stripe  width="calc(100% - 16px)">

                <template slot-scope="{ row, index }" slot="path">
                    <span @click="h5Copy(row)">{{row.path}}</span>
                </template>
                <template slot-scope="{ row, index }" slot="createTime">
                    <span>{{$helper.getDateParams(row.created_at,'YYYY-MM-DD HH:mm')}}</span>
                </template>
                <template slot-scope="{ row, index }" slot="updateTime">
                    <span>{{$helper.getDateParams(row.update_datetime,'YYYY-MM-DD HH:mm')}}</span>
                </template> 
                <template slot-scope="{ row, index }" slot="action">
                    <span type="text" class="button-span button-color-edit" ghost style="margin-right: 5px"  @click.stop="open(row)">打开</span>
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
    </div>
</template>
<script>
import formModal from '@/view/sqlite/components/formModal'
export default {
    components: {
        formModal
    },
    data() {
        return {
            loading: false,
            form:{
                key:'',
            },
            list: {
                columns: [
                    {
                        title: "标题",
                        minWidth: 120,
                        ellipsis:true,
                        tooltip:true,
                        key: "title"
                    },
                    {
                        title: "路径",
                        minWidth: 260,
                        // ellipsis:true,
                        // tooltip:true,
                        slot: 'path',
                    },
                    
                    {
                        title: '创建时间',
                        width: 180,
                        slot: 'createTime',
                    },
                    {
                        title: '更新时间',
                        width: 180,
                        slot: 'updateTime',
                    },
                    {
                        title: '操作',
                        width: 170,
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

            this.$api.getFilesList(params).then(res => {
                this.spinShow = false;
                this.list.data = res.object.list;
                this.page.total = res.object.total || 0;
            });
        },
        
        add() {
            this.$refs.formModal.init();
        },
        edit(item) {
            this.$refs.formModal.edit(item.id);
        },
        del(item){
            if(item.id){
                this.loading = true;
                this.$api.delFiles(item.id).then(res => {
                    this.loading = false;
                    this.search();
                })
            }
        },
        open(row){

           let funName='controller.demo.os.openFile';

           if(row.path_type=='catalog'){
               funName='controller.demo.os.openDir';
           }else if(row.path_type=='file'){
            funName='controller.demo.os.openFile';
           }else if(row.path_type=='url'){
            funName='controller.demo.os.openFile';
           }
           console.log('rownn',row)
           this.$ipc.invoke(funName, {path:row.path}).then(r => {
                console.log('fun',funName,r)
            })
        },
        h5Copy(item) {
            let content=item.path
            if (!document.queryCommandSupported("copy")) {
                // 不支持
                return false;
            }

            let textarea = document.createElement("textarea");
            textarea.value = content;
            textarea.readOnly = "readOnly";
            document.body.appendChild(textarea);
            textarea.select(); // 选择对象
            textarea.setSelectionRange(0, content.length); //核心
            let result = document.execCommand("copy"); // 执行浏览器复制命令
            textarea.remove();
            if(result){
                this.$Message.success('复制成功:'+item.title)
            }
            return result;
        },
    }
}
</script>