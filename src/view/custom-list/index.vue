<template>
    <div class="case-page custom-list">
        <div class="left-menu">
            <div class="search">
                <Input v-model.trim="form.name" @on-change="search()" @on-clear="search" maxlength="50" placeholder="请输入关键字" clearable suffix="ios-search"></Input>
            </div>
            <div class="left-content">
                <div class="check-box">
                    <Checkbox :indeterminate="menu.indeterminate" :value="menu.checkAll" @on-change="handleCheckAll">全选</Checkbox>
                </div>
                <div class="table-menu">
                    <ul>
                        <li v-for="(item, index) in list.data" :class="item.id==data.id?'active':''">
                            <span class="item-check">
                                <Checkbox v-model="list.data[index].value" @on-change="e=>checkItem(item.id,e)"></Checkbox>
                            </span>
                            <div class="item-info" @click="openItem(item)">
                                <span>{{ item.name }}</span>
                                <!-- <span class="item-close">{{ item.isOpen }}</span> -->
                            </div>
                            <div class="item-manage" >
                                <span :class="item.isOpen=='Y'?'item-open':'item-close'">{{ item.isOpen=="Y"?'已开放':'未开放' }}</span>
                                <!-- <Icon type="md-trash" class="del-icon"  /> -->
                            </div>
                        </li>
                    </ul>
                </div>
                
            </div>
            <div class="buttons">
                <Button @click="batchOpenItem(true)" class="mr-10" type="info">开启</Button>
                <Button @click="batchOpenItem(false)" class="mr-10" type="info">关闭</Button>
                <Button @click.stop="addItem()" type="primary">创建列表</Button>
            </div>
        </div>
        <div class="list-review">
            <div class="list-header">
                <div class="title">
                    {{ data.name }}
                </div>
                <div class="buttons">
                    <Button v-if="data.id" @click="editItem" type="primary">编辑</Button>
                    <Button v-if="data.id" type="primary" class="ml-10" @click="down">下载</Button>
                </div>
            </div>
            <div class="list-body">
                <listReview ref="listReview" />
            </div>
        </div>
        <baseForm ref="baseForm" @success="editSuccess" @delSuccess="delSuccess"></baseForm>
        
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';

