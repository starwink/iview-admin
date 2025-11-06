<template>
  <Modal v-model="show" width="80" @on-visible-change="close" :mask-closable="false" footer-hide transfer class-name="eModal logsModal">
    <div class="detail">
      <div class="header">
        <span class="title">日志</span>
      </div>
      <div class="eModal-body">
        <Table :columns="list.columns" :data="list.data" :loading="loading" stripe width="calc(100% - 16px)">
          <template slot-scope="{ row, index }" slot="jsonstr">
            <eTooltip :text="row.jsonstr.substr(0,200)">
              <span>{{row.jsonstr.substr(0,40)}}</span>
            </eTooltip>
          </template>
          <template slot-scope="{ row, index }" slot="time">
            <span>{{$helper.getDateParams(row.time,'YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
          <template slot-scope="{ row, index }" slot="action">
            <span type="text" class="button-span button-color-edit" ghost style="margin-right: 5px" @click.stop="openDetail(row)">查看</span>
          </template>
        </Table>

      </div>
      <div class="page-box">
        <Page :total="page.total" :current="page.current" :page-size="page.pageSize" @on-change="changePageCurrent" @on-page-size-change="changeSizeCurrent" :page-size-opts=[10,20,50,100,500,1000] show-total show-elevator show-sizer />
      </div>
    </div>
    <div class="footer">
      <div class="left">
        <Button @click="bathcDel">清空</Button>
      </div>
      <div class="right">

        <Button @click="show=false">取 消</Button>
        <!-- <Button type="primary" class="ml-10" @click="save()">保 存</Button> -->

      </div>
      <logDetailModal ref="logDetailModal" />
    </div>

  </Modal>
</template>

<script>
import { Modal } from 'view-design';
import { globalState , actions  } from './log.data'
import eTooltip from "@/components/eTooltip";
import logDetailModal from "./logDetailModal";

export default {
  components: {
    Modal,
    eTooltip,
    logDetailModal,
  },
  data() {
    return {
      show: false,
      loading: false,
      logdb: null,
      list: {
        columns: [
        //   {
        //     title: "编号",
        //     minWidth: 90,
        //     key: "id"
        //   },
        {
            title: "时间",
            width: 172,
            slot: 'time',
          },
          {
            title: "操作路径",
            minWidth: 100,
            // ellipsis:true,
            // tooltip:true,
            key: "name"
          },
          {
            title: "API",
            minWidth: 120,
            key: "api"
          },

          {
            title: "内容",
            minWidth: 260,
            slot: 'jsonstr',
          },
          
          {
            title: '操作',
            width: 100,
            fixed: 'right',
            slot: 'action',
          }
        ],
        data: [

        ]
      },
      page: {
        total: 1,
        current: 1,
        pageSize: 20
      },
    }
  },
  methods: {
    init(form = {}) {
      Object.assign(this.$data, this.$options.data());
      this.show = true;
      this.logdb = globalState.list;
      this.search();
    },
    close(type) {
      if (type) { return; }
      this.show = false;
      this.$emit('close')
    },
    search() {
      this.page.current = 1;
      this.getList();
    },
    getList() {
        this.loading = true;
        let res=actions.getList(this.page.current, this.page.pageSize)
        this.loading = false;
        this.list.data = res.data
        this.page.total = res.total

      
    },
    
    openDetail(row) {
        // console.log('roww', row)
        let json=''
        if(this.$helper.isJSON(row.jsonstr)){
            json=this.$helper.getJSONByStr(row.jsonstr)
        }else{
            json=row.jsonstr
        }
        
        this.$refs.logDetailModal.init(json)
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
    bathcDel(){
        actions.delAll()
        this.close()
    }
  },
}
</script>


<style lang="scss" scoped>
@import '@/components/eModal/eModal.scss';
.logsModal {
  .eModal-body {
    height: 100%;
    padding: 16px;
  }
  
  .page-box {
    text-align: right;
    padding: 8px 16px;
  }
}
</style>