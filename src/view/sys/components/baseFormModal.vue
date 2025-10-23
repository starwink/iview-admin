<template>
  <div>
    <Modal v-model="show" @on-visible-change="close" class-name="eModal baseFormModal" :width="480" transfer footer-hide :mask-closable="false">
      <div class="detail">
        <div class="header" ref="header">
          <span class="title">{{page.title}}{{ form.id?'编辑':'新增' }}</span>
        </div>
        <div class="eModal-body">
          <Spin size="large" fix v-if="loading.page"></Spin>
          <Form :model="form" :rules="rules" @keydown.native.enter.prevent="save" ref="form" :label-width="96"  @submit.native.prevent>
            <FormItem label="名称：" prop="name" :rules="[{ required: true, message: '请输入', trigger: 'blur' }]">
              <Input v-model.trim="form.name" ref="input" maxlength="50"></Input>
            </FormItem>
          </Form>
        </div>
        <div class="footer">
          <div class="left">
          </div>
          <div class="right">
            <Button @click.stop="close()">取消</Button>
            <Button :loading="loading.save" class="ml-10" @click.stop="save()" type="primary">保存</Button>
          </div>
        </div>

      </div>
    </Modal>
  </div>
</template>
 
<script>

export default {

  data() {
    return {
      show: false,
      loading: {
        page: false,
        save: false,
      },
      page: {},
      form: {
        id: '',
        name: '',

      },
      rules: {
        //    name: [{ required: true, trigger: "change" ,message:'请输入'}],
      },
      option: {}
    };
  },
  methods: {
    add(pageConfig) {
      Object.assign(this.$data, this.$options.data());
      this.show = true;
      this.page = pageConfig
      this.$nextTick(() => {
        this.resetForm()
        this.$refs.input.focus({cursor: 'end'});
      })
    },

    edit(pageConfig, params) {
      Object.assign(this.$data, this.$options.data());
      this.show = true;
      this.page = pageConfig
      this.loading.page = true
      this.$api.getBaseDetail(this.page.uri, { id: params.id }).then(res => {
        this.loading.page = false
        this.resetForm()
        this.$refs.input.focus({cursor: 'end'});
        this.form = res?.object || {}
      }, err => {
        this.loading.page = false
      });
    },

    resetForm() {
      this.$refs.form.fields.forEach(function (e) {
        e.resetField()
      })
    },

    save() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.runapi();
        }
      });
    },

    runapi() {
      let params = this.form;
      this.loading.save = true;
      this.$api.saveBase(this.page.uri, params).then((res) => {
        this.loading.save = false;
        if (res.code == 1) {
          this.$Message.success('保存成功');
          this.success();
        }
      }, err => {
        this.loading.save = false;
      });
    },

    success() {
      this.close();
      this.$emit('success')
    },
    close(type) {
      if (type) { return; }
      this.show = false;
      this.$emit('close')
    },

  },
  mounted() {
    // this.init();
  },
};
</script>
<style lang="scss" scoped>
@import "@/components/eModal/eModal.scss";

.eModal {
  .eModal-body {
    height: 100%;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
    position: relative;
  }

  .detail {
    .header {
      .sub-title {
        font-weight: 400;
        color: #606266;
        cursor: text;
      }
    }

    .workbench {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
    }
  }
}

.baseFormModal {
  .eModal-body {
    padding: 16px;

    // height: auto !important;
    // overflow: hidden;
    // margin-bottom: 24px;
  }
}
</style>