.custom-list {
    background-color: #fff;
    display: flex;
    width:100%;
    overflow: hidden;

    .left-menu {
        position: relative;
        width: 260px;
        height: 100%;
        box-shadow: inset -1px 0 0 0 #e1e1e1;

        .search {
            padding: 12px 16px;
            width: 260px;
        }

        .left-content {
            width: 260px;
            height: calc(100% - 106px);
            overflow: hidden;
            text-align: left;
            position: relative;
            .check-box{
                // height: 40px;
                padding:4px 8px;
            }
            .table-menu{
                height: calc(100% - 30px);
                overflow-y: auto;
            }
            
            li {
                list-style: none;
               
                display: flex;
                align-items: center;
                height: 40px;
                margin-bottom: 8px;
                cursor: pointer;
                

                &:hover {
                    color: #13939e;
                    background-color: rgba(19, 147, 158, 0.1);
                   
                    .item-info{
                        width:calc(100% - 76px);
                        padding-right: 0px;
                    }
                }

                   
                .item-check{
                    padding-left: 16px;
                    width:40px;
                }
                .item-info {
                    width:calc(100% - 60px);
                    // padding-right: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                   
                }
                .item-manage {
                    width:60px;
                    height: 40px;
                    line-height: 40px;
                    text-align: center;
                    .del-icon{
                        font-size: 16px;
                        cursor: pointer;
                    }
                    .item-open{
                        color:#009A29;
                        background-color: #AFF0B5;
                        font-size: 12px;
                        padding:2px 4px;
                        border-radius: 4px;
                    }
                    .item-close{
                        color:#D25F00;
                        background-color: #FFE4BA;
                        font-size: 12px;
                        padding:2px 4px;
                        border-radius: 4px;
                    }
                }
            }

            .active {
                color: #13939e;
                background-color: rgba(19, 147, 158, 0.1);
            }
        }

        .buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            bottom: 0;
            width: 100%;
            height: 50px;
            border-right: 1px solid #e1e1e1;
            border-top: 1px solid #e1e1e1;
            background-color: #fff;
        }
    }
    .list-review{
        width: calc(100% - 240px);
        .list-header{
            height: 55px;
            width: 100%;
            border-bottom: solid 1px #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 16px;
            .title{
                font-size: 16px;
                font-weight: 600;
            }
            .buttons{

            }
        }
        .list-body{
            position: relative;
            height: calc(100% - 56px);
        }
    }
}
</style>
<script>
import listReview from '@/view/custom-list/components/listReview'
import baseForm from '@/view/custom-list/components/form'
export default {
    components: {
        listReview,baseForm
    },
    computed: {},
    data() {
        return {
            form: {
                name: '',
            },
            loading: {
                menu: false,
                detail: false,
            },
           
            menu:{
                userSet:[],
                checkAll:false,
                indeterminate:false,
            },
            list: {
                data: []
            },
            page: {
                total: 1,
                current: 1,
                pageSize: 20
            },
            data:{}
        }
    },
    methods: {
        init(){
            Object.assign(this.$data, this.$options.data());
            this.search();
        },
        search() {
            this.page.current = 1
            this.getList();
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
            if (this.loading.menu) {
                return;
            }
            this.menu.checkAll=false;
            this.menu.indeterminate=false;
            this.menu.userSet=[];

            this.spinShow = true
            let params = { ...this.form, ...{ currentPage: this.page.current, perPageSize: this.page.pageSize } }
            this.$api.getCustomList(params).then(res => {
                this.spinShow = false
                if (res.code == 1) {
                    let list=res.object.rows;
                    list.map(res=>{
                        res.value=false;
                    });
                    this.list.data=list;
                    this.page.total=res.object.total;
                    
                    if(this.data.id==void 0 &&  this.list.data?.[0]?.id){
                        this.openItem(this.list.data[0])
                    }
                }
            })
        },

        checkItem(id,value){
            if(value){
                this.menu.userSet.push(id)
            }else{
                this.menu.userSet.splice(this.menu.userSet.indexOf(id),1) 
            }
            if(this.list.data.length==this.menu.userSet.length){
                this.menu.checkAll=true;
                this.menu.indeterminate=false;
            }else if(this.menu.userSet.length>0){
                this.menu.checkAll=false;
                this.menu.indeterminate=true;
            }else {
                this.menu.checkAll=false;
                this.menu.indeterminate=false;
            }
        },
        handleCheckAll(e) {
            if (this.menu.indeterminate) {
                e=false;
            } 
            this.menu.indeterminate = false;
            let list =  [...this.list.data];
            let all=[]
            if (e) {
                list.map(res=>{
                    res.value=true;
                    all.push(res.id)
                })
                this.menu.checkAll=true;
                this.menu.indeterminate=false;
            } else {
                list.map(res=>{
                    res.value=false;
                })
                this.menu.checkAll=true;
                this.menu.indeterminate=false;
            }
            this.menu.userSet=all;
            this.data.list=list;
        },
        
        delMenuItem(id){
            this.$api.delCustomItem({id:id}).then(res=>{
                if(res.code==1){
                    this.getList()
                }
            })
        },
        
        openItem(item){
            this.data=item
            this.$refs.listReview.init(item);
        },
        addItem(){
            this.$refs.baseForm.init()
        },
        editItem(){
            if(this.data.id== void 0){return}
            this.$refs.baseForm.edit(this.data.id);
        },
        editSuccess(item){
            this.getList();
            if(item.id){
                this.openItem(item);
            }
        },
        delSuccess(){
            this.getList();
            this.data={}
        },
        getBatchUserSet(){
            let list=[]
            this.list.data.map(res=>{
                if(res.value){
                    list.push(res.id)
                }
            })
            return list;
        },
        batchOpenItem(type){
            let list=this.getBatchUserSet();
            if (!list.length) {
                this.$Message.info('请选择需要变更状态的列表')
                return;
            }
            let params={
                idList:list,
                isOpen:type?'Y':'N'
            }
            this.$api.batchUpdateCustomOpen(params).then(res=>{
                if(res.code==1){
                    this.getList();
                }
            })
        },
        confirmDel(item){
            this.$Modal.confirm({
                title: `确认删除定制化列表?`,
                content: `<span style="color:red">删除用户将不可见</span><span  style="color:#999">，你还要继续吗？</span>`,
                onOk: () => {
                    //this.$Message.info('Clicked ok');
                    this.delMenuItem(item.id);
                },
                onCancel: () => {
                    this.$Message.info('Clicked cancel');
                }
            });
        },
        down(){
            this.$refs.listReview.$refs.whereForm.down();
        }
       
    },
    mounted() {
        this.init();
    },
}
</script>
