<template>
    <div class="page-main" ref="pageMain">
        <div ref="searchForm">
            <Form :model="form" @keydown.native.enter.prevent="search"  class="search-form"  @submit.native.prevent >
                <Input  v-model.trim="form.key" @on-clear="search" class="search-input" maxlength="50" placeholder="请输入关键字" clearable    />
            </Form>
        </div>
        
        <div class="page-buttons" ref="pageButtons">
            <Button @click="add" type="primary" class="ml-10" >新增</Button>
        </div>

        <div class="table-list">
            <Table :columns="list.columns" :data="list.data" width="calc(100% - 16px)" :height="tableHeight">
                <template slot-scope="{ row, index }" slot="created_at">
                    <span>{{$helper.getDateParams(row.created_at)}}</span>
                </template>
                <template slot-scope="{ row, index }" slot="update_datetime">
                    <span>{{$helper.getDateParams(row.update_datetime)}}</span>
                </template>

                <template slot-scope="{ row, index }" slot="action">
                    <span @click.stop="edit(row)" class="button-span button-color-edit mr-5" >编辑</span>
                    <span @click.stop="del(row)" class="button-span button-color-del  mr-5" >删除</span>
                </template>
            </Table>
        </div>
        <div class="page-paging" ref="pagePageing">
            <Page :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="changePageCurrent" @on-page-size-change="changeSizeCurrent" show-elevator show-sizer show-total />
        </div>
        <baseForm ref="baseForm" @success="getList()" ></baseForm>
    </div>
</template>
<script>
import baseForm from './baseForm'
export default {
    components: {
        baseForm
    },
    data(){
        return {
            form:{
                key:'',
            },
            page: {
                total: 0,
                current: 1,
                pageSize: 10
            },
            list: {
                columns: [
                    
                    {
                        title: '文字',
                        minWidth: 180,
                        key: 'text',
                        // ellipsis:true,
                        // tooltip:true,
                    },
                    {
                        title: '拼音码',
                        width: 120,
                        key: 'code_binyin'
                    },
                    {
                        title: '五笔码',
                        width: 120,
                        key: 'code_wb'
                    },
                    {
                        title: '更新时间',
                        width: 120,
                        slot: 'update_datetime'
                    },
                    {
                        title: '创建时间',
                        width: 120,
                        slot: 'created_at'
                    },
                    


                    {
                        title: '操作',
                        width: 180,
                        fixed: 'right',
                        slot: 'action',

                    }
                ],
                data: [],
            },
            tableHeight:200,
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.$_resize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resize);
    },
    methods:{
        $_resize() {
            let searchFormH = this.$refs?.searchForm?.clientHeight || 0;
            let pageButtonsH = this.$refs?.pageButtons?.clientHeight || 0;
            let pagePageingH = this.$refs?.pagePageing?.clientHeight  || 0;

            this.tableHeight = this.$refs?.pageMain?.clientHeight- searchFormH -pageButtonsH  -pagePageingH - 60;
        },
        init(){
            Object.assign(this.$data, this.$options.data());
            this.$nextTick(()=>{
                this.$_resize();
                this.search();
            })
        },
        reset() {
            let redata = this.$options.data()
            Object.assign(this.$data.form, redata.form)
            this.search()
        },
        search() {
            this.page.current = 1
            this.getList()
        },
        changePageCurrent(val) {
            this.page.current = val
            this.getList()
        },
        changeSizeCurrent(val) {
            this.page.current = 1
            this.page.pageSize = val
            this.getList()
        },
        getList() {
            if (this.loading) {
                return;
            }
            this.loading = true
            let params = { ...this.form, ...{ pageNum: this.page.current, pageSize: this.page.pageSize } }
            this.$api.getNotesList(params).then(res => {
                this.loading = false
                if(res.code==1){
                    this.list.data = res?.object?.list || [];
                    this.page.total = res?.object?.total || 0;
                }
            })
        },

        add() {
            this.$refs.baseForm.add();
        },
        edit(row) {
            console.log('eidt;')
            this.$refs.baseForm.edit({id:row.id});
        },
        del(row) {
            this.$Modal.confirm({
                title: `提示`,
                content: `<span style="color:red;margin-right: 8px;">确认删除?</span><span  style="color:#999">你还要继续吗？</span>`,
                onOk: () => {
                    // this.delMenuItem(item.id);
                    this.$api.delNotes({id:row.id}).then(res=>{
                        if(res.code==1){
                            this.getList()
                        }
                    });
                },
                onCancel: () => {
                }
            });

            
            // this.$refs.baseForm.del({id:row.id});
        },
    },
    created() {
        this.init();
    },
}
</script>
<style lang="less" >


</style>