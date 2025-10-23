<template>
  <div class="main-list">
    <!-- <div class="card-box" v-for="i of 10" >
            <div class="title-box" @click="openDetail">
                <div class="title">title</div>
                <div class="img"></div>
            </div>
            <div class="button-box">
                <div class="button-span button-color-del" @click.stop="del">删除</div>
                <div class="button-span button-color-edit" @click.stop="edit">编辑</div>
            </div>
        </div> -->
    <managementCard v-for="item of list" :title="item.title" :uri="item.uri" :img="item.img" @edit="edit"></managementCard>
    <manageTagModal ref="manageTagModal" />
  </div>
</template>
<script>
import managementCard from './components/list-card.vue'
import manageTagModal from './components/manageTagModal.vue'

export default {
  components: {
    managementCard,
    manageTagModal
  },
  data() {
    return {
      loading: false,

      list: [
        {
            title:'笔记',
            uri:'/test/tag_notes',
            // img:'https://notes.code6.top/bookimg/imgbed/2025101613/eu_20251016135546_25438109.gif',
        },
        {
            title:'code',
            uri:'/test/tag_code',
        },
      ],

    }
  },
  created() {
    this.init();

  },

  methods: {
    init() {
      // object.assign(this.$data, this.$options.data());

    },
    reset() {
      let redata = this.$options.data();
      object.assign(this.$data.form, redata.form);
    },
    search() {
      this.getlist();
    },

    getlist() {


    },
    edit(config) {
        this.$refs.manageTagModal.init(config)
    }



  }
}
</script>
<style lang="scss">
.main-list {
  padding: 16px 0 64px 16px;
  overflow: auto;

  background-color: #fff;
  border-radius: 4px;
  margin: 16px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

 
}
</style>