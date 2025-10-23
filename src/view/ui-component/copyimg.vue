<template>
  <div class="copyimg-page">
    <div class="buttons">
      <eUploadImg ref="eUploadImg" url="/htest/test/wxmpimg/img/bed" type="eu" name="image" @success="successImg"></eUploadImg>
    </div>
    <div class="copyimg">
      <div id="paste"></div>
      <div id="preview">

      </div>
    </div>
    <div class="ac-log">
      <Table :columns="list.columns" :data="list.data">
        <template slot-scope="{ row, index }" slot="time">
          <span>{{$helper.getDateParams(row.time,'YYYY-MM-DD HH:mm')}}</span>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <span class="button button-color-edit" @click="copy(row)">复制</span>
          <span class="button button-color-del ml-10" @click="del(row)">删除</span>
        </template>
      </Table>
    </div>

  </div>
</template>
<script>
import eUploadImg from '@/components/eUploadButton/eUploadImg'

import imgAcLogDB from '@/store/imgUpload.db'
import { webCopy } from "@/libs/util";
export default {
  components: {
    eUploadImg
  },
  data() {
    return {
      form: {

      },
      db: null,
      list: {
        columns: [
          {
            title: '文件名',
            key: 'name',
            minWidth: 150,
          },
          {
            title: '路径',
            key: 'path',
            minWidth: 150,
          },
          {
            title: '创建时间',
            slot: 'time',
            width: 160,
          },
          {
            title: '操作',
            width: 190,
            fixed: 'right',
            slot: 'action',
          }
        ],
        data: []
      }
    }
  },
  methods: {
    init() {
      Object.assign(this.$data, this.$options.data());
      this.db = new imgAcLogDB();
      this.db.delOldData(7)
      this.$nextTick(() => {
        this.getList()
      })

    },
    getList() {
      this.db.getList().then(res => {
        console.log('dietal', res)
        this.list.data = res.list;
      })
    },
    pushImg(formData) {
      this.$api.pushBedImg(formData).then(res => {
        if (res.code == 1) {
          let item = res.object
          this.db.add(item.fileName, item.filePath, JSON.stringify(item))
          this.getList();
        }
      })
    },
    successImg(res) {
      console.log('successImg', res)
    },
    copy(item) {
      webCopy(item.path)
    },
    del(item) {
      let params = {
        path: item.path,
      }
      this.$api.delFileImg(params).then(res => {
        this.db.delVal(item.id);
        this.getList();
      })
    },
    $_pasteImg(event) {
      let that = this;
      const items = event.clipboardData.items;
      for (let item of items) {
        if (item.type.includes('image')) {
          const blob = item.getAsFile();
          console.log('bbb', blob)
          // 预览图片
          const img = document.createElement('img');
          img.src = URL.createObjectURL(blob);
          document.getElementById('preview').appendChild(img);
          // 上传
          const formData = new FormData();
          formData.append('image', blob);
          console.log('form', formData)
          console.log('that', that.pushImg)
          that.pushImg(formData)
          // that.$api.pushBedImg(formData)
          // fetch('/upload', { method: 'POST', body: formData });
        }
      }
    }

  },
  beforeMount() {
    window.addEventListener("paste", this.$_pasteImg);
  },
  beforeDestroy() {
    window.removeEventListener("paste", this.$_pasteImg);
  },
  mounted() {

    //事件存在重复监听
    // document.addEventListener('paste', function (event) {

    // });

    this.init();

  }
}
</script>
<style lang="scss" scoped>
.copyimg-page {
  .buttons {
    // height: 56px;
    background-color: #e7f5ff;
    text-align: center;
  }
}
.copyimg {
  background-color: #fafafa;
  width: 100%;
  height: 320px;
  display: flex;
  justify-content: space-between;

  #paste {
    width: 50%;
    background-color: #83d7a2;
  }
  #preview {
    flex: 1;
    background-color: #8af;
  }
}
</style>