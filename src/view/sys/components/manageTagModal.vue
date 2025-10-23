<template>
  <Modal v-model="show" width="60" footer-hide transfer class="eModal manageTagModal" ref="manageTagModal">
    <div class="detail">
      <div class="header">
        <span class="title"> {{ page.title }}</span>
      </div>
      <div class="eModal-body">
        <div class="search_where" ref="search">
          <Form :model="form" @keydown.native.enter.prevent="search" ref="searchForm" :label-width="0" @submit.native.prevent>
            <Input v-model.trim="form.key" clearable class="search_input" placeholder="关键字" />
            <Button @click="search()" type="primary">查询</Button>
            <span class="right-buttons">
              <Button @click="add" style="margin-left: 10px;" type="primary">新增</Button>
            </span>
          </Form>
        </div>
        <div class="table-box" ref="table">
          <Table :columns="list.columns" :data="list.data" :loading="loading.table" :height="tableHeight">
            <template slot-scope="{ row, index }" slot="action">
              <span class="button-span button-color-edit" @click.stop="edit(row)">编辑</span>
              <Poptip confirm transfer placement="top-end" @on-ok="del(row)">
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
        <div class="page-box">
          <div>

          </div>
          <div>
            <Page :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="changePageCurrent" />
          </div>
        </div>
      </div>

    </div>
    <baseFormModal ref="baseFormModal" @success="getList" />
  </Modal>
</template>
<style lang="scss" scoped>
@import "@/components/eModal/eModal.scss";
.eModal {
  ::v-deep .ivu-modal-body {
    padding: 0;
  }
}
.manageTagModal {
  .eModal-body {
    height: 100%;
    padding: 0 16px;
    overflow: auto;
  }
  .search_where {
    padding: 12px 16px;
    text-align: left;
    .search_input {
      width: 140px;
      margin-right: 10px;
    }
    .right-buttons {
      // text-align: right;
      float: right;
    }
  }

  .table-box {
    overflow: hidden;
  }
  .page-box {
    margin: 0;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
<script>
import baseFormModal from './baseFormModal.vue'
export default {
  components: {
    baseFormModal,
  },
  data() {
    return {
      show: false,
      loading: {
        table: false,
      },
      page: {
        title: '',
        uri: '',
      },
      tableHeight: 200,
      form: {
        key: '',
      },
      list: {
        columns: [
          {
            title: "id",
            minWidth: 90,
            key: "id"
          },
          {
            title: "名称",
            minWidth: 140,
            key: "name"
          },

          {
            title: "最近更新时间",
            minWidth: 180,
            key: "updateTime"
          },
          {
            title: '操作',
            width: 160,
            fixed: 'right',
            slot: 'action',

          }
        ],

        data: [],
      },
      options: {
        sys: [],
      },
      page: {
        total: 1,
        current: 1,
        pageSize: 10,
      },
      listOpenInfo: [],

    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resize);
  },
  methods: {
    $_resize() {
      // console.log('manageTagModal',this.$refs.manageTagModal.clientHeight,this.$refs.manageTagModal);
      this.tableHeight = window.innerHeight - this.$refs.search.clientHeight - 48 - 48 - 150;
    },
    init(pageconfig) {
      Object.assign(this.$data, this.$options.data());
      this.show = true;
      this.page = pageconfig;
      this.$nextTick(() => {
        this.$_resize()
        this.search();
      })
    },



    search() {
      this.page.current = 1;
      this.getList();
    },
    changePageCurrent(val) {
      this.page.current = val;
      this.getList();
    },
    getList() {
      this.loading.table = true
      let params = { ...this.form, ...{ currentPage: this.page.current, perPageSize: this.page.pageSize } }
      this.$api.getBaseList(this.page.uri, params).then(res => {
        this.loading.table = false
        if (res.code == 1) {
          this.list.data = res.object.list
          this.page.total = res.object.count
        }
      })
    },

    add() {
      this.$refs.baseFormModal.add(this.page);
    },
    edit(item) {
      this.$refs.baseFormModal.edit(this.page, item);
    },
    del(item) {
      this.$api.delBase(this.page.uri,{id: item.id}).then(res => {
        if (res.code == 1) {
          this.getList();
        }
      })
    }



  },
}

</script>
