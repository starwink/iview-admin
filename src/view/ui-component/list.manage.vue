<template>
    <div class="list-manage">
        <div class="search-box">
            <p>1</p>
            <p>2</p>
            <p>2</p>
        </div>
        <div class="buttons-box">
            <Button type="primary">新增</Button>
        </div>
        <div class="table-box" ref="tableRef">
            <Table :columns="list.columns" :data="list.data" width="calc(100% - 16px)" :height="tableHeight"  border>
            </Table>
        </div>
            <div class="page-paging" ref="pagePageing">
            <Page :total="page.total" :current="page.current" :page-size="page.pageSize"  show-elevator show-sizer show-total />
            <!-- <Page :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="changePageCurrent" @on-page-size-change="changeSizeCurrent" show-elevator show-sizer show-total /> -->
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            tableHeight:200,
            form:{
                keyword:''
            },
            page:{
                total:0,
                pageSize:20,
                pageNum:1,
            },
            list:{
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名字',
                        minWidth: 180,
                        key: 'name',

                    },
                ],
                data:[]
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
            console.log('pagePageingH',pagePageingH)

            this.tableHeight =pagePageingH;
        },

        init(){
            Object.assign(this.$data, this.$options.data());

            let arr=Array(18).fill({name:'1fsd'});
            console.log('ass',arr);
            this.$_resize();
            this.list.data=arr;

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
.list-manage{
    height: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    margin: 16px;

    .search-box{
        flex: 0 0 auto;

    }
    .buttons-box{
        flex: 0 0 auto;
    }
    .table-box{
        flex: 1;
        margin: 16px;
    }
    .page-paging{
        height: 36px;
    }

}
</style>
