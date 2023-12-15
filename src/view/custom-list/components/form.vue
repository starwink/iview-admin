<template>
    <!-- <Modal v-model="show" :title="form.id ===''  ?'新增配置':readonly?'查看配置':'编辑配置'" :mask-closable="false" :width="600"> -->
    <Drawer class-name="custom-list-form-eDrawer"  v-model="show"  @on-close="close" :width="860"  direction="rtl" :before-close="closeConfrim">
       
        <div class="detail">
            <div class="header">
                <span class="title">创建列表</span>
            </div>
            <div class="drawer-body">
                <Form :model="form" ref="form" :rules="ruleCustom" :label-width="142">
                    <Row :gutter="16" class="mt-12">
                        <Col span="24">
                            <FormItem label="列表名称：" prop="name">
                                <Input v-model.trim="form.name" placeholder="请输入" maxlength="100"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="列表来源数据库：" prop="dataBase">
                                <Select v-model="form.dataBase" filterable >
                                    <Option v-for="(item,index) in options.database" :key="index" :value="item.name">{{item.name}}</Option>
                                </Select>
                            <p class="remark">需要是关系型数据库，推荐使用采集系统中间库(Mysql)</p>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="来源库：" prop="dataBaseForm">
                                <Input v-model.trim="form.dataBaseForm" placeholder="请输入" maxlength="100"></Input>
                                <p class="remark">将会直接展示目标表下的所有字段（列之间的排序将会按照遵照数据库内的顺序）；列名称将会使用表字段的备注（无备注将会直接用字段名称）</p>
                            </FormItem>
                        </Col>
                        
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="来源表：" prop="tableForm">
                                <Input v-model.trim="form.tableForm" placeholder="请输入" maxlength="100"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="分页数量：" prop="pageSize">
                                <Select v-model="form.pageSize" filterable >
                                    <Option :value="10">10条/页</Option>
                                    <Option :value="20">20条/页</Option>
                                    <Option :value="30">30条/页</Option>
                                    <Option :value="40">40条/页</Option>
                                    <Option :value="50">50条/页</Option>
                                    <Option :value="100">100条/页</Option>
                                    <Option :value="200">200条/页</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16" class="mb-24">
                        <Col span="24" >
                            <FormItem label="列表查询条件：" prop="" style="margin-bottom: 0px;">
                                <Button style="width:100%;border-color: #13939e;color: #13939e;margin-bottom: 12px;" class="mb-10" icon="md-add" type="dashed" @click="addParams('Query')">添加</Button>
                            </FormItem>
                            <Table  :columns="list.columns" :data="form.searchParamsList" :key="paramsTableKey">
                                    <template slot-scope="{ row, index }" slot="name">
                                        <span>{{ getTypeCn(row.type) }}</span>
                                    </template>
                                    <template slot-scope="{ row, index }" slot="valueType">
                                        <span>{{ getValueCn(row.valueType) }}</span>
                                    </template>
                                    <template slot-scope="{ row, index }" slot="action">
                                        <span class="button-span button-color-edit" style="margin-right: 5px" @click.stop="editParams(row,index)">编辑</span>
                                        <span class="button-span button-color-del" style="margin-right: 5px" @click.stop="confirmParamsDel(row,index)">删除</span>
                                    </template>
                                </Table>
                        </Col>
                    </Row>
                  <!--  -->

                   
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="可查看科室：" prop="deptCode">
                                <Select v-model="form.deptCode" filterable multiple >
                                    <Option v-for="(item,index) in options.deskNo" :key="index+'_'+item.code" :value="item.code">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="打开方式：" prop="isJump">
                                <RadioGroup v-model="form.isJump">
                                    <Radio label="Y">跳转</Radio>
                                    <Radio label="N">不跳转</Radio>
                                </RadioGroup>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row :gutter="16">
                        <Col span="24">
                            <FormItem label="跳转链接：" prop="isJump">
                                <Input v-model.trim="form.jumpUrl" placeholder="来源表" maxlength="200"></Input>
                                <p class="remark">选择跳转后，列最后将会固定展示一列“操作”，用户点击‘查看’将会跳转到指定的链接下。链接如果需要使用到患者的字段作为入参，请在链接上用[参数名称，数据库的字段名]来书写，例如https://cn.bing.com/search?q=[department]</p>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
            
        </div>
        <div class="footer">
            <div class="left">
                <Button v-if="form.id" @click="confirmDel()" class="ml-10" type="error" >删除</Button>
            </div>
            <div class="right">
                <Button @click="confirmColseByButton()">关闭</Button>
                <Button v-if="!form.id" @click="save()" class="ml-10" type="primary">保存</Button>
                <Button v-if="form.id" @click="confirmSave()" class="ml-10" type="primary">保存</Button>
            </div>
        </div>
        <formByWhereParams ref="formByWhereParams" @success="saveParamsValue" ></formByWhereParams>
    </Drawer>

