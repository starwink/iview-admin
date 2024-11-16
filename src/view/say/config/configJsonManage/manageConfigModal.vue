<template>
    <!-- <Modal v-model="show"  :mask-closable="false" class-name="form" width="86"> -->
    <Modal v-model="show" title="配置参数管理" width="86" @on-visible-change="close" :mask-closable="false"  transfer class-name="eModal xxxxxxxxModal">
        <Form :model="form" @submit.native.prevent @keydown.native.enter.prevent="search">
            <Row :gutter="16" style="margin-bottom:12px">
                <Col span="4">
                    <Input v-model.trim="form.key" maxlength="50" clearable placeholder="请输入函数名" @on-change="search()" />
                </Col>
                
                <Col span="8" style="text-align:right">
                    <Button style="margin-left: 10px;" type="primary" @click="add()">新增</Button>
                   
                </Col>
            </Row>

            <Row :gutter="16">
                <Col span="24">
                <Table stripe :columns="list.columns" :data="list.data" :loading="spinShow" :height="tableHeight" @on-selection-change="handleSelectionChange">
                    <template slot-scope="{ row, index }" slot="action">
                        <Button type="text" class="button-color-edit" ghost style="margin-right: 5px"
                            @click="edit(row)">编辑</Button>
                        <Poptip confirm transfer placement="top-end" @on-ok="del(row)">
                            <div slot="title">
                                <div>
                                    确认删除么?
                                </div>
                            </div>
                            <Button type="text" class="button-color-del" style="margin-right: 5px">删除</Button>
                        </Poptip>
                    </template>
                </Table>
                </Col>
            </Row>
        </Form>
        <div class="page-box">
            <Row>
                <Col span="24">
                <Page :total="page.total" :current="page.current" :page-size="page.pageSize"  @on-change="changePageCurrent" />
                </Col>
            </Row>
        </div>
        <modelForm ref="modelForm" @success="getList"></modelForm>
        <div slot="footer">
            <Button @click.stop="close">取消</Button>
        </div>
    </Modal>
</template>
<script>
import modelForm from './form'
export default {
    components: {
        modelForm,
    },
    data() {
        return {
            show: false,
            spinShow: false,
            form: {
                name: '',
                functionBody: '',
                scopeAddress: '',
                scopeFieldCode: '',
            },
            page: {
                total: 1,
                current: 1,
                pageSize: 20
            },

            list: {
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    },

                    {
                        title: '函数名',
                        minWidth: 120,
                        key: 'functionName'
                    },
                    {
                        title: '适用范围',
                        width: 170,
                        slot: 'scopeAddress',
                    },

                    {
                        title: '类型',
                        minWidth: 120,
                        render: (h, { row }) => {
                            if (row.funType === 0) {
                                return <span>原值返回</span>;
                            } else if (row.funType === 1) {
                                return <span>JavaScript</span>;
                            }
                        }
                    },
                    {
                        title: '结果类型',
                        minWidth: 120,
                        key: 'jsReturnTypeName'
                    },
                    {
                        title: '适用字段',
                        width: 170,
                        slot: 'scopeFieldCode',
                    },
                    

                    {
                        title: '推荐映射方式',
                        width: 120,
                        key: 'modeOperationEnumCode',
                        render: (h, { row }) => {
                            if (row.modeOperationEnumCode === 0) {
                                return <span>覆盖</span>;
                            } else if (row.modeOperationEnumCode === 1) {
                                return <span>追加</span>;
                            }
                        }
                    },
                    {
                        title: '函数体',
                        key: 'funStr',
                        ellipsis: true,
                        tooltip: true,
                        minWidth: 120
                    },

                    {
                        title: '操作',
                        width: 170,
                        fixed: 'right',
                        slot: 'action',
                    }
                ],
                // data: [],
                data: [],
            },
            multipleSelection: [],
            loading: {
                export: false,
                import: false,
            },
            tableHeight: 200,
        }
    },
    created() {
    },
    beforeMount() {
        window.addEventListener('resize', this.$_resize)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resize)
    },
    methods: {
        $_resize() {
            this.tableHeight = window.innerHeight - 100 - 51 - 32 - 86 - 62;
        },
        
        init() {
            Object.assign(this.$data, this.$options.data());
            this.show = true;
            this.$_resize();
            this.getList();
        },
        search() {
            this.page.current = 1
            this.getList()
        },
        getList() {
            if (this.spinShow) {
                return;
            }
            this.spinShow = true
            let params = { ...this.form, ...{ currentPage: this.page.current, pageSize: this.page.pageSize } }

            this.$api.getSayDictList(params).then(res => {
                this.spinShow = false
                if (res.code == 1) {
                    this.list.data = res.object.list
                    this.page.total = res.object.totalCount;
                }
            })
        },
        close(type) {
            if(type){return ;}
            this.show = false;
            this.$emit('close')
        },
        add() {
            this.$refs.modelForm.init();
        },
        edit(data) {
            this.$refs.modelForm.edit(data);
        },
        del(data) {
            this.$api.delSayConfig(data.id).then(res => {
                if (res.code == 1) {
                    this.getList();
                }
            })
        },
        changePageCurrent(val) {
            this.page.current = val
            this.getList()
        },
        handleSelectionChange(val) {
            this.multipleSelection = val.map((item) => {
                return item.id;
            });
        },
        
        

    }
}
</script>
<style lang="less" scoped>
.page-box {
    margin: 10px 0 0;
    text-align: right;

}
</style>
