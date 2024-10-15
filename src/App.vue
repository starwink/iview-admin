<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
@primary-color: #13939e;
.size{
  width: 100%;
  height: 100%;

}
html,body{
  .size;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  .size;
  overflow: auto;
}

.button-span {
    cursor: pointer;
    margin: 0 8px;
}
.button-color-edit {
    cursor: pointer;
    color: @primary-color;
}
.button-color-del {
    cursor: pointer;
    color: #e02020;
}
.button-color-edit {
    span {
        color: @primary-color;
    }
}
.button-color-del {
    span {
        color: #e02020;
    }
}
</style>
