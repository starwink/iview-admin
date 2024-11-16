
<template>
    <div class="navigation-box">
        <Layout>
            <Sider ref="side1" hide-trigger collapsible width="120" :collapsed-width="60" v-model="isCollapsed">
                <ul class="menu-list-def" :class="menuitemClasses">
                    <!-- <li class="menu-item">
                        <Tooltip content="首页" placement="left">
                            <div>
                                <Icon custom="bookeditor-font icon-appstore" @click="save()" title="首页"  />
                                <span>首页</span>
                            </div>
                        </Tooltip>
                    </li> -->
                    <li v-for="(item,index) of menuList" class="menu-item" :class="index==1?'active':''" @click.prevent="clickItem(item)" >
                        <Tooltip :content="item.name" placement="left" :disabled="!isCollapsed">
                            <div>
                                <Icon :custom="'bookeditor-font icon-'+item.icon"  :title="item.title"  />
                                <span class="itme-text ml-6">{{item.name}}</span>
                            </div>
                        </Tooltip>
                    </li>
                </ul>
                <!-- <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>Option 1</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="ios-search"></Icon>
                        <span>Option 2</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="ios-settings"></Icon>
                        <span>Option 3</span>
                    </MenuItem>
                </Menu> -->
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <div class="bar-info">
                        <div class="bar-left">
                            <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
                        </div>
                        <div class="bar-right">
                            <!-- <Icon type="ios-setting"></Icon> -->
                            <Icon type="md-settings" />
                            <span class="icon bookeditor-font icon-appstore"></span>
                            <span class="icon bookeditor-font icon-24gf-folderHeart"></span>
                            <span class="icon bookeditor-font icon-shoppingcart"></span>
                            <span class="icon bookeditor-font icon-24gf-folderShare"></span>
                            <span class="icon bookeditor-font icon-api1"></span>
                           
                        </div>
                    </div>
                </Header>
                <Content :style="{margin: '8px', background: '#fff', minHeight: '260px'}">
                    <!-- <keep-alive :include="cacheList"> -->
                        <router-view/>
                    <!-- </keep-alive> -->
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<style lang="scss" scoped>
$color:#13939e;
.navigation-box{
    color:#dadada;
    .menu-list-def{
        padding-top: 16px;
    }
    .active{
        // color:#f783ac;
        color:$color;
    }
    .ivu-layout{
        height: 100vh;
    }
    .ivu-layout-header{
        height: 42px;
        line-height: 42px;
    }
    .menu-item{
        padding: 4px 16px;
        cursor: pointer;
        .itme-text{
            
        }
        &:hover{
            color:#fff;
        }
    }
    .collapsed-menu{
        // padding: 2px 16px;
        span{
            width: 0px;
            transition: width .2s ease;
        }
        i{
            transform: translateX(0px);
            transition: font-size .2s ease .2s, transform .2s ease .2s;
            vertical-align: middle;
            // font-size: 22px;
            // font-size: 24px;
        }
    }
}
</style>
<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
        height: 100vh;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        .bar-info{
            display: flex;
            justify-content: space-between;
            padding-right: 24px;

            .bar-left{

            }
            .bar-right{
                color:#000;
                font-size: 18px;
            }
        }
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 66px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    /* .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    } */
</style>
<script>
    export default {
        data () {
            return {
                isCollapsed: true,
                menuList:[
                    {name:'卢',path:'/docs',icon:'appstore'},
                    {name:'新增',path:'/work',icon:'edit'},
                    {name:'项目目录',path:'/file/list',icon:'24gf-folderHeart'},
                    {name:'接口调试',path:'/apitest',icon:'api1'},
                    {name:'打字朗读',path:'/say',icon:'message'},
                    {name:'单词管理',path:'/dict',icon:'dict'},
                    // {name:'质控报告',path:'/home',icon:'bulb'},
                    // {name:'数据科研',path:'/home',icon:'appstore'},
                    // {name:'组织管理',path:'/home',icon:'24gf-folderHeart'},
                    // {name:'设置',path:'/home',icon:'setting'},
                ]
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-list',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods: {
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },
            clickItem(item){
                this.$router.push(item.path)
            }
        },
        mounted(){
            console.log(this.$route)
        }
    }
</script>
