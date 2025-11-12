<template>
    <div class="list-manage">
        <div class="search-box">
            <Input v-model.trim="form.keyword" clearable maxlength="10" placeholder="word" class="search-input" />
            <Button type="primary" class="ml-10" @click="search">查询</Button>
            <Button type="warning" class="ml-10" @click="reset">重置</Button>
        </div>
        <div class="buttons-box">
            <Button type="primary" @click="add">新增</Button>
        </div>
        <div class="table-box" ref="tableRef">
            <Table :columns="list.columns" :data="list.data" width="calc(100% - 16px)" :height="tableHeight"  border>
                 <template slot-scope="{ row, index }" slot="code_str">
                    <div>
                        <span>
                            <eTooltip :text="row.code_str">
                                <Tag>info</Tag>
                            </eTooltip>
                        </span>
                        <span>
                            <eTooltip :text="row.uk_mp3">
                                <Tag @click.native="payAudio(row.uk_mp3)">UK</Tag>
                            </eTooltip>
                        </span>
                        <span>
                            <eTooltip :text="row.us_mp3">
                                <Tag @click.native="payAudio(row.us_mp3)">US</Tag>
                            </eTooltip>
                        </span>
                    </div>
                    
                </template>
                 <template slot-scope="{ row, index }" slot="created_at">
                    <span>{{$helper.getDateParams(row.created_at,'YYYY-MM-DD HH:mm')}}</span>
                </template>
                 <template slot-scope="{ row, index }" slot="update_datetime">
                    <span>{{$helper.getDateParams(row.update_datetime,'YYYY-MM-DD HH:mm')}}</span>
                </template>
                <template slot-scope="{ row, index }" slot="action">
                    <span type="text" class="button-span button-color-edit" ghost style="margin-right: 5px" @click.stop="edit(row)">编辑</span>
                    <Poptip confirm transfer placement="top-end"  @on-ok="del(row)">
                    <div slot="title">
                        <div>
                            确认删除么?
                        </div>
                    </div>
                    <span type="text" class="button-span button-color-del" ghost style="margin-right: 5px">删除</span>
                </Poptip>
                </template>
            </Table>
        </div>
            <div class="page-paging" ref="pagePageing">
            <Page :total="page.total" :current="page.current" :page-size="page.pageSize"  show-elevator show-sizer show-total />
            <!-- <Page :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="changePageCurrent" @on-page-size-change="changeSizeCurrent" show-elevator show-sizer show-total /> -->
        </div>
    </div>
</template>
<script>
import eTooltip from "@/components/eTooltip";
export default {
    components: {
        eTooltip,
    },
    data(){
        return {
            tableHeight:200,
            form:{
                keyword:''
            },
            page:{
                total:0,
                pageNum:1,
                pageSize:20,
            },
            list:{
                columns: [
                    // {
                    //     type: 'index',
                    //     width: 60,
                    //     align: 'center'
                    // },
                    {
                        title: 'ID',
                        width: 90,
                        key: 'id',

                    },
                    {
                        title: 'word',
                        width: 160,
                        key: 'word',

                    },
                    {
                        title: '数据',
                        minWidth: 120,
                        slot: 'code_str',
                    },
                    {
                        title: '创建时间',
                        width: 150,
                        slot: 'created_at',
                    },
                   
                    {
                        title: '更新时间',
                        width: 150,
                        slot: 'update_datetime',
                    },
                    {
                        title: '备注',
                        minWidth: 120,
                        key: 'remark',
                        ellipsis: true,
                        tooltip: true,
                    },
                    

                    {
                        title: '操作',
                        width: 180,
                        slot: 'action',
                    }
                ],
                data:[]
            },
            loading:{
                table:false
            }
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
            let pagePageingH = this.$refs?.tableRef?.clientHeight  || 0;
            this.tableHeight =pagePageingH;
            console.log(this.tableHeight,'-')
        },

        init(){
            Object.assign(this.$data, this.$options.data());
            this.$_resize();
            this.search();
        },
        
        reset() {
            let redata = this.$options.data()
            Object.assign(this.$data.form, redata.form)
            this.search()
        },
        search() {
            this.page.pageNum = 1
            this.getList()
        },
        getList() {
            if (this.loading.table) {
                return;
            }
            this.loading.table = true
            let params = { ...this.form, ...{ pageNum: this.page.current, pageSize: this.page.pageSize } }
            this.$api.getEnglishList(params).then(res => {
                this.loading.table = false;
                // this.list.data = res.object.list;
                let list=[];
                res.object.list.map(res=>{
                    list.push({
                        ...res,
                        ...{
                            uk_mp3:this.getAudioUri(res,'uk'),
                            us_mp3:this.getAudioUri(res,'us'),
                        }
                    })
                })
                this.list.data = list;
                this.page.total = res.object.total || 0;
            });
        },
        changePageCurrent(val) {
            this.page.pageNum = val
            this.getList()
        },
        changeSizeCurrent(val) {
            this.page.pageNum = 1
            this.page.pageSize = val
            this.getList()
        },
        add(){
            console.log('add')
        },
        edit(row){
            console.log('edit',row)
        },
        del(row){
            this.delEnglish(row.id).then(res=>{
                if(res.code==1){
                    this.getList()
                }
            })
        },
        getAudioUri(row,type){
            let info=this.$helper.getJSONByStr(row.code_str)
            let uri=info?.[type]?.audioUrl || ''
            return uri
        },
        payAudio(uri){
            console.log('path',uri)
        }
    },
    created(){
        this.$nextTick(()=>{
            this.init();
        })
    }
}
</script>
<style lang="scss" scoped>

</style>
