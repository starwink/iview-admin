<template>
  <div id="app-tgmc3iola6hf8e60">
    <router-view/>
  </div>
</template>

<script>
export default {
    watch:{
        $route: {
            handler: 'routeChange',
            immediate: true
        },
    },
    methods:{
        // 监听路由变化，更新页面 title
        routeChange(...e) {
            console.log('rce',e)
            this.$route.meta.title && this.$store.commit('settings/setTitle', this.$route.meta.title)
        }
    },
    metaInfo() {
        return {
            title: this.$store.state.settings.title,
            titleTemplate: title => {
                let btitle=this.$store.state.settings.project_name || '';
                return title ? `${title} - ${btitle}` : btitle
            },
            meta: [
               /*  { charset: 'utf-8' },
                { hanhtestc: 'jfifsuqwe' }, */
            ]
        }
    }
}
</script>

<style lang="less">
html,body{
    height: 100%;
    overflow: hidden;
}
#app-tgmc3iola6hf8e60{
    position: relative;
    height: 100%;
    overflow: hidden;
    margin: 0;
    padding: 0;
}

</style>
