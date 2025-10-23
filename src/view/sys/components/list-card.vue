<template>
  <div class="card-box">
    <div class="title-box" @click="openDetail">
      <div class="title">{{title}}</div>
      <div class="img" :style="{'background-image':'url('+img+')'}"></div>
    </div>
    <div class="button-box">
      <!-- <div class="button-span button-color-del" @click.stop="del">删除</div> -->
      <div class="button-span button-color-edit" @click.stop="edit">编辑</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    img: {
      type: String,
      default: '',
    },
    uri: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      form: {

      }
    }
  },
  methods: {
    init() {
      Object.assign(this.$data, this.$options.data());

    },
    openDetail() {
      this.edit()
    },
    edit() {
      this.$emit('edit', { uri: this.uri, title: this.title })
    },
    del() {
    },
  },
  mounted() {

  },
  created() {

  },
}
</script>
<style lang="scss" scoped>
.card-box {
  // border: solid 1px #ccc;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.12);
  width: 180px;
  height: 140px;
  margin: 0 16px 16px 0;
  position: relative;
  &:hover {
    // box-shadow: 0 2px 4px 0 rgba(162, 235, 202, 0.12), 0 0 6px 0 rgba(162, 235, 202, 0.12);
    box-shadow: 0 2px 4px 0
        rgba(
          var(--theme-main-r),
          var(--theme-main-g),
          var(--theme-main-b),
          0.12
        ),
      0 0 6px 0
        rgba(
          var(--theme-main-r),
          var(--theme-main-g),
          var(--theme-main-b),
          0.24
        );
    // box-shadow: 0 2px 4px 0 rgba(23, 78, 215, 0.12), 0 0 6px 0 rgba(23, 78, 215, 0.12);
  }

  .title-box {
    // border: solid 1px #999;
    background-color: #eee;
    height: calc(100% - 32px);
    position: relative;
    cursor: pointer;
    .title {
      position: absolute;
      top: 16px;
      left: 16px;
      font-weight: 500;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      overflow: hidden;
      word-break: break-all;
    }
    .img {
        background-size: cover;
        height: 100%;
        background-repeat: no-repeat;
        // background: url() no-repeat;
    }
  }
  .button-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    height: 32px;
    width: 100%;
  }
}
</style>