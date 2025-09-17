
<template>
  <div class="">
    <Tabs value="Buttons">
      <TabPane label="按钮" name="Buttons">
        <Buttons />
      </TabPane>
      <TabPane label="换肤" name="colorTheme">
        <ColorTheme />
      </TabPane>
      <TabPane label="指定测试" name="name3">
        <Input v-model="form.text" />
        <Button v-copy="form.text">coyp</Button>
        <Button v-fd="fdTest">防抖test</Button>
        <Button v-jl="fdTest">节流test</Button>
        <p class="htest-v-style" v-style="11">fffffffffffffaaaaaaaaaaaaaaaaaaaaaaac12321452412321321432459372183216217</p>
        <!-- <countTo :end='100' :decimals="2" :duration=5 delay=1 /> -->
        {{form.text}}
        <!-- {{this.$store.state.menu.routes}} -->

      </TabPane>
      <TabPane label="e图标" name="eIcon">
        <div>

            <eIcon name="svg:tyq" />
            <code >{{form.code}}</code>

        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
import Buttons from './component/buttons.vue'
import ColorTheme from './component/colorTheme.vue'
import countTo from '@/components/count-to/count-to.vue'
import eIcon from '_c/eIcon'
export default {
  components: {
    Buttons,
    ColorTheme,
    countTo,
    eIcon
  },

  data() {
    return {
      form: {
        text: '1234',
        code:'<eIcon name="svg:tyq" />'
      },
    }
  },
  methods: {
    init() {
      Object.assign(this.data, this.options.data());
    },
    fdTest() {
      console.log(new Date().getTime())
      console.log(this.form?.text)
    }
  },
  mounted() {

  },
  created() {

  },
}
</script>
<style lang="scss" scoped>
.htest-v-style {
  width: 60px;
  // -webkit-line-clamp: 2;

  // display: -webkit-box;
  // -webkit-box-orient: vertical;
  // overflow: hidden;

  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
//   -webkit-line-clamp: 3;
  display: -webkit-box;
  overflow: hidden;
  word-break: break-all;
}
</style>