</template>
<style lang="scss" >
.custom-list-form-eDrawer {

.ivu-drawer-body {
    padding: 0px;
    overflow: hidden;

}
.header {
    display: flex;
    height: 48px;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    border-bottom: solid 1px #ddd;

    .title {
        font-size: 16px;
        font-weight: 600;
        padding: 0 20px 0 12px;
    }

    .close {
        position: absolute;
        right: 16px;
        top: 14px;
        font-size: 20px;
        cursor: pointer;
        transition: all 0.5s ease 0s;

        &:hover {
            transform: rotate(90deg);
        }
    }
}

.drawer-body {
    height: calc(100vh - 100px);
    overflow: auto;
    padding: 16px;
    .remark {
        color:#999;
    }
}


.footer{
    width: 100%;
    display: flex;
    height: 48px;
    justify-content: flex-end;
    padding: 0 16px;
    align-items: center;
    margin: 0;
    border-top: solid 1px #ddd;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #fff;
    z-index: 8;

    .left{
      flex:1;
      text-align-last: left;
    }
}

}
</style>
<script>
import formByWhereParams from '@/view/custom-list/components/formByWhereParams'
import customFun from '@/view/custom-list/components/custom.fun'
export default {
    name: 'caseForm',
    components: {
        formByWhereParams,
    },
    data() {
        return {
            show: false,
            loading:false,
            form: {
                id: "",
                name: "",//列表名称
                dataBase: "",//来源数据库
                dataBaseForm: "",//来源库
                tableForm: "",//来源表
                isJump: "N",//是否跳转
                isOpen: "N",//是否在院内端显示
                pageSize: 20,//分页数量
                jumpUrl: "",//跳转链接
                searchParamsList:[],//查询参数列表
                deptCode:[],//科室权限
            },
            ruleCustom: {
                
                name: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ],
                dataBase: [
                    { required: true, message: '请选择', trigger: 'change' }
                ],
                dataBaseForm: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ],
                tableForm: [
                    { required: true, message: '请输入', trigger: 'blur' }
                ],
            },
            options: {
                database: [],
                deskNo:[],
            },
            list: {
                columns: [
                    {
                        title: '查询类型',
                        width: 120,
                        slot: 'name'
                    },
                    {
                        title: '提示说明',
                        minWidth: 160,
                        key: 'desc'
                    },
                    {
                        title: '查询字段',
                        minWidth: 120,
                        key: 'searchParam'
                    },
                    {
                        title: '查询方式',
                        minWidth: 120,
                        key: 'searchType'
                    },
                    {
                        title: '数值类型',
                        minWidth: 120,
                        slot: 'valueType'
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
            paramsTableKey:0,
        }
    },
    methods: {
        init() {
            Object.assign(this.$data, this.$options.data());
            this.show = true
            this.getOption();
            this.$nextTick(() => {
                this.resetForm();
            })
        },
        edit(id) {
            Object.assign(this.$data, this.$options.data());
            this.show = true
            this.getOption();
            // console.log('eidt',data)
            this.$api.getTableDetailById(id).then(res=>{
                this.form = res.object;
                this.resetForm();
            })

            /* this.$nextTick(() => {
                this.form = {...data};
                this.resetForm();
                console.log(this.form,data);
            }) */
        },
       
        resetForm() {
            this.$refs.form.fields.forEach(function (e) {
                e.resetField()
            })
        },
        close() {
            this.show = false
        },
        getOption() {
            this.$api.databaseList({}).then(res => {
                if (res != void 0 && res.code == 1) {
                    this.options.database = res.object;
                } else {
                    this.$Message.error(res.message);
                }
            })
            this.$api.getDeptList().then(res=>{
                if (res != void 0 && res.code == 1) {
                    this.options.deskNo=res.object;
                }
            })
        },
        
       
        save() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    if (this.loading) {
                        return
                    }
                    this.loading = true
                    let params = JSON.parse(JSON.stringify(this.form));
              
                    if(!params.id){
                        delete params.id;
                    }
                    this.$api.saveCustomItem(params).then(res => {
                        this.loading = false
                        if (res.code === 1) {
                            this.$Message.success('操作成功')
                            this.success(params)
                        } else {
                            this.$Message.error(res.msg)
                        }
                    })
                }
            })
        },
        success(obj) {
            this.show = false
            this.$emit('success', obj)
        },
        createAddParamsOptionParams(){
            if(!this.form.dataBase ){
                this.$Message.info('请选择列表来源数据库')
                return ;
            }
            if(!this.form.dataBaseForm ){
                this.$Message.info('请输入来源库')
                return ;
            }
            if(!this.form.tableForm ){
                this.$Message.info('请输入来源表')
                return ;
            }
            let params={
                dataBaseFrom:this.form.dataBaseForm,
                dataSourceFrom:this.form.dataBase,
                tableFrom:this.form.tableForm,
            }
            return params
        },
        
        addParams(){
            let params=this.createAddParamsOptionParams()
            if(!params){return ;}
            this.$refs.formByWhereParams.init(params);
        },
        editParams(row,index){
            let params=this.createAddParamsOptionParams()
            if(!params){return ;}
            this.$refs.formByWhereParams.edit(row,index,params);
        },
        delParams(row,index){
            this.form.searchParamsList.splice(index, 1);
        },
        saveParamsValue(data,index=null){
            let list= this.form.searchParamsList;
            if(index == void 0){
                list.push(data)
            }else{
                list[index]=data;
            }
            this.form.searchParamsList=list;
            this.paramsTableKey++;
        },

        getValueCn(val){
            return customFun.getValueCn(val);
        },
        getTypeCn(val){
            return customFun.getTypeCn(val);
        },
        confirmParamsDel(item,index){
            this.$Modal.confirm({
                title: `确认删除查询条件?`,
                content: `<span style="color:red">删除查询条件后数据将会无法找回</span><span  style="color:#999">，你还要继续吗？</span>`,
                onOk: () => {
                    //this.$Message.info('Clicked ok');
                    this.delParams(item,index);
                }
            });
        },
        confirmDel(){
            this.$Modal.confirm({
                title: `确认删除定制化列表?`,
                content: `<span style="color:red">删除用户将不可见</span><span  style="color:#999">，你还要继续吗？</span>`,
                onOk: () => {
                    //this.$Message.info('Clicked ok');
                    this.delMenuItem(this.form.id);
                }
            });
        },
        delMenuItem(id){
            this.$api.delCustomItem({id:id}).then(res=>{
                if(res.code==1){
                    this.close();
                    this.$emit('delSuccess');
                }
            })
        },
        confirmSave(){
            this.$Modal.confirm({
                title: `确认保存?`,
                content: `<span style="color:red">保存后之前的内容将会覆盖</span><span  style="color:#999">，你还要继续吗？</span>`,
                onOk: () => {
                    //this.$Message.info('Clicked ok');
                    this.save();
                }
            });
        },
        confirmColseByButton(){
            this.$Modal.confirm({
                title: `确认取消并退出?`,
                    content: `<span style="color:red">当前页面上已经编辑的内容都将丢失</span><span  style="color:#999">，你还要继续吗？</span>`,
                onOk: () => {
                    //this.$Message.info('Clicked ok');
                    this.close();
                }
            });
        },
        closeConfrim(...e){
            let that=this;
            return new Promise(function(resolve, reject) {
                that.$Modal.confirm({
                    title: `确认取消并退出?`,
                    content: `<span style="color:red">当前页面上已经编辑的内容都将丢失</span><span  style="color:#999">，你还要继续吗？</span>`,
                    onOk: () => {
                        resolve();
                    },
                    onCancel: () => {
                        reject();
                    }
                });
                
            })
        }

    }
}
</script>
