<template>
    <div class="case-page custom-list">
        <div class="left-menu">
            <div class="search">
                <Input v-model.trim="form.name" @on-change="search()" @on-clear="search" maxlength="50" placeholder="请输入关键字" clearable suffix="ios-search"></Input>
            </div>
            <div class="left-content">
                <div class="table-menu">
                    <ul>
                        <li v-for="(item, index) in list.data" :class="item.id==data.id?'active':''">
                            <div class="item-info" @click="openItem(item)">
                                <span>{{ item.name }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                
            </div>
        </div>
        <div class="list-review">
            <div class="list-header">
                <div class="title">
                    {{ data.name }}
                </div>
                <div class="buttons">
                    <Button type="primary"  @click="down">下载</Button>
                </div>
            </div>
            <div class="list-body">
                <listReview ref="listReview" :boxHight="56" />
            </div>
        </div>
        
    </div>
</template>
<style lang="scss" scoped>
@import '@/assets/styles/variable.scss';
.case-page{
    height: 100vh;
}
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
            height: calc(100% - 56px);
            overflow: hidden;
            text-align: left;
            position: relative;
            .check-box{
                // height: 40px;
                padding:4px 8px;
            }
            .table-menu{
                height: 100%;
                overflow-y: auto;
            }
            
            li {
                list-style: none;
               
                display: flex;
                align-items: center;
                height: 40px;
                margin-bottom: 8px;
                cursor: pointer;
                

               

                   
                .item-check{
                    padding-left: 16px;
                    width:40px;
                }
                .item-info {
                    width:calc(100% - 32px);
                    padding-left: 16px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
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
            height: 64px;
            border-right: 1px solid #e1e1e1;
            border-top: 1px solid #e1e1e1;
            background-color: #fff;
        }
    }
    .list-review{
        width: calc(100% - 260px);
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
export default {
    components: {
        listReview
    },
    computed: {},
    data() {
        return {
            form: {
                name: '',
                isOpen:'Y'
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
            
            let roleParams={
                loginName:this.$route.query.loginName || '',
                roleId:this.$route.query.roleId || ''
            }
            let params = { ...this.form,...roleParams, ...{ currentPage: this.page.current, perPageSize: this.page.pageSize } }
            this.$api.getCustomListByDept(params).then(res => {
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

        
       
        
        openItem(item){
            this.data=item
            this.$refs.listReview.init(item);
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
