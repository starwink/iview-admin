<template>
  <div id="app-tgmc3iola6hf8e60">
    <router-view/>
  </div>
</template>

<script>
export default {
    metaInfo() {
        return {
            title: 'this.$store.state.settings.enableDynamicTitle && this.$store.state.settings.title',
            titleTemplate: title => {
                return title ? `${title} - ${process.env.VUE_APP_TITLE}` : process.env.VUE_APP_TITLE
            }
